
import { useSelector } from "react-redux";
import SVGService from "../../services/svg/svg.service.js";
import { userService } from "../../services/user/index.js";
import { UserAvatarFromInfo } from "../shared/UserAvatar.jsx";

export const PeopleSummary = ({ column, tasks }) => {
    const users = useSelector(state => state.userModule.users);

    const getOwners = () => {
        const uniqueValues = new Set();

        tasks.forEach(task => {
            const value = task.column_values?.[column._id];
            if (value && Array.isArray(value)) {
                value.forEach(person => {
                    // console.log('person', person);
                    if (person) uniqueValues.add(person);
                });
            }
        });
        return Array.from(uniqueValues).sort();
    }

    // Get user info for all owners
    const ownerIds = getOwners();
    const selectedUsers = ownerIds.map(id => userService.getUserDisplayInfo(id, users)).filter(user => user);
    const MAX_VISIBLE_AVATARS = 3;

    return (
        <div className="people-summary">
            {selectedUsers.length > 0 ? (
                <div className="people-avatars-summary">
                    {selectedUsers.slice(0, MAX_VISIBLE_AVATARS).map((userInfo, index) => (
                        <UserAvatarFromInfo
                            key={ownerIds[index]}
                            userInfo={userInfo}
                            size="small"
                            className="people-summary-avatar-item"
                            showTooltip={true}
                        />
                    ))}
                    {selectedUsers.length > MAX_VISIBLE_AVATARS && (
                        <div className="additional-count-summary">
                            +{selectedUsers.length - MAX_VISIBLE_AVATARS}
                        </div>
                    )}
                </div>
            ) : (
                <div className="default-profile-summary">
                    <SVGService.DefaultProfilePic className="default-profile-icon-summary" />
                </div>
            )}
        </div>
    )
}