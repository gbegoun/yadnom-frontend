import { GroupHeaderColumnRow } from "./GroupHeaderColumnRow";
import { GroupHeaderTitleRow } from "./GroupHeaderTitleRow";

export const GroupHeader = ({ title, color, columns, tasks, setIsCollapsed }) => {

    return (
        <div className="group-header">
            <GroupHeaderTitleRow title={title} tasks={tasks} color={color} setIsCollapsed={setIsCollapsed}/>
            <GroupHeaderColumnRow columns={columns} color={color} />
        </div>
    )
}
