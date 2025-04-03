// import { useContext } from 'react';
// import { BoardContext } from '../../contexts/BoardContext.jsx';
import { GroupFooterSummary } from './GroupFooterSummary.jsx';
import { GroupFooterNewTask } from './GroupFooterNewTask.jsx';

export const GroupFooter = ({ group, columns }) => {
    return (
        <div className="group-footer">
            <GroupFooterNewTask color={group.color} />
            <GroupFooterSummary columns={columns} />
        </div>
    )
}



// const { onNewTaskClicked } = useContext(BoardContext);
/* <button onClick={() => onNewTaskClicked(group._id)}>+ Add task</button> */ 