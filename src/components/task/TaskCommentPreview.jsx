export const TaskCommentPreview = ({ comment }) => {
    console.log('Rendering TaskCommentPreview with comment:', comment);
    return (
        <div className="task-comment-preview frame">
            <div className="comment-text">{comment.text}</div>
        </div>
    );
}