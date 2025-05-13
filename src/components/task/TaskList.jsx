import { TaskPreview } from './TaskPreview.jsx';
import { useState, useEffect } from "react"

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

export const TaskList = ({ group, columns, draggingTaskId, onTasksReordered }) => {
    const [tasks, setTasks] = useState(group.tasks || []);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    useEffect(() => {
        setTasks(group.tasks || []);
    }, [group.tasks]);

    const preventPropagation = (e) => {
        e.stopPropagation();
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over?.id) {
            setTasks((items) => {
                const oldIndex = items.findIndex(item => item._id === active.id);
                const newIndex = items.findIndex(item => item._id === over.id);
                
                const newTasks = arrayMove(items, oldIndex, newIndex);
                
                // If you need to save this order to your backend, call a function here
                if (onTasksReordered) {
                    onTasksReordered(group._id, newTasks);
                }
                
                return newTasks;
            });
        }
        
        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div
                className="task-list"
                onClick={preventPropagation}
                onMouseDown={preventPropagation}
                onPointerDown={preventPropagation}
            >
                <SortableContext
                    items={tasks.map(task => task._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map(task => (
                        <TaskPreview
                            key={task._id}
                            id={task._id}
                            task={task}
                            columns={columns}
                            color={group.color}
                            groupId={group._id}
                            isDragging={task._id === activeId || task._id === draggingTaskId}
                        />
                    ))}
                </SortableContext>
            </div>
        </DndContext>
    )
}