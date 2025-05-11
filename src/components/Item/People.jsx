export const People = ({ value }) => {

    const label =  value?.length ? value.join(', ') : "";


    return (
        <div className="poeple-item">
            <span>{label}</span>
        </div>
    )
}