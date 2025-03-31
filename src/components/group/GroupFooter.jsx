import { BoardContext } from '../../contexts/BoardContext.jsx';
import { useContext } from 'react';

export const GroupFooter = ({group}) => {
    const { onNewTaskClicked } = useContext(BoardContext);
    return (
        <div>
            <button onClick={() => onNewTaskClicked(group._id)}>New Task</button>
        </div>
    );
};