
import { TaskCommentPreview } from "./TaskCommentPreview.jsx";

export const TaskCommentList = ({ comments }) => {

    return (
        <div className="task-comment-list">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <TaskCommentPreview comment={comment} />
                </div>
            ))}
        </div>
    )
}