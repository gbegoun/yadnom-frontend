export const GroupHeaderColumnRow = ({ columns, color }) => {
    return (
        <div className="group-header-column-row">
            <div className="group-header-left-indicator" style={{ backgroundColor: color }} />
            <div className="group-header-column-checkbox-wrapper"><input class="group-header-column-checkbox" name="" type="checkbox" aria-label="" value=""/></div>
            <div className="group-header-column-title group-header-column-cell">Task</div>
            {columns.map((column, index) => <div key={index} className="group-header-column-cell">{column.title}</div>)}
            <div className="group-header-column-last-cell"/>
        </div>
    )
}