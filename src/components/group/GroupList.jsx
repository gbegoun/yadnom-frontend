import { useState, useCallback, useRef } from "react"
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

export const GroupList = ({ columns, groups, tasks }) => {

    const [items, setItems] = useState(groups)
    const [isSorting, setIsSorting] = useState(false)
    const [draggingId, setDraggingId] = useState(null)
    const [draggingType, setDraggingType] = useState(null)
    const [draggingTaskId, setDraggingTaskId] = useState(null)
    const [sourceGroupId, setSourceGroupId] = useState(null)
    const [draggingTask, setDraggingTask] = useState(null)
    const [activeGroupId, setActiveGroupId] = useState(0)
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

    const GetGroupIdForItemID = (itemId) => {
        for (const group of items) {
            if (group.tasks?.some(task => task._id === itemId)) {
                return group._id
            }
        }
        return null
    }
    const handleDragOver = useCallback((event) => {
        const { active, over } = event
        if (!over) {
            // setActiveGroupId(0)
            return
        }
        if (draggingType === 'task') {
            // let targetGroupId = null
            // targetGroupId = GetGroupIdForItemID(over.id)
            // setActiveGroupId(targetGroupId)
        }


        // if (active.data.current.task.groupid != over.data.current.task.groupid) {
        //     const task = tasks.find(task => task._id === active.data.current.task._id);
        //     task.groupid = over.data.current.task.groupid
        //     tasks = tasks.map(t => t._id === task._id ? task : t);
        // }
    }, [draggingType])

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
            setItems((items) => {
                const oldIndex = items.findIndex(item => item._id === active.id)
                const newIndex = items.findIndex(item => item._id === over.id)
                return arrayMove(items, oldIndex, newIndex)
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

    const getDraggingItem = useCallback(() => {
        return items.find(item => item._id === draggingId)
    }, [draggingId, items])

    const numberRange = Array.from({ length: 101 }, (_, i) => i + 6000);

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
                    items={items.map(item => item._id).concat(numberRange)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(group => {
                        const groupDropIndex = dropIndices[group._id]

                        return (
                            <GroupPreview
                                key={group._id}
                                id={group._id}
                                columns={columns}
                                group={group}
                                tasks={tasks}
                                isSorting={isSorting}
                                isDragging={group._id === draggingId}
                                isActiveDropArea={group._id === activeGroupId}
                                dropIndex={groupDropIndex}
                                draggingTaskId={draggingTaskId}
                            />
                        )
                    })}
                </SortableContext>
            </div>
            <DragOverlay>
                {draggingId && draggingType === 'group' && (
                    <div className="drag-overlay">
                        <GroupPreview
                            id={draggingId}
                            columns={columns}
                            group={getDraggingItem()}
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