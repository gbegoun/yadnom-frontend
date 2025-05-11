import { useModal } from '../../contexts/modal/useModal';

export const PersonFilterModal = () => {
    const { closeModal } = useModal();

    const handleApply = () => {
        alert('Person filter applied!');
        closeModal();
    };

    return (
        <div>
            <h2>Filter by Person</h2>
            <select>
                <option value="person1">Person 1</option>
                <option value="person2">Person 2</option>
                <option value="person3">Person 3</option>
            </select>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};
