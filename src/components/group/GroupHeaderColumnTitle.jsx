export const GroupHeaderColumnTitle = ({ color }) => {
    return (
        <div className="group-header-column-title-wrapper">
            <div className="group-header-left-indicator" style={{ backgroundColor: color }} />
            <div className="group-header-column-checkbox-wrapper"><input class="group-header-column-checkbox" name="" type="checkbox" aria-label="" value=""/></div>
            <div className="group-header-column-title group-header-column-cell">Task</div>
        </div>
    )
}