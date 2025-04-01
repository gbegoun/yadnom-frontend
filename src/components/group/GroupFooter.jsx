import { useContext } from 'react';
import { BoardContext } from '../../contexts/BoardContext.jsx';

export const GroupFooter = ({group}) => {
    const { onNewTaskClicked } = useContext(BoardContext);
    return (
        <div>
            <button onClick={() => onNewTaskClicked(group._id)}>+ Add task</button>
        </div>
    );
};