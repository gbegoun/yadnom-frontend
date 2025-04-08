export const Dropdown = ({column, value}) => {
    const label = column.settings.options.find(label => label._id === value)?.label || 'Label';
    console.log(value)

    return (
        <div className="dropdown-item">
            <span>{label}</span>
        </div>
    );
};