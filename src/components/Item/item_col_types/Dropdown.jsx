export const Dropdown = ({column, value}) => {
    const label = column.settings.options.find(label => label._id === value)?.label || 'Label';
    return (
        <div className="dropdown-item">
            {/* The + icon that shows on hover regardless of content */}
            <div className="dropdown-icons-container">
                <div className="dropdown-icon-wrapper dropdown-add-icon">
                    <span>+</span>
                </div>
            </div>
            <span>{label}</span>
        </div>
    );
};