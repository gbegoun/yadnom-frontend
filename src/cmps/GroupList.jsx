export const GroupList = ({ columns, groups }) => {
    return (
        <div>
            {groups.map(group => {
                return (
                    <div key={group._id}>
                        <span>{group.title} </span>
                        <div>
                            <span>Task </span>
                            {columns.map(column => <span key={column._id}>{column.title}|</span>)}
                        </div>
                        <div>
                            {group.tasks.map(task => {
                                return (
                                    <div key={task._id}>
                                        <span>{task.title}</span>
                                        {columns.map(column => {
                                            return (
                                                <span key={column._id}>{task.column_values[column._id]}|</span>
                                            )
                                        })}
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
