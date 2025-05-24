import { GroupHeaderColumnRow } from "./GroupHeaderColumnRow";
import { GroupHeaderTitleRow } from "./GroupHeaderTitleRow";

export const GroupHeader = ({ tasks, title,  columns, group, setIsCollapsed }) => {

    return (
        <div className="group-header">
            <GroupHeaderTitleRow  tasks={tasks} title={title} setIsCollapsed={setIsCollapsed} group={group} />
            <GroupHeaderColumnRow columns={columns} group={group} />
        </div>
    )
}
