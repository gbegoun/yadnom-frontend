import { Dropdown } from "./Dropdown"

export const DropdownSummary = ({ column, tasks }) => {
    const getFirstLabelId = () => {
        return tasks[0].column_values[column._id]
    }

    const countDistinctValues = () => {
        const uniqueValues = new Set();
        tasks.forEach(task => {
            const value = task.column_values[column._id];
            if (value) uniqueValues.add(value);
        });
        return uniqueValues.size-1; //-1 because first label is presented
    }

    const distinctValuesCount = countDistinctValues();
    return (
        <div className="dropdown-summary">
            <Dropdown className="first-label" column={column} value={getFirstLabelId()}/> 
            <div className="label-count"> +{countDistinctValues()}</div>
        </div>
    )
}