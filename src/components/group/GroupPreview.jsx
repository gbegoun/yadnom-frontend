import { GroupHeader } from "./GroupHeader";
import { TaskList } from "../task/TaskList";
import { GroupFooter } from "./GroupFooter";
import { GroupHeaderCollapsed } from "./GroupHeaderCollapsed";
import { GroupHeaderSorting } from "./GroupHeaderSorting";
import { useState } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const GroupPreview = ({ 
    id, 
    columns, 
    group, 
    tasks,
    isSorting, 
    isDragging, 
    isActiveDropArea,
    dropIndex,  
    draggingTaskId 
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ 
        id,
        data: {
            type: 'group',
            group
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isActiveDropArea) {
        style.backgroundColor = 'rgba(0, 120, 255, 0.1)';
        style.boxShadow = '0 0 0 2px rgba(0, 120, 255, 0.5)';
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-dragging-placeholer" />
        )
    }

    if (isSorting) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-preview collapsed"
            >
                <GroupHeaderSorting title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed} />
            </div>
        )
    }

    if (isCollapsed) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-preview collapsed"
            >
                <GroupHeaderCollapsed title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed} />
            </div>
        )
    } else {
        return (
            <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`group-preview ${isDragging ? 'is-dragging' : ''} ${isActiveDropArea ? 'is-active-drop-area' : ''}`}
            >
            <GroupHeader title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed} />
            <TaskList 
                group={group} 
                columns={columns}
                tasks={tasks}
                draggingTaskId={draggingTaskId}
                dropIndex={dropIndex}  // Pass through the drop index
            />
            <GroupFooter group={group} columns={columns} />
            </div>
        )
    }
}
