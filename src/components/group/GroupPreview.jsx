import { GroupHeader } from "./GroupHeader";
import { GroupFooter } from "./GroupFooter";
import { TaskList } from "../task/TaskList";


export const GroupPreview = ({ columns, group }) => {
    return (
        <div>
            <GroupHeader title={group.title} color={group.color} />
            <TaskList group={group} columns={columns} />
            <GroupFooter group={group}/>
        </div>
    )
}
