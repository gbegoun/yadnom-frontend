import { Link } from 'react-router-dom';

export const MainHeader = () => {
    return (
        <div className="main-header">
            <Link to="/">
                <img src="../src/assets/icons/full_logo.png" alt="Logo" className="main-header-logo" />
            </Link>
            <div className="main-header-right-group">
                <img src="../src/assets/icons/notification_bell.svg" alt="Notification" className="main-header-notification" />
                <img src="../src/assets/icons/dots_cube.svg" alt="Products Switcher" className="main-header-products-switcher" />
                <img src="../src/assets/icons/default_profile_pic.svg" alt="Profile" className="main-header-profile" />
            </div>
        </div>
    );
};