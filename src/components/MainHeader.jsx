import { Link } from 'react-router-dom';

export const MainHeader = () => {
    return (
        <div className="main-header">
            <Link to="/">
                <img src="../src/assets/icons/full_logo.png" alt="Logo" className="main-header-logo" />
            </Link>
            <div className="main-header-right-group">
                <img src="../src/assets/icons/notification_bell_icon.svg" alt="Notification" className="main-header-left-icons" />
                <img src="../src/assets/icons/invite_members_icon.svg" alt="invite members" className="main-header-left-icons" />
                |
                <img src="../src/assets/icons/dots_cube_icon.svg" alt="Products Switcher" className="main-header-products-switcher" />
                <div className='avatar-container'>
                    <img src="../src/assets/icons/simple_logo.png" alt="Products Switcher" className="main-header-simple-logo" />
                    <img src="../src/assets/icons/default_profile_pic.svg" alt="Profile" className="main-header-profile" />
                </div>
            </div>
        </div>
    );
};