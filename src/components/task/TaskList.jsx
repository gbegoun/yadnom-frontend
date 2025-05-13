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

// Create a simple gap component
const DropIndicator = ({ color }) => (
    <div className="task-drop-indicator" style={{ backgroundColor: color || 'rgba(0, 120, 255, 0.2)' }}></div>
);

export const TaskList = ({ group, columns, draggingTaskId, dropIndex, onTasksReordered }) => {
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

    // Function to render tasks with a gap at the dropIndex
    const renderTasksWithDropIndicator = () => {
        console.log(`TaskList for group ${group._id} rendering with dropIndex:`, dropIndex);
        
        // If no dropIndex is provided or it's undefined, just render tasks normally
        if (dropIndex === null || dropIndex === undefined) {
            return tasks.map(task => (
                <TaskPreview
                    key={task._id}
                    id={task._id}
                    task={task}
                    columns={columns}
                    color={group.color}
                    groupId={group._id}
                    isDragging={task._id === activeId || task._id === draggingTaskId}
                />
            ));
        }

        // Create a new array with the drop indicator at the specified index
        const tasksWithIndicator = [];
        
        // Insert tasks up to dropIndex
        for (let i = 0; i < tasks.length; i++) {
            // If this is where the drop indicator should go, add it
            if (i === dropIndex) {
                console.log(`Adding drop indicator at index ${i} in group ${group._id}`);
                tasksWithIndicator.push(
                    <DropIndicator key="drop-indicator" color={group.color} />
                );
            }
            
            // Don't render the task that's being dragged if it's in this group
            if (tasks[i]._id !== draggingTaskId) {
                tasksWithIndicator.push(
                    <TaskPreview
                        key={tasks[i]._id}
                        id={tasks[i]._id}
                        task={tasks[i]}
                        columns={columns}
                        color={group.color}
                        groupId={group._id}
                        isDragging={tasks[i]._id === activeId || tasks[i]._id === draggingTaskId}
                    />
                );
            }
        }
        
        // If the drop index is at the end, add the indicator there
        if (dropIndex >= tasks.length) {
            console.log(`Adding drop indicator at end (index ${tasks.length}) in group ${group._id}`);
            tasksWithIndicator.push(
                <DropIndicator key="drop-indicator" color={group.color} />
            );
        }
        
        return tasksWithIndicator;
    };

    return (
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
                {renderTasksWithDropIndicator()}
            </SortableContext>
        </div>
    )
}