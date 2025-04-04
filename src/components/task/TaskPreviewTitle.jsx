export const TaskPreviewTitle = ({ task, color }) => {
    return (
        <div className="task-preview-title-wrapper">
            <div className="task-preview-menu" />
            <div className="task-left-indicator" style={{ backgroundColor: color }} />
            <div className="task-checkbox-wrapper">
                <input class="task-checkbox" name="" type="checkbox" aria-label="" value="" />
            </div>
            <div className="task-title">{task.title}</div>
        </div>
    )
}