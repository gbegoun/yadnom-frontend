import { GroupHeader } from "./GroupHeader";
import { TaskList } from "../task/TaskList";
import { GroupFooter } from "./GroupFooter";

export const GroupPreview = ({ columns, group }) => {
    return (
        <div className="group-preview">
            <GroupHeader title={group.title} color={group.color} columns={columns} />
            <TaskList group={group} columns={columns} />
            <GroupFooter group={group} columns={columns} />
        </div>
    );
};
