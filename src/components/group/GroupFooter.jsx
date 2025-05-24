import { GroupFooterSummary } from './GroupFooterSummary.jsx';
import { GroupFooterNewTask } from './GroupFooterNewTask.jsx';
import { useSelector } from 'react-redux';

export const GroupFooter = ({ groupId }) => {
    const board = useSelector(state => state.boardModule.board);
    const tasks = board.tasks.filter(task => task.groupid === groupId);
    const group = board.groups.find(group => group._id === groupId);
    
    if (!group) {
        return <div>Group not found</div>;
    }
    
    return (
        <div className="group-footer">
            <GroupFooterNewTask groupId={groupId} color={group.color} />
            <GroupFooterSummary columns={board.columns} tasks={tasks || []} />
        </div>
    )
}