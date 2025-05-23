import { DynamicSummary } from '../item/DynamicSummary';
import { useSelector } from 'react-redux';


export const GroupHeaderCollapsed = ({ groupId, setIsCollapsed }) => {
    const board = useSelector(state => state.boardModule.board);
    const group = board?.groups?.find(group => group._id === groupId);
    const tasks = board?.tasks?.filter(task => task.groupid === groupId);
    console.log('tasks', tasks);
    const columns = board?.columns

    return (
        <div className="group-header-collapsed">
            <div className="group-header-collapsed-title-row" style={{ color: group.color }}>
                <div className="group-header-collapsed-menu" />
                <div className="group-header-collapsed-left-indicator" style={{ backgroundColor: group.color }} />
                <div className="collapse-group-icon-wrapper-collapsed" onClick={() => setIsCollapsed(false)}>
                    <svg className="collapse-group-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.5303 12.5303L10 13.0607L9.46967 12.5303L5.46967 8.53033C5.17678 8.23744 5.17678 7.76256 5.46967 7.46967C5.76256 7.17678 6.23744 7.17678 6.53033 7.46967L10 10.9393L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L10.5303 12.5303Z" />
                    </svg>
                </div>
                <div className="group-header-collapsed-blank" />
                <div className="group-header-title-text group-header-collapsed-title-text">{group.title}</div>
                <div className="group-header-summary-text group-header-collapsed-summary-text">5 items</div>
            </div>

            <div className="group-columns-collapsed-wrapper">
                {columns.map((column) => {
                    return (
                        <div className="group-column-collapsed" key={column._id} style={{ width: column.width }}>
                            <div className="group-column-collapsed-title">{column.title}</div>
                            <div className="group-column-collapsed-summary">
                                <DynamicSummary column={column} tasks={tasks} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="group-column-collapsed-last-cell" />
        </div>

    )
}