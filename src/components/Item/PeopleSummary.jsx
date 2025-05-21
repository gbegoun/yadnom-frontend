export const PeopleSummary = ({ column, tasks }) => {

    const getOwners = () => {
        const uniqueValues = new Set();
        
        tasks.forEach(task => {
            const value = task.column_values?.[column._id];
            if (value && Array.isArray(value)) {
                value.forEach(person => {
                    // console.log('person', person);
                    if (person) uniqueValues.add(person);
                });
            }
        });
        return Array.from(uniqueValues).sort();
    }

    return (
        <div className="people-summary">
            <span> {getOwners().join(", ")}</span>
        </div>
    )
}