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

export const GroupList = ({ columns, groups }) => {

    const [items, setItems] = useState(groups)
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

        if (!over) {
            setActiveGroupId(null)
            setDropIndices({})
            return
        }

        if (active.data.current?.type === 'task') {
            let targetGroupId
            let dropIndex = null

            if (over.data.current?.type === 'task') {
                targetGroupId = over.data.current.groupId

                const targetGroup = items.find(g => g._id === targetGroupId)
                if (targetGroup) {
                    const overTaskIndex = targetGroup.tasks.findIndex(t => t._id === over.id)

                    const overRect = event.over?.rect
                    const pointerY = event.activatorEvent?.clientY || 0

                    const isInBottomHalf = overTaskIndex !== -1 &&
                        overRect &&
                        pointerY > (overRect.top + overRect.height / 2)

                    dropIndex = isInBottomHalf ? overTaskIndex + 1 : overTaskIndex

                    console.log(`Over task ${over.id} in group ${targetGroupId}, position ${dropIndex}, bottom half: ${isInBottomHalf}`)
                }
            } else if (over.data.current?.type === 'group') {
                targetGroupId = over.id

                const targetGroup = items.find(g => g._id === targetGroupId)
                dropIndex = targetGroup?.tasks?.length || 0

                console.log(`Over group ${targetGroupId}, appending at position ${dropIndex}`)
            }

            if (targetGroupId) {
                setActiveGroupId(targetGroupId)

                setDropIndices(prev => {
                    const newIndices = { ...prev }
                    newIndices[targetGroupId] = dropIndex

                    console.log('Updated drop indices:', newIndices)
                    return newIndices
                })
            }
        }
    }, [items])

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
            console.log('Task moved:', active.id)
            console.log('From group:', sourceGroupId)
            console.log('To group:', activeGroupId)

            if (sourceGroupId && activeGroupId && sourceGroupId !== activeGroupId) {
                setItems(prevItems => {
                    const newItems = [...prevItems]
                    const sourceGroupIndex = newItems.findIndex(g => g._id === sourceGroupId)
                    const targetGroupIndex = newItems.findIndex(g => g._id === activeGroupId)

                    if (sourceGroupIndex === -1 || targetGroupIndex === -1) return prevItems

                    const sourceGroup = newItems[sourceGroupIndex]
                    const taskToMoveIndex = sourceGroup.tasks.findIndex(t => t._id === active.id)

                    if (taskToMoveIndex === -1) return prevItems

                    const taskToMove = { ...sourceGroup.tasks[taskToMoveIndex] }

                    newItems[sourceGroupIndex] = {
                        ...sourceGroup,
                        tasks: sourceGroup.tasks.filter((_, i) => i !== taskToMoveIndex)
                    }

                    const targetGroup = newItems[targetGroupIndex]
                    newItems[targetGroupIndex] = {
                        ...targetGroup,
                        tasks: [...targetGroup.tasks, taskToMove]
                    }

                    return newItems
                })
            }
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
                    items={items.map(item => item._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(group => {
                        const groupDropIndex = dropIndices[group._id];
                        console.log(`Rendering group ${group._id} with dropIndex:`, groupDropIndex);

                        return (
                            <GroupPreview
                                key={group._id}
                                id={group._id}
                                columns={columns}
                                group={group}
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