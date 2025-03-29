import { GroupHeader } from "./GroupHeader";
import { Group } from "./Group";

export const GroupList = ({ columns, groups }) => {

    return (
        <div>
            {groups.map(group => {
                return (
                    <div key={group._id}>
                        <GroupHeader title={group.title} color={group.color} />
                        <Group group={group} columns={columns} />
                    </div>
                )
            })}
        </div>
    );
};
