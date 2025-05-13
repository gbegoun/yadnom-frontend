import { useContext } from 'react';
import { BoardContext } from '../../contexts/board/BoardContext.jsx';
import SVGService from '../../services/svg/svg.service.js';

export const TaskAdd = () => {
    const { onNewGroupClicked, onNewTaskClicked } = useContext(BoardContext);

    return (
        <div className='task-add-container'>
            <button onClick={() => onNewTaskClicked()}>New Task</button>
            <button onClick={() => onNewGroupClicked("top")}><SVGService.CollapseGroupIcon className='task-add-container'/></button>
        </div>
    );
};