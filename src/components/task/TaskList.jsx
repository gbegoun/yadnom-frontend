import { TaskPreview } from './TaskPreview.jsx';
import { useState, useCallback,useRef } from "react"
import {

    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"

export const TaskList = ({ group, columns }) => {
    const [tasks, setTasks] = useState(group.tasks || []);
    return (
        <div className="task-list">
            <SortableContext
                items={tasks.map(task => task._id)}
                strategy={verticalListSortingStrategy}
            >
                {tasks.map(task => (
                    <TaskPreview key={task._id} task={task} columns={columns} color={group.color} />
                ))}
            </SortableContext>
        </div>
    )
}