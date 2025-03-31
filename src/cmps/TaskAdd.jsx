import { useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext.jsx';

export const TaskAdd = () => {
    const { onNewGroupClicked, onNewTaskClicked } = useContext(BoardContext);

    return (
        <div>
            <button onClick={() => onNewGroupClicked("top")}>New Group</button>
            <button onClick={() => onNewTaskClicked("top")}>New Task</button>
        </div>
    );
};