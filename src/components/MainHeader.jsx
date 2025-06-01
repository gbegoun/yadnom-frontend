import { Link } from 'react-router-dom';
import SVGService from '../services/svg/svg.service';
import { useSelector } from 'react-redux';
import { UserAvatar } from './shared/UserAvatar';
import { useState, useEffect } from 'react';

export const MainHeader = () => {
    const users = useSelector(state => state.userModule.users);
    const loggedInUser = useSelector(state => state.userModule.user);

    console.log("Logged in user:", loggedInUser);
    console.log("Logged in user ID:", loggedInUser?._id);

    if (!loggedInUser || !loggedInUser._id) {
        return <div style={{ color: 'red', fontSize: '20px' }}>Loading user data...</div>;
    }

    return (
        <div className="main-header">
            <Link to="/">
                <img src="https://res.cloudinary.com/drunensjg/image/upload/v1748779183/full_logo_wjvwck.png" alt="Logo" className="main-header-logo" />
            </Link>
            <div className="main-header-right-group">
                <SVGService.NotificationBellIcon className="main-header-left-icons" />
                <SVGService.InviteMembersIcon className="main-header-left-icons" />
                |
                <SVGService.DotsCubeIcon className="main-header-products-switcher" />
                <div className='avatar-container'>
                    <img src="https://res.cloudinary.com/drunensjg/image/upload/v1748779177/simple_logo_hsxrpe.png" alt="Products Switcher" className="main-header-simple-logo" />
                    <UserAvatar
                        userId={loggedInUser._id}
                        users={users}
                        size="normal"
                        className="main-header-avatar"
                        showTooltip={true}
                    />

                    {/* {board && boardManagerId && users ? (
                        <UserAvatar
                            userId={boardManagerId}
                            users={users}
                            size="normal"
                            className="main-header-avatar"
                            showTooltip={true}
                        />
                    ) : loggedInUser && users ? (
                        <UserAvatar
                            userId={boardManagerId}
                            users={users}
                            size="normal"
                            className="main-header-avatar"
                            showTooltip={true}
                        />
                    ) : (
                        <SVGService.DefaultProfilePic className="main-header-profile" />
                    )} */}
                </div>
            </div>
        </div>
    );
};