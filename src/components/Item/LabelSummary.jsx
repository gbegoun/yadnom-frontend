export const LabelSummary = ({ column, tasks }) => {
    const getTaskGroups = () => {
        const taskCounts = tasks.reduce((acc, task) => {
            acc[task.column_values[column._id]] = (acc[task.column_values[column._id]] || 0) + 1
            return acc
        }, {})
        const taskCount = tasks.length
        const taskGroups = Object.entries(taskCounts).map(([key, value]) => {
            return <div className="group" key={key} style={{
                background: column.settings.options.find(label => label._id === key)?.color,
                width: `${(value / taskCount) * 100}%`,
            }}
            ></div>
        })
        return taskGroups
    }
    getTaskGroups()
    return (
        <div className="label-summary">
            {getTaskGroups()}
        </div>
    )
}