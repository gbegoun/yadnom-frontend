import { useModal } from '../../contexts/modal/useModal';

export const AdvancedFilterModal = () => {
    const { closeModal } = useModal();

    const handleApply = () => {
        alert('Filters applied!');
        closeModal();
    };

    return (
        <div>
            <h2>Advanced Filters</h2>
            <label>
                <input type="checkbox" />
                Completed Tasks
            </label>
            <label>
                <input type="checkbox" />
                High Priority
            </label>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};
