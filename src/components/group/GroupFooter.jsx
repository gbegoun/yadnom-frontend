// import { useContext } from 'react';
// import { BoardContext } from '../../contexts/BoardContext.jsx';
import { GroupFooterSummary } from './GroupFooterSummary.jsx';

export const GroupFooter = ({ group, columns }) => {
    return (
        <div className="group-footer">
            <div className="group-footer-new-task-wrapper">
                <div className="group-footer-left-indicator" style={{ backgroundColor: group.color }} />
                <div className="group-footer-checkbox-wrapper">
                    <input class="group-footer-checkbox" name="" type="checkbox" aria-label="" value="" />
                </div>
                <div className="group-footer-new-item">+ Add task</div>
            </div>
                <GroupFooterSummary columns={columns} />
        </div>
    )
}



// const { onNewTaskClicked } = useContext(BoardContext);
/* <button onClick={() => onNewTaskClicked(group._id)}>+ Add task</button> */ 