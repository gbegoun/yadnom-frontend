import { useSelector } from 'react-redux';
import SVGService from '../../services/svg/svg.service';
import { useModal } from '../../contexts/modal/useModal.jsx';
import { CommentMenu } from '../modal_types/CommentMenu.jsx';
import { deleteCommentOptimistic } from '../../store/actions/board.actions.js';

export const TaskCommentPreview = ({ comment, onCommentDelete }) => {

    const { openModal, closeModal } = useModal();

    const users = useSelector(state => state.userModule.users);
    const user = users.find(user => user._id == comment.authorId);

    const onMenuClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        openModal(<CommentMenu onCommentDelete={onCommentDeleteClicked} />, { targetRect: rect });
    }

    const onCommentDeleteClicked = () => {
        closeModal();
        onCommentDelete(comment._id);
    }



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
                <div className="comment-createdAt">{new Date(comment.createdAt).toLocaleDateString()}</div>
                <div className="comment-menu-wrapper" onClick={(event) => onMenuClick(event)}>
                    <SVGService.OptionsIcon className="comment-menu-icon" />
                </div>
            </div>
            <div className="comment-text">
                <p>{comment.text}</p>
            </div>
            {/* <div className="comment-replies">
                <div className="reply-input-wrapper">
                    <div className="current-user-image-wrapper">
                        <img className="current-user-image" src={user.imgUrl} />
                    </div>
                    <input className="reply-input" type="text" placeholder="Write a reply" />
                </div>
            </div> */}
        </div>
    );
}