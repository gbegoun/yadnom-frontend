import { Link } from 'react-router-dom';
import SVGService from '../services/svg/svg.service';
import { useSelector } from 'react-redux';
import { UserAvatar } from './shared/UserAvatar';

export const MainHeader = () => {
    const board = useSelector(state => state.boardModule.board);
    const users = useSelector(state => state.userModule.users);

    const boardManagerId = board?.created_by[0];

    if (!board || !users) return <div className='loading'>Loading...</div>;

    return (
        <div className="main-header">
            <Link to="/">
                <img src="../src/assets/icons/full_logo.png" alt="Logo" className="main-header-logo" />
            </Link>
            <div className="main-header-right-group">
                <SVGService.NotificationBellIcon className="main-header-left-icons" />
                <SVGService.InviteMembersIcon className="main-header-left-icons" />
                |
                <SVGService.DotsCubeIcon className="main-header-products-switcher" />
                <div className='avatar-container'>
                    <img src="../src/assets/icons/simple_logo.png" alt="Products Switcher" className="main-header-simple-logo" />
                    <UserAvatar
                        userId={boardManagerId}
                        users={users}
                        size="normal"
                        className="main-header-profile"
                        showTooltip={true}
                    />
                </div>
            </div>
        </div>
    );
};