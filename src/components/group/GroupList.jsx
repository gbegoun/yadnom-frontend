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

    const GetGroupIdForItemID = (itemId) => {
        for (const group of items) {
            if (group.tasks?.some(task => task._id === itemId)) {
                console.log('Found group for task:', group._id);
                return group._id;
            }
        }
        return null;
    }
    const handleDragOver = useCallback((event) => {
        const { active, over } = event
        // If not over anything, reset and return
        if (!over) {
            setActiveGroupId(null)
            return
        }
        
        // Only process if we're dragging a task
        if (draggingType === 'task') {
            let targetGroupId = null;
            
            // If over a group directly
            if (over.id) {
                // Since tasks in TaskPreview don't have groupId in data,
                // we need to find which group contains this task
                targetGroupId = GetGroupIdForItemID(over.id);
            }
            
            
            // If we determined a group, update the active group
            if (targetGroupId) {
                setActiveGroupId(targetGroupId);
            }
        }
    }, [draggingType, items])

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