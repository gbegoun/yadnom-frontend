import SVGService from '../../services/svg/svg.service';

export const StatusOptionsModal = ({ options, value, onSelect, onClose }) => {
    return (
        <>
            <ul className="status-options-list">
                {options.map(opt => (
                    <li key={opt._id}>
                        <button
                            className={`status-option-btn${opt._id === value ? ' selected' : ''}`}
                            style={{ backgroundColor: opt.color, color: '#fff' }}
                            onClick={() => { onSelect(opt._id); onClose(); }}
                        >
                            {opt.label}
                        </button>
                    </li>
                ))}
            </ul>
            <hr className="status-options-divider" />
            <div className="edit-labels-row">
                {<SVGService.RenameIcon className="edit-labels-icon" />}
                <span className="edit-labels-text">Edit Labels</span>
            </div>
        </>
    );
};
