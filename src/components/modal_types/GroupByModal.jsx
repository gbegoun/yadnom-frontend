import { useModal } from '../../contexts/modal/useModal';

export const GroupByModal = () => {
    const { closeModal } = useModal();

    const handleGroup = () => {
        alert('Tasks grouped!');
        closeModal();
    };

    return (
        <div>
            <h2>Group Tasks By</h2>
            <select>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
                <option value="assignee">Assignee</option>
            </select>
            <button onClick={handleGroup}>Group</button>
        </div>
    );
};
