import { useState, useCallback } from "react"
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


export const GroupList = ({ columns, groups }) => {
    const [items, setItems] = useState(groups)
    const [isSorting, setIsSorting] = useState(false)
    const [draggingId, setDraggingId] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item._id === active.id)
                const newIndex = items.findIndex(item => item._id === over.id)

                return arrayMove(items, oldIndex, newIndex)
            })
        }
        setIsSorting(false)
        setDraggingId(null)
    }, [])

    const handleDragStart = useCallback((event) => {
        console.log('drag start', event.active.id)
        setDraggingId(event.active.id)
        setIsSorting(true)
    }, [])

    const getDraggingItem = useCallback(() => {
        return items.find(item => item._id === draggingId)
    }, [draggingId, items])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="group-list">
                <SortableContext
                    items={items.map(item => item._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(group => (
                        <GroupPreview
                            key={group._id}
                            id={group._id}
                            columns={columns}
                            group={group}
                            isSorting={isSorting}
                            isDragging={group._id === draggingId}
                        />
                    ))}
                </SortableContext>
            </div>
            <DragOverlay>
                {isSorting ? (
                    <div className="drag-overlay">
                        <GroupPreview
                            id={draggingId}
                            columns={columns}
                            group={getDraggingItem()}
                            isSorting={isSorting}
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}