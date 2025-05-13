import { TaskPreviewTitle } from "./TaskPreviewTitle"
import { TaskPreviewItemList } from "./TaskPreviewItemList"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskPreview = ({ id, task, columns, color, groupId, isDragging }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        style.opacity = 0.5;
    }

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners}
            className={`task-preview ${isDragging ? 'is-dragging' : ''}`}
        >
            <TaskPreviewTitle task={task} color={color} />
            <TaskPreviewItemList task={task} columns={columns} />
            <div className="task-preview-last-cell" />
        </div>
    )
}