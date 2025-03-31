
export const TaskList = ({ group, columns }) => {
    return (
        <div className="task-list-container">
            <div className="task-list">
                <table className="task-list-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            {columns && columns.map(column => (
                                <th key={column._id}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {group.tasks && group.tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                {columns.map(column => (
                                    <td key={column._id}>{task.column_values[column._id]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};