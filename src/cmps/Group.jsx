
export const Group = ({ group, columns }) => {
    
    return (
        <div className="group-container">
            <div className="group">
                <table className="group-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            {columns.map(column => (
                                <th key={column._id}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {group.tasks.map(task => (
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