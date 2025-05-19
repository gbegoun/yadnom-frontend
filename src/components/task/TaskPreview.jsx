import { TaskPreviewTitle } from "./TaskPreviewTitle"
import { TaskPreviewItemList } from "./TaskPreviewItemList"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskPreview = ({ id, task, columns, color, isDragging, groupId }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ 
        id,
        data: {
            type: 'task',
            task,
        }
    });

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
            className={`task-preview`}
        >
            <TaskPreviewTitle task={task} color={color} groupId={groupId} />
            <TaskPreviewItemList task={task} columns={columns} />
            <div className="task-preview-last-cell" />
        </div>
    )
}