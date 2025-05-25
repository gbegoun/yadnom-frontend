import { useState } from 'react';
import { useModal } from '../../contexts/modal/useModal';

export const BoardNameModal = ({ board, onSave }) => {
    const [boardName, setBoardName] = useState(board?.name || '');
    const { closeModal } = useModal();

    const handleSave = () => {
        if (boardName.trim() && boardName !== board?.name) {
            onSave(boardName.trim());
        }
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div className="board-name-modal">
            <div className="modal-header">
                <h3>Edit board name</h3>
            </div>
            <div className="modal-body">
                <input
                    type="text"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter board name"
                    autoFocus
                    className="board-name-input"
                />
            </div>
            <div className="modal-footer">
                <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </button>
                <button 
                    className="save-btn" 
                    onClick={handleSave}
                    disabled={!boardName.trim()}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
