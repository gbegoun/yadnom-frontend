export const Label = ({column, value}) => {
    const color = column.settings.options.find(label => label._id === value)?.color || '#000';
    const label = column.settings.options.find(label => label._id === value)?.label || 'Label';

    return (
        <div className="label-item"  style={{backgroundColor: color}}>
            <span>{label}</span>
        </div>
    )
}