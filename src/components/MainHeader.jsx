import { Link } from 'react-router-dom';
import SVGService from '../services/svg/svg.service';
import { useSelector } from 'react-redux';
import { UserAvatar } from './shared/UserAvatar';

export const MainHeader = () => {
    // const board = useSelector(state => state.boardModule.board);
    const users = useSelector(state => state.userModule.users);
    // const loggedInUser = useSelector(state => state.userModule.user);

    const boardManagerId = 201;

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
                        userId={boardManagerId}
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