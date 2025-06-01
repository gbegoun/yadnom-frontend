import SVGService from '../../services/svg/svg.service';

export const CommentMenu = ({ onCommentDelete, isCommenter, isBoardCreator }) => {
    console.log("isCommenter", isCommenter)
    return (
        <div className="comment-menu" >
            <div className={`delete-comment ${(!isCommenter && !isBoardCreator) && "disabled"}`} onClick={onCommentDelete}>
                <SVGService.DeleteIcon className="icon" />
                <span className="label">Delete Update</span >
            </div >
        </div>
    )
}
