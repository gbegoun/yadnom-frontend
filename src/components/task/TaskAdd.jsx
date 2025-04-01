import { useContext } from 'react';
import { BoardContext } from '../../contexts/BoardContext.jsx';

export const TaskAdd = () => {
    const { onNewGroupClicked, onNewTaskClicked } = useContext(BoardContext);

    return (
        <div className='task-add-container'>
            <button onClick={() => onNewGroupClicked("top")}>New Group</button>
            <button onClick={() => onNewTaskClicked()}>New Task</button>
        </div>
    );
};