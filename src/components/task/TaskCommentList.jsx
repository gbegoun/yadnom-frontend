
import { TaskCommentPreview } from "./TaskCommentPreview.jsx";

export const TaskCommentList = ({ comments, onCommentDelete }) => {

    return (
        <div className="task-comment-list">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <TaskCommentPreview comment={comment} onCommentDelete={onCommentDelete}/>
                </div>
            ))}
        </div>
    )
}