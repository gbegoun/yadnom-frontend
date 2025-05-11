import { useModal } from '../../contexts/modal/useModal';

export const OptionsModal = () => {
    const { closeModal } = useModal();

    const handleApply = () => {
        alert('Options applied!');
        closeModal();
    };

    return (
        <div>
            <h2>Options</h2>
            <p>Additional settings and options can go here.</p>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};
