
import { useSelector } from "react-redux";
import SVGService from "../../services/svg/svg.service.js";

export const PeopleSummary = ({ column, tasks }) => {
    const users = useSelector(state => state.userModule.users);

    // Helper functions similar to People component
    const getUserByIdFromUsers = (userId) => users.find(user => user._id === userId || user._id === userId.toString());

    const getUserDisplayInfo = (userId) => {
        const user = getUserByIdFromUsers(userId);
        if (!user) return { initials: '??', name: 'Unknown User', imgUrl: null };
        const name = user.fullName || user.fullname || user.username || 'Unknown User';
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
        return { initials, name, imgUrl: user.imageUrl || user.imgUrl || null };
    };

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
    const selectedUsers = ownerIds.map(id => getUserDisplayInfo(id)).filter(user => user);
    const maxVisibleAvatars = 3;

    return (
        <div className="people-summary">
            {selectedUsers.length > 0 ? (
                <div className="people-avatars-summary">
                    {selectedUsers.slice(0, maxVisibleAvatars).map((userInfo, index) => (
                        <div key={ownerIds[index]} className="user-avatar-summary">
                            {userInfo.imgUrl ? (
                                <img
                                    src={userInfo.imgUrl}
                                    alt={userInfo.name}
                                    className="avatar-image-summary"
                                    onError={e => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <span
                                className="avatar-initials-summary"
                                style={{ display: userInfo.imgUrl ? 'none' : 'flex' }}
                                title={userInfo.name}
                            >
                                {userInfo.initials}
                            </span>
                        </div>
                    ))}
                    {selectedUsers.length > maxVisibleAvatars && (
                        <div className="additional-count-summary">
                            +{selectedUsers.length - maxVisibleAvatars}
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