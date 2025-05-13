import { GroupHeader } from "./GroupHeader";
import { TaskList } from "../task/TaskList";
import { GroupFooter } from "./GroupFooter";
import { GroupHeaderCollapsed } from "./GroupHeaderCollapsed";
import { GroupHeaderSorting } from "./GroupHeaderSorting";
import { useState } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const GroupPreview = ({ id, columns, group, isSorting, isDragging }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if  ( isDragging ) {
        return (
           <div ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-dragging-placeholer"/> 
        )
    }

    if (isSorting)
    {
        return (
            <div 
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-preview collapsed" 
            >
                <GroupHeaderSorting title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed}/>
            </div>
        )
    }

    if (isCollapsed ) {
        return (
            <div 
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-preview collapsed" 
            >
                <GroupHeaderCollapsed title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed}/>
            </div>
        )
    } else {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group-preview"
            >
                <GroupHeader title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed} />
                <TaskList group={group} columns={columns} />
                <GroupFooter group={group} columns={columns} />
            </div>
        )
    }
}
