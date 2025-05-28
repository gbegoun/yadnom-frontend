import SVGService from '../../services/svg/svg.service.js';
import { TaskCommentList } from './TaskCommentList.jsx';
import { TaskDetailsUpdateInput } from './TaskDetailsUpdateInput.jsx';
import { useSelector } from 'react-redux';
import { addTaskGroup, addNewTask, updateBoard, loadBoard, addCommentOptimistic } from "../../store/actions/board.actions.js";


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
                authorId: 201,
                text: commentText,
                replies: []
            };
            addCommentOptimistic(taskId, comment);
            input.value = '';
        }
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
                <TaskCommentList comments={task.comments || []} />
            </div>
        </div >
    )
};
