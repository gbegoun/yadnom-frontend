import { userService } from '../../services/user/index.js';

export const UserAvatar = ({
    userId,
    users,
    size = 'normal', // 'tiny', 'small', 'normal', 'large'
    className = '',
    showTooltip = true,
    onClick = null
}) => {
    const userInfo = userService.getUserDisplayInfo(userId, users);

    const sizeClasses = {
        tiny: 'user-avatar-tiny',
        small: 'user-avatar-small',
        normal: 'user-avatar-normal',
        large: 'user-avatar-large'
    };

    const avatarClass = `user-avatar ${sizeClasses[size]} ${className}`;

    return (
        <div
            className={avatarClass}
            title={showTooltip ? userInfo.name : ''}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {userInfo.imgUrl ? (
                <img
                    src={userInfo.imgUrl}
                    alt={userInfo.name}
                    className="avatar-image"
                    onError={e => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
            ) : null}
            <span
                className="avatar-initials"
                style={{ display: userInfo.imgUrl ? 'none' : 'flex' }}
            >
                {userInfo.initials}
            </span>
        </div>
    );
};

// Simplified version for when you already have userInfo
export const UserAvatarFromInfo = ({
    userInfo,
    size = 'normal',
    className = '',
    showTooltip = true,
    onClick = null
}) => {
    const sizeClasses = {
        tiny: 'user-avatar-tiny',
        small: 'user-avatar-small',
        normal: 'user-avatar-normal',
        large: 'user-avatar-large'
    };

    const avatarClass = `user-avatar ${sizeClasses[size]} ${className}`;

    return (
        <div
            className={avatarClass}
            title={showTooltip ? userInfo.name : ''}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {userInfo.imgUrl ? (
                <img
                    src={userInfo.imgUrl}
                    alt={userInfo.name}
                    className="avatar-image"
                    onError={e => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
            ) : null}
            <span
                className="avatar-initials"
                style={{ display: userInfo.imgUrl ? 'none' : 'flex' }}
            >
                {userInfo.initials}
            </span>
        </div>
    );
};
