import { Link } from 'react-router-dom';
import SVGService from '../services/svg/svg.service';

export const MainHeader = () => {
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
                    <SVGService.DefaultProfilePic className="main-header-profile" />
                </div>
            </div>
        </div>
    );
};