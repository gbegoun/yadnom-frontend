import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import SVGService from '../../services/svg/svg.service';

export const PeopleOptionsModal = ({ people, onBulkUpdate, initialSelectedIds = [] }) => {
    const users = useSelector(state => state.userModule.users);
    const [selectedUsers, setSelectedUsers] = useState(initialSelectedIds);

    // Send bulk update when selectedUsers changes
    useEffect(() => {
        if (onBulkUpdate) {
            onBulkUpdate(selectedUsers);
        }
    }, [selectedUsers, onBulkUpdate]);

    // Get user information by ID with fallback values - using useCallback to memoize
    const getUserInfo = useCallback((userId) => {
        const user = users.find(user => user._id === userId || user._id === userId.toString());

        // Handle case when user is not found
        if (!user) {
            return {
                initials: '??',
                name: 'Unknown User',
                imgUrl: null
            };
        }

        // Extract user data with fallbacks
        const name = user.fullName || user.fullname || user.username || 'Unknown User';
        const initials = name.split(' ')
            .map(namePart => namePart[0])
            .join('')
            .toUpperCase() || '??';
        const imgUrl = user.imageUrl || user.imgUrl || null;

        return { initials, name, imgUrl };
    }, [users]);

    // Render avatar (image or initials based on availability)
    const renderAvatar = (userInfo, small = false) => (
        <div className={`user-option-avatar ${small ? 'small' : ''}`}>
            {userInfo.imgUrl && (
                <img
                    src={userInfo.imgUrl}
                    alt={userInfo.name}
                    className="option-avatar-image"
                    onError={e => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
            )}
            <span
                className="option-avatar-initials"
                style={{ display: userInfo.imgUrl ? 'none' : 'flex' }}
            >
                {userInfo.initials}
            </span>
        </div>);

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
            {selectedUsers.length > 0 && (
                <div className="selected-users-container">
                    {selectedUsers.map(userId => {
                        const userInfo = getUserInfo(userId);
                        return (
                            <div key={userId} className="selected-user-pill">
                                {renderAvatar(userInfo, true)}
                                <span className="selected-user-name">{userInfo.name}</span>                                <button
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
                        const userInfo = getUserInfo(person._id);
                        const isSelected = selectedUsers.includes(person._id);

                        return (
                            <li key={person._id}>                                <button
                                className={`people-option-btn ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSuggestedUserAdd(person)}
                                disabled={isSelected}
                            >
                                {renderAvatar(userInfo)}
                                <span className="user-option-name">{userInfo.name}</span>
                            </button>
                            </li>
                        );
                    })}
                </ul>            </div>

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