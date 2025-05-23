import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GroupPreview } from "./GroupPreview";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { TaskPreview } from "../task/TaskPreview";

export const GroupList = ({ onBoardSave }) => {
    const storeBoard = useSelector(state => state.boardModule.board);
    const[board, setboard] = useState(null);
    
    useEffect(() => {
        if (storeBoard) {
            setboard(structuredClone(storeBoard));
        }
    }, [storeBoard]);

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

    const handleDragStart = (event) => {
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
    }

    const handleDragOver = (event) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        const isActiveATask = active.data.current?.type === 'task'
        const isOverATask = over.data.current?.type === 'task'
        const isOverAGroup = over.data.current?.type === 'group'

        if (isActiveATask && isOverATask) {
            const activeIndex = board.tasks.findIndex(task => task._id === active.id)
            const overIndex = board.tasks.findIndex(task => task._id === over.id)
            const targetGroupId = board.tasks[overIndex].groupid

            if (board.tasks[activeIndex].groupid !== targetGroupId) {
                board.tasks[activeIndex].groupid = targetGroupId
                setDragState(prev => ({
                    ...prev,
                    activeGroupId: targetGroupId
                }))
            }
            board.tasks = arrayMove(board.tasks, activeIndex, overIndex)
        }


    }

    const handleDragEnd = (event) => {
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

        let updatedGroups = [...board.groups];

        if (dragState.draggingType === 'group' && active.id !== over.id) {
            const oldIndex = updatedGroups.findIndex(group => group._id === active.id);
            const newIndex = updatedGroups.findIndex(group => group._id === over.id);
            updatedGroups = arrayMove(updatedGroups, oldIndex, newIndex);

            board.groups = updatedGroups;
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
        onBoardSave(board);
    }

    if(!board) return <div>Loading...</div>
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
                    items={board.groups.map(group => group._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {board.groups.map(group => {
                        const groupDropIndex = dragState.dropIndices[group._id];

                        return (
                            <GroupPreview
                                key={group._id}
                                id={group._id}
                                columns={board.columns}
                                group={group}
                                tasks={board.tasks.filter(task => task.groupid === group._id)}
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
                            columns={board.columns}
                            tasks={board.tasks.filter(task => task.groupid === dragState.draggingId)}
                            group={board.groups.find(group => group._id === dragState.draggingId)}
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
                            columns={board.columns}
                            color={board.groups[0].color}
                            groupId={board.groups[0]._id}
                            isDragging={true}
                        />
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    )
}