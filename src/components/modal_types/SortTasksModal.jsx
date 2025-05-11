import { useModal } from '../../contexts/modal/useModal';

export const SortTasksModal = () => {
    const { closeModal } = useModal();

    const handleSort = () => {
        alert('Tasks sorted!');
        closeModal();
    };

    return (
        <div>
            <h2>Sort Tasks</h2>
            <select>
                <option value="date">By Date</option>
                <option value="priority">By Priority</option>
                <option value="status">By Status</option>
            </select>
            <button onClick={handleSort}>Sort</button>
        </div>
    );
};
