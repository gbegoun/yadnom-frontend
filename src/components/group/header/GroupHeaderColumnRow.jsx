
export const GroupHeaderColumnRow = ({ columns }) => {

    return (
        <div className="group-header-column-row">
            <div className="group-header-column-checkbox">X</div>
            <div className="group-header-column-cell"></div>
            <div className="group-header-column-cell">Item</div>
            {columns.map((column, index) => <div key={index} className="group-header-column-cell">{column.title}</div>)}
        </div>
    )
}