
export const TaskPreviewItemList = ({ task, columns, color }) => {
    return (
        <div className="task-preview-item-wrapper">
            {columns.map(column =>
                <div
                    key={column._id}
                    className="task-preview-item"
                    style={{width:column.width}}
                    >
                    {task.column_values[column._id]}
                    
                </div>
            )}
        </div>
    )
}