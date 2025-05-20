export const PeopleOptionsModal = ({ people, onClose, onSelect }) => {
    return (
        <>
            <ul className="people-options-list">
                {people.map(person => (
                    <li key={person._id}>
                        <button
                            className="people-option-btn"
                            onClick={() => onSelect(person)}
                        >
                            {person.name}
                        </button>
                    </li>
                ))}
            </ul>
            <hr className="people-options-divider" />
            <button onClick={onClose}>Close</button>
        </>
    )
}