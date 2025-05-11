import { useModal } from '../../contexts/modal/useModal';

export const HideColumnsModal = () => {
    const { closeModal } = useModal();

    const handleApply = () => {
        alert('Columns hidden!');
        closeModal();
    };

    return (
        <div>
            <h2>Hide Columns</h2>
            <label>
                <input type="checkbox" />
                Due Date
            </label>
            <label>
                <input type="checkbox" />
                Assignee
            </label>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};
