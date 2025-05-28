import SVGService from '../../services/svg/svg.service.js';
import { TaskCommentList } from './TaskCommentList.jsx';
import { useSelector } from 'react-redux';
import { addCommentOptimistic, deleteCommentOptimistic } from "../../store/actions/board.actions.js";


export const TaskDetails = ({ taskId }) => {
    const board = useSelector(state => state.boardModule.board);

    if (!board) {
        console.error('Board not found in state');
        return <div className='loading'>Loading...</div>;
    }
    const task = board.tasks.find(t => t._id === taskId);

    const addComment = (e) => {
        const input = e.target;
        const commentText = input.value.trim();

        if (commentText) {
            const comment = {
                text: commentText,
                replies: []
            };
            addCommentOptimistic(taskId, comment);
            input.value = '';
        }
    }

    const onCommentDelete = (commentId) => {
        console.log('Deleting comment with ID:', commentId);
        deleteCommentOptimistic(taskId, commentId);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addComment(e);
        }
    };

    return (
        <div className="task-details">
            <div className="header">
                <h2>{task.title}</h2>
                <div className="tabs">
                    <div className="tab active">
                        <SVGService.HomeIcon className="home-icon tab-icon" />
                        <div className="tab-label">Updates{task.comments && ` / ${task.comments.length}`}</div>
                    </div>
                </div>
            </div>
            <div className="content">
                <input
                    className="input-textbox frame"
                    type="text"
                    placeholder="Write an update"
                    onBlur={addComment}
                    onKeyDown={handleKeyDown}
                />
                <TaskCommentList comments={task.comments || []} onCommentDelete={onCommentDelete} />
            </div>
        </div >
    )
};
