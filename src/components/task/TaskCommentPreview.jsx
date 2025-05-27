import { useSelector } from 'react-redux';

export const TaskCommentPreview = ({ comment }) => {
    const users = useSelector(state => state.userModule.users);
    const user = users.find(user => user._id == comment.authorId);
    if (!user) {
        return <div className="task-comment-preview frame">Loading...</div>;
    }
    return (
        <div className="task-comment-preview frame">
            <div className="comment-header">
                <div className="comment-author">
                    <img className="comment-author-icon" src={user.imgUrl} />
                    <span className="comment-author-name">{user.fullname}</span>
                </div>
                <div className="comment-creationTime">{new Date(comment.creationTime).toLocaleDateString()}</div>
            </div>
            <div className="comment-text">
                <p>{comment.text}</p>
            </div>
            <div className="comment-replies">
                <div className="reply-input-wrapper">
                    <div className="current-user-image-wrapper">
                        <img className="current-user-image" src={user.imgUrl} />
                    </div>
                    <input className="reply-input" type="text" placeholder="Write a reply" />
                </div>
            </div>
        </div>
    );
}