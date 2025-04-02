import { GroupHeaderColumnRow } from "./GroupHeaderColumnRow";
import { GroupHeaderTitleRow } from "./GroupHeaderTitleRow";

export const GroupHeader = ({ title, color, columns }) => {
    return (
        <div className="group-header">
            <GroupHeaderTitleRow title={title} color={color} />
            <GroupHeaderColumnRow columns={columns} />
        </div>
    )
}