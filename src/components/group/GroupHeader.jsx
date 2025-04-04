import { GroupHeaderColumnRow } from "./GroupHeaderColumnRow";
import { GroupHeaderTitleRow } from "./GroupHeaderTitleRow";

export const GroupHeader = ({ title, color, columns, setIsCollapsed }) => {

    return (
        <div className="group-header">
            <GroupHeaderTitleRow title={title} color={color} setIsCollapsed={setIsCollapsed}/>
            <GroupHeaderColumnRow columns={columns} color={color} />
        </div>
    )
}
