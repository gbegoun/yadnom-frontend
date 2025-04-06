import { TaskPreviewTitle } from "./TaskPreviewTitle"
import { TaskPreviewItemList } from "./TaskPreviewItemList"

export const TaskPreview = ({ task, columns, color }) => {
    return (
        <div className="task-preview">
            <TaskPreviewTitle task={task} color={color} />
            <TaskPreviewItemList task={task} columns={columns} />
            <div className="task-preview-last-cell" />
        </div>
    )
}