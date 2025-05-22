import { GroupHeaderColumnRow } from "./GroupHeaderColumnRow";
import { GroupHeaderTitleRow } from "./GroupHeaderTitleRow";

export const GroupHeader = ({ group, columns, setIsCollapsed }) => {
    const { title, color, _id } = group;

    return (
        <div className="group-header">
            <GroupHeaderTitleRow title={title} color={color} setIsCollapsed={setIsCollapsed} group={group} />
            <GroupHeaderColumnRow columns={columns} color={color} />
        </div>
    )
}
