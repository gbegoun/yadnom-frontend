export const MainHeader = () => {
    return (
        <div className="main-header">
            <img src="../src/assets/styles/icons/full_logo.png" alt="Logo" className="main-header-logo" />
            <div className="main-header-right-group">
                <img src="../src/assets/styles/icons/notification_bell.svg" alt="Notification" className="main-header-notification" />
                <img src="../src/assets/styles/icons/dots_cube.svg" alt="Products Switcher" className="main-header-products-switcher" />
                <img src="../src/assets/styles/icons/default_profile_pic.svg" alt="Profile" className="main-header-profile" />
            </div>
        </div>
    );
};