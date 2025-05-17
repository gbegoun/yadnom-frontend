import { useState, useCallback, useRef, act } from "react"
import { GroupPreview } from "./GroupPreview"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { TaskPreview } from "../task/TaskPreview"

export const GroupList = ({ board, onBoardSave }) => {

    const [groups, setGroups] = useState(board.groups || [])
    const [columns, setColumns] = useState(board.columns || [])
    const [tasks, setTasks] = useState(board.tasks || [])

    const [dragState, setDragState] = useState({
        isSorting: false,
        draggingId: null,
        draggingType: null,
        draggingTaskId: null,
        sourceGroupId: null,
        draggingTask: null,
        activeGroupId: null,
        dropIndices: {}
    })

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(KeyboardSensor)
    )

    const handleDragStart = useCallback((event) => {
        const { active } = event
        const dragType = active.data.current?.type || 'group'

        if (dragType === 'task') {
            setDragState({
                ...dragState,
                draggingType: dragType,
                draggingTaskId: active.id,
                sourceGroupId: active.data.current.groupId,
                draggingTask: active.data.current.task
            })
        } else {
            setDragState({
                ...dragState,
                draggingType: dragType,
                draggingId: active.id,
                isSorting: true
            })
        }
    }, [dragState])

    const handleDragOver = useCallback((event) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        const isActiveATask = active.data.current?.type === 'task'
        const isOverATask = over.data.current?.type === 'task'

        if (isActiveATask && isOverATask) {
            const activeIndex = tasks.findIndex(task => task._id === active.id)
            const overIndex = tasks.findIndex(task => task._id === over.id)
            if (tasks[activeIndex].groupid !== tasks[overIndex].groupid) {
                tasks[activeIndex].groupid = tasks[overIndex].groupid
            }
            setTasks(arrayMove(tasks, activeIndex, overIndex))
        }

    }, [])

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event

        if (!over) {
            setDragState({
                isSorting: false,
                draggingId: null,
                draggingType: null,
                draggingTaskId: null,
                sourceGroupId: null,
                draggingTask: null,
                activeGroupId: null,
                dropIndices: {}
            })
            return
        }

        let updatedGroups = [...groups];

        if (dragState.draggingType === 'group' && active.id !== over.id) {
            const oldIndex = updatedGroups.findIndex(group => group._id === active.id);
            const newIndex = updatedGroups.findIndex(group => group._id === over.id);
            updatedGroups = arrayMove(updatedGroups, oldIndex, newIndex);

            setGroups(updatedGroups);
        }

        setDragState({
            isSorting: false,
            draggingId: null,
            draggingType: null,
            draggingTaskId: null,
            sourceGroupId: null,
            draggingTask: null,
            activeGroupId: null,
            dropIndices: {}
        })

        const updatedBoard = {
            ...board,
            groups: updatedGroups,
            tasks
        };

        onBoardSave(updatedBoard);
    }, [dragState.draggingType, dragState.sourceGroupId, dragState.activeGroupId, onBoardSave, board, groups, tasks])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="group-list">
                <SortableContext
                    items={groups.map(group => group._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {groups.map(group => {
                        const groupDropIndex = dragState.dropIndices[group._id];

                        return (
                            <GroupPreview
                                key={group._id}
                                id={group._id}
                                columns={columns}
                                group={group}
                                tasks={tasks.filter(task => task.groupid === group._id)}
                                isSorting={dragState.isSorting}
                                isDragging={group._id === dragState.draggingId}
                                isActiveDropArea={group._id === dragState.activeGroupId}
                                dropIndex={groupDropIndex}
                                draggingTaskId={dragState.draggingTaskId}
                            />
                        );
                    })}
                </SortableContext>
            </div>
            <DragOverlay>
                {dragState.draggingId && dragState.draggingType === 'group' && (
                    <div className="drag-overlay">
                        <GroupPreview
                            id={dragState.draggingId}
                            columns={columns}
                            tasks={tasks.filter(task => task.groupid === dragState.draggingId)}
                            group={groups.find(group => group._id === dragState.draggingId)}
                            isSorting={dragState.isSorting}
                        />
                    </div>
                )}
                {dragState.draggingTaskId && dragState.draggingType === 'task' && (
                    <div className="drag-overlay task-overlay">
                        <TaskPreview
                            key={dragState.draggingTask._id}
                            id={dragState.draggingTask._id}
                            task={dragState.draggingTask}
                            columns={columns}
                            color={groups[0].color}
                            groupId={groups[0]._id}
                            isDragging={true}
                        />
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    )
}