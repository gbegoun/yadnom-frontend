import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import SVGService from '../../services/svg/svg.service';
import { userService } from '../../services/user/index.js';
import { UserAvatarFromInfo } from '../shared/UserAvatar.jsx';

export const PeopleOptionsModal = ({ people, onBulkUpdate, initialSelectedIds = [] }) => {
    const users = useSelector(state => state.userModule.users);
    const [selectedUsers, setSelectedUsers] = useState(initialSelectedIds);

    // Send bulk update when selectedUsers changes
    useEffect(() => {
        if (onBulkUpdate) {
            onBulkUpdate(selectedUsers);
        }
    }, [selectedUsers, onBulkUpdate]);

    // Handle adding a suggested user (only add, don't remove)
    const handleSuggestedUserAdd = (person) => {
        // Only add if not already selected
        if (!selectedUsers.includes(person._id)) {
            setSelectedUsers(prevSelected => [...prevSelected, person._id]);
        }
    };

    // Get suggested people (first 4 unselected users)
    const suggestedPeople = people
        .filter(person => !selectedUsers.includes(person._id)) // Filter out already selected users
        .slice(0, 4); // Take first 4 unselected users

    return (
        <div className="people-options-container">
            {/* Selected user(s) at the top */}
            {selectedUsers.length > 0 && (<div className="selected-users-container">
                {selectedUsers.map(userId => {
                    const userInfo = userService.getUserDisplayInfo(userId, users);
                    return (
                        <div key={userId} className="selected-user-pill">
                            <UserAvatarFromInfo
                                userInfo={userInfo}
                                size="tiny"
                                className="user-option-avatar"
                            />
                            <span className="selected-user-name">{userInfo.name}</span>
                            <button
                                className="remove-user-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedUsers(selectedUsers.filter(id => id !== userId));
                                }}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                    );
                })}
            </div>)}

            {/* Suggested people section */}
            <div className="people-section">
                <h4 className="section-title">Suggested people</h4>
                <ul className="people-options-list">
                    {suggestedPeople.map(person => {
                        const userInfo = userService.getUserDisplayInfo(person._id, users);
                        const isSelected = selectedUsers.includes(person._id);

                        return (
                            <li key={person._id}>
                                <button
                                    className={`people-option-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleSuggestedUserAdd(person)}
                                    disabled={isSelected}
                                >
                                    <UserAvatarFromInfo
                                        userInfo={userInfo}
                                        size="normal"
                                        className="user-option-avatar"
                                    />
                                    <span className="user-option-name">{userInfo.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* New member option */}
            <div className="invite-new-member">
                <span className="invite-icon">
                    <SVGService.InviteMembersIcon />
                </span>
                <span>Invite a new member by email</span>
            </div>
        </div>
    );
};