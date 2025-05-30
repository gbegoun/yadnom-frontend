import SVGService from '../../services/svg/svg.service';

export const CommentMenu = ({ onCommentDelete }) => {

    return (
        <div className="comment-menu" >
            <div className="delete-comment" onClick={onCommentDelete}>
                <SVGService.DeleteIcon className="icon" />
                <span className="label">Delete Update</span >
            </div >
        </div>
    )
}
