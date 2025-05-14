import { TaskPreview } from './TaskPreview.jsx';

export const TaskList = ({ group, columns }) => {
    return (
        <div className="task-list">
            {group.tasks && group.tasks.map(task => (
                <TaskPreview 
                    key={task._id} 
                    task={task} 
                    columns={columns} 
                    color={group.color}
                    groupId={group._id}
                />
            ))}
        </div>
    )
}