import { GroupHeader } from "./GroupHeader";
import { TaskList } from "./TaskList";

export const GroupList = ({ columns, groups }) => {

    return (
        <div>
            {groups.map(group => {
                return (
                    <div key={group._id}>
                        <GroupHeader title={group.title} color={group.color} />
                        <TaskList group={group} columns={columns} />
                    </div>
                )
            })}
        </div>
    );
};
