import SVGService from '../../services/svg/svg.service';

export const StatusOptionsModal = ({ options, onSelect, onClose }) => {
    
    const handleOptionClick = (optionId) => {
        onSelect(optionId)
        onClose()
    };

    return (
        <>
            <ul className="status-options-list">
                {options.map(option => (
                    <li key={option._id}>
                        <button
                            className="status-option-btn"
                            style={{ backgroundColor: option.color, color: '#fff' }}
                            onClick={() => handleOptionClick(option._id)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
            <hr className="status-options-divider" />
            <div className="edit-labels-row">
                <SVGService.RenameIcon className="edit-labels-icon" />
                <span className="edit-labels-text">Edit Labels</span>
            </div>
        </>
    );
};
