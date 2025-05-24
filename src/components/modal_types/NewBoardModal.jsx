import { useState } from 'react';

export const NewBoardModal = ({ onClose, onAddNewBoard }) => {
    const [boardName, setBoardName] = useState('New Board');
    
    const handleCreateBoard = () => {
        onClose();
        if (boardName.trim()) {
            onAddNewBoard(boardName);
        }
    }

    const handleInputChange = (e) => {
        setBoardName(e.target.value);
    }

    return (
        <div className="new-board-modal">
            <div className="title">Create board</div>
            <div className="input-wrapper">
                <h2 className="name-input-label">Board name</h2>
                <input 
                    className="name-input" 
                    type="text" 
                    value={boardName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="footer">
                <button className="cancel-button" onClick={onClose}>Cancel</button>
                <button className="create-button" onClick={handleCreateBoard}>Create Board</button>
            </div>
            <div className="close-button" onClick={onClose}/>
        </div>
    );
}