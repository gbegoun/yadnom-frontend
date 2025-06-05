import { Dropdown } from "../Item/item_col_types/Dropdown";

export const DropdownSummary = ({ column, tasks }) => {
    // console.log(tasks)
    const getFirstLabelId = () => {
        return tasks[0].column_values[column._id]
    }

    const countDistinctValues = () => {
        const uniqueValues = new Set();
        tasks.forEach(task => {
            const value = task.column_values[column._id];
            if (value) uniqueValues.add(value);
        });
        if (uniqueValues.size === 0) return 0; // No distinct values found
        return uniqueValues.size-1; //-1 because first label is presented
    }

    const distinctValuesCount = countDistinctValues();
    
    if(!tasks || tasks.length === 0 || distinctValuesCount === 0)
    {
        return <div className="dropdown-summary"></div>
    }
    
    return (
        <div className="dropdown-summary">
            <Dropdown className="first-label" column={column} value={getFirstLabelId()}/> 
            <div className="label-count"> +{distinctValuesCount}</div>
        </div>
    )
}