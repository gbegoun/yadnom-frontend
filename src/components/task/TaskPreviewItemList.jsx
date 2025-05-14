import { DynamicItem } from "../item/DynamicItem"

export const TaskPreviewItemList = ({ task, columns, groupId }) => {
    // If groupId isn't provided, try to find it from task
    const taskGroupId = groupId || task.groupId

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
                        groupId={taskGroupId}
                    />
                </div>
            )}
        </div>
    )
}