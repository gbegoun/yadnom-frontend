import { useSelector } from 'react-redux';
import SVGService from '../../services/svg/svg.service';
import { useModal } from '../../contexts/modal/useModal.jsx';
import { CommentMenu } from '../modal_types/CommentMenu.jsx';
import { deleteCommentOptimistic } from '../../store/actions/board.actions.js';

export const TaskCommentPreview = ({ comment, onCommentDelete }) => {

    const { openModal, closeModal } = useModal();

    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board);
    // console.log("Creator",board.)
    const commenter = useSelector(state => state.userModule.users).find(user => user._id == comment.created_by);
    const isCommenter = user?._id == comment.created_by;
    const isBoardCreator = user?._id == board?.created_by;


    const onMenuClick = (event) => {
        console.log("isBoardCreator", isBoardCreator)
        const rect = event.target.getBoundingClientRect();
        openModal(<CommentMenu onCommentDelete={onCommentDeleteClicked} isCommenter={isCommenter} isBoardCreator={isBoardCreator} />, { targetRect: rect });
    }

    const onCommentDeleteClicked = () => {
        closeModal();
        onCommentDelete(comment._id);
    }

    const getTimeFromUpdatedAt = () => {
        const updatedAt = new Date(comment.createdAt);
        const now = new Date();

        const diffInYears = now.getFullYear() - updatedAt.getFullYear();
        if (diffInYears > 0) {
            return `${updatedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
        }

        const diffInMonths = now.getMonth() - updatedAt.getMonth();
        if (diffInMonths > 0) {
            return `${updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }

        const diffInDays = now.getDate() - updatedAt.getDate();
        if (diffInDays > 0) {
            return `${diffInDays}d`;
        }

        const diffInHours = now.getHours() - updatedAt.getHours();
        if (diffInHours > 0) {
            return `${diffInHours}h`;
        }

        const diffInMinutes = now.getMinutes() - updatedAt.getMinutes();
        if (diffInMinutes > 0) {
            return `${diffInMinutes}m`;
        }

        const diffInSeconds = now.getSeconds() - updatedAt.getSeconds();
        if (diffInSeconds > 0) {
            return `${diffInSeconds}s`;
        }

        return 'just now';

    }

    if (!user) {
        return <div className="task-comment-preview frame">Loading...</div>;
    }

    return (
        <div className="task-comment-preview frame">
            <div className="comment-header">
                <div className="comment-author">
                    <img className="comment-author-icon" src={commenter.imgUrl} />
                    <span className="comment-author-name">{commenter.fullname}</span>
                </div>
                <div className="comment-createdAt">{getTimeFromUpdatedAt()}</div>
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