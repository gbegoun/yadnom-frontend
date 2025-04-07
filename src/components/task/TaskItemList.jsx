export const TaskItemList = ({ columns, task }) => {
    return (
        <div className="task-preview-item-wrapper">
            {columns.map(column => <div key={column._id} className="task-preview-item">{task.column_values[column._id]}</div>)}
        </div>
    )
}