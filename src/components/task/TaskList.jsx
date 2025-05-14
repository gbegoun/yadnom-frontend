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

export const TaskList = ({ group, columns,tasks }) => {
    // const [tasks, setTasks] = useState(tasks || []);

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
        // setTasks(tasks || []);
    }, [tasks]);

    const preventPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="task-list"
            onClick={preventPropagation}
            onMouseDown={preventPropagation}
            onPointerDown={preventPropagation}
        >
            {/* <SortableContext
                items={tasks.map(task => task._id)}
                strategy={verticalListSortingStrategy}
            > */}
                {tasks.map(task => {
                    return (
                        <TaskPreview
                            key={task._id}
                            id={task._id}
                            task={task}
                            columns={columns}
                            color={group.color}
                            groupId={group._id}
                        />
                    )
                })}
            {/* </SortableContext> */}
        </div>
    )
}