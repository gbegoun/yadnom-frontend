export const GroupList = ({ columns, group }) => {
    return (
        <div>
            <div>
                <span>Task Title </span>
                {columns.map(column => {
                    return (
                        <span>{column.title} </span>
                    )
                })}
            </div>

            {group.task.map(task => {
                return (
                    <div>
                        <span>{task.title} - </span>
                        {columns.map(column => {
                            return (
                                <span>{task.column_values[column.id]} </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};