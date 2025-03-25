export const GroupList = ({ columns, group }) => {
    return (
        <div>
            <div>
                <span>Task Title </span>
                {columns.map(column => {
                    return (
                        <span key={column.id}>{column.title} </span>
                    )
                })}
            </div>

            {group.task.map(task => {
                return (
                    <div key={task.id}>
                        <span>{task.title} - </span>
                        {columns.map((column, index) => {
                            return (
                                <span key={index}>{task.column_values[column.id]} </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};