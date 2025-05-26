import SVGService from '../../services/svg/svg.service';

export const LabelOptionsModal = ({ options, onSelect, onClose }) => {

    const handleOptionClick = (optionId) => {
        onSelect(optionId)
        onClose()
    };

    return (
        <>
            <ul className="label-options-list">
                {options.map(option => (
                    <li key={option._id}>
                        <button
                            className={`label-option-btn ${option.label.trim() === "" ? "empty-label" : ""}`}
                            style={{ backgroundColor: option.color, color: '#fff' }}
                            onClick={() => handleOptionClick(option._id)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
            <hr className="label-options-divider" />
            <div className="edit-labels-row">
                <button
                    className="edit-labels-button"
                    onClick={() => {
                        // This would typically open a label editing modal
                        // For now, just close the current modal
                        onClose();
                    }}
                >
                    <SVGService.RenameIcon className="edit-labels-icon" />
                    <span className="edit-labels-text">Edit Labels</span>
                </button>
            </div>
        </>
    );
};
