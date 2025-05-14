import { TaskPreviewTitle } from "./TaskPreviewTitle"
import { TaskPreviewItemList } from "./TaskPreviewItemList"

export const TaskPreview = ({ task, columns, color, groupId }) => {
    return (
        <div className="task-preview">
            <TaskPreviewTitle task={task} color={color} />
            <TaskPreviewItemList task={task} columns={columns} groupId={groupId} />
            <div className="task-preview-last-cell" />
        </div>
    )
}