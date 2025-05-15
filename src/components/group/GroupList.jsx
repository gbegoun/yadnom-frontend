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

export const GroupList = ({ board }) => {

    const [groups, setGroups] = useState(board.groups || [])
    const [columns, setColumns] = useState(board.columns || [])
    const [tasks, setTasks] = useState(board.tasks || [])

    const [isDragging, setIsDragging] = useState(false)
    const [isSorting, setIsSorting] = useState(false)
    const [draggingId, setDraggingId] = useState(null)
    const [draggingType, setDraggingType] = useState(null)
    const [draggingTaskId, setDraggingTaskId] = useState(null)
    const [sourceGroupId, setSourceGroupId] = useState(null)
    const [draggingTask, setDraggingTask] = useState(null)
    const [activeGroupId, setActiveGroupId] = useState(null)
    const [dropIndices, setDropIndices] = useState({})

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
        setDraggingType(dragType)

        if (dragType === 'task') {
            setDraggingTaskId(active.id)
            setSourceGroupId(active.data.current.groupId)
            setDraggingTask(active.data.current.task)
        } else {
            setDraggingId(active.id)
            setIsSorting(true)
        }

    }, [])

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
            setIsSorting(false)
            setDraggingId(null)
            setDraggingTaskId(null)
            setDraggingType(null)
            setActiveGroupId(null)
            setDropIndices({})
            return
        }

        if (draggingType === 'group' && active.id !== over.id) {
            setGroups((groups) => {
                const oldIndex = groups.findIndex(group => group._id === active.id)
                const newIndex = groups.findIndex(group => group._id === over.id)
                return arrayMove(groups, oldIndex, newIndex)
            })
        } else if (draggingType === 'task') {

        }

        setIsSorting(false)
        setDraggingId(null)
        setDraggingTaskId(null)
        setDraggingType(null)
        setActiveGroupId(null)
        setDropIndices({})
    }, [draggingType, sourceGroupId, activeGroupId])

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
                        const groupDropIndex = dropIndices[group._id];

                        return (
                            <GroupPreview
                                key={group._id}
                                id={group._id}
                                columns={columns}
                                group={group}
                                tasks={tasks.filter(task => task.groupid === group._id)}
                                isSorting={isSorting}
                                isDragging={group._id === draggingId}
                                isActiveDropArea={group._id === activeGroupId}
                                dropIndex={groupDropIndex}
                                draggingTaskId={draggingTaskId}
                            />
                        );
                    })}
                </SortableContext>
            </div>
            <DragOverlay>
                {draggingId && draggingType === 'group' && (
                    <div className="drag-overlay">
                        <GroupPreview
                            id={draggingId}
                            columns={columns}
                            tasks={tasks.filter(task => task.groupid === draggingId)}
                            group={groups.find(group => group._id === draggingId)}
                            isSorting={isSorting}
                        />
                    </div>
                )}
                {draggingTaskId && draggingType === 'task' && (
                    <div className="drag-overlay task-overlay">
                        <TaskPreview
                            key={draggingTask._id}
                            id={draggingTask._id}
                            task={draggingTask}
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