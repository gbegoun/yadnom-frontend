import { GroupHeader } from "./GroupHeader";
import { TaskList } from "../task/TaskList";
import { GroupFooter } from "./GroupFooter";
import { GroupHeaderCollapsed } from "./GroupHeaderCollapsed";
import { useState } from "react";

export const GroupPreview = ({ columns, group }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    if (isCollapsed) {
        return (
            <div className="group-preview collapsed">
                <GroupHeaderCollapsed title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed}/>
            </div>
        )
    } else {
        return (
            <div className="group-preview">
                <GroupHeader title={group.title} color={group.color} columns={columns} setIsCollapsed={setIsCollapsed} />
                <TaskList group={group} columns={columns} />
                <GroupFooter group={group} columns={columns} />
            </div>
        )
    }
}
