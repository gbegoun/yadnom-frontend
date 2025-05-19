import { DynamicItem } from "../item/DynamicItem"

export const TaskPreviewItemList = ({ task, columns }) => {
    return (
        <div className="task-preview-item-wrapper">
            {columns.map(column =>
                <div
                    key={column._id}
                    className="task-preview-item"
                    style={{ width: column.width }}
                >
                    <DynamicItem 
                        column={column} 
                        value={task.column_values[column._id]}
                        taskId={task._id}
                        groupId={task.groupid}
                    />
                </div>
            )}
        </div>
    )
}