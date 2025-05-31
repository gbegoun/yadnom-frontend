import { useContext } from 'react';
import { BoardContext } from '../../contexts/board/BoardContext.jsx';
import { TaskPreviewTitle } from "./TaskPreviewTitle"
import { TaskPreviewItemList } from "./TaskPreviewItemList"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskPreview = ({ id, task, columns, color, isDragging, groupId }) => {
    const { selectedTaskId, onTaskSelect } = useContext(BoardContext);
    const isSelected = selectedTaskId === id;
    
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
        style.cursor = 'grabbing'; 
    }

    const handleClick = (e) => {
        // Prevent interference with input elements and checkboxes
        if (e.target.closest('.task-title-input') || 
            e.target.closest('.task-checkbox') ||
            e.target.closest('.task-preview-menu-icon')) {
            return;
        }
        
        // Call the selection handler
        onTaskSelect(id);
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners}
            className={`task-preview ${isDragging ? 'is-dragging' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <TaskPreviewTitle task={task} color={color} groupId={groupId} />
            <TaskPreviewItemList task={task} columns={columns} />
            <div className="task-preview-last-cell" />
        </div>
    )
}