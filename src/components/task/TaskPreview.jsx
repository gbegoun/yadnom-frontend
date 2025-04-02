export const TaskPreview = ({ task, columns, color }) => {
    return (
        <div className="task-preview">
            <div className="task-left-indicator" style={{ backgroundColor: color }} />
            <div className="task-checkbox-wrapper">
                <input class="task-checkbox" name="" type="checkbox" aria-label="" value=""/>
            </div>
            <div className="task-title">{task.title}</div>
            {columns.map(column => <div key={column._id} className="task-preview-item">{task.column_values[column._id]}</div>)}
            <div className="task-preview-last-cell"/>
        </div>
    )
}