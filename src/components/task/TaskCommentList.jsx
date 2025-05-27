
import { TaskCommentPreview } from "./TaskCommentPreview.jsx";

export const TaskCommentList = ({ comments }) => {

    console.log('Rendering TaskCommentList with comments:', comments);
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