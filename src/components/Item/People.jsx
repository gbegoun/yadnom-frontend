export const People = ({ column, value }) => {

    const label = value.join(', ');


    return (
        <div className="poeple-item">
            <span>{label}</span>
        </div>
    )
}