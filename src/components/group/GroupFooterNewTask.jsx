export const GroupFooterNewTask = ({ color }) => {
    return (
        <div className="group-footer-new-task-row">
            <div className="group-footer-new-task-wrapper">
                <div className="group-footer-left-indicator" style={{ backgroundColor: color }} />
                <div className="group-footer-checkbox-wrapper">
                    <input class="group-footer-checkbox" name="" type="checkbox" aria-label="" value="" />
                </div>
                <div className="group-footer-new-task">+ Add task</div>
            </div>
            <div className="group-footer-new-task-blank"/>
        </div>
    )
}