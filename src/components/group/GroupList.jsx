import { GroupPreview } from "./GroupPreview";

export const GroupList = ({ columns, groups }) => {

    return (
        <div>
            {groups.map(group => {
                return (
                    <div key={group._id}>
                        <GroupPreview columns={columns} group={group}/>
                    </div>
                )
            })}
        </div>
    );
};