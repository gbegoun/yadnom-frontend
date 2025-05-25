import { useState } from 'react';
import { useModal } from '../../contexts/modal/useModal';

export const BoardNameModal = ({ board, onSave }) => {
    const [boardName, setBoardName] = useState(board?.name || '');
    const { closeModal } = useModal();
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (boardName.trim() && boardName !== board?.name) {
                onSave(boardName.trim());
            }
            closeModal();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    };

    const handleNameChange = (e) => {
        setBoardName(e.target.value);
    };

    const handleStar = (e) => {
        e.stopPropagation();
        // Add star functionality here 
        // This would typically toggle the board's starred status
        console.log('Star clicked');
    };
    
    // Use a fixed date for the demo or compute from board.createdAt if available
    const formattedDate = `Mar 23, 2025`; // Example date format, adjust based on your data

    return (
        <div className="board-name-modal">
            <div className="board-name-header">
                <input
                    type="text"
                    value={boardName}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter board name"
                    autoFocus
                    className="board-name-input"
                />
                <button className="star-button" onClick={handleStar}>
                    <svg viewBox="0 0 20 20" fill="none" className="star-icon">
                        <path d="M10 1L12.39 6.32L18 7.24L14 11.44L15.18 17L10 14.32L4.82 17L6 11.44L2 7.24L7.61 6.32L10 1Z" 
                              stroke="currentColor" fill="none" strokeWidth="1.5"/>
                    </svg>
                </button>
            </div>
            
            <div className="board-description">
                Manage any type of project. Assign owners, set timelines
                and keep track of where your project stands.
            </div>
            
            <div className="board-info-section">
                <h3 className="section-title">Board info</h3>
                
                <div className="info-row">
                    <div className="info-label">Board type</div>
                    <div className="info-value">
                        <span className="board-type">
                            <span className="icon">□</span>
                            Main
                        </span>
                    </div>
                </div>
                
                <div className="info-row">
                    <div className="info-label">Owner</div>
                    <div className="info-value">
                        <div className="user-avatar">
                            <span className="avatar-initials">GB</span>
                            <span className="user-name">gal begun</span>
                        </div>
                    </div>
                </div>
                
                <div className="info-row">
                    <div className="info-label">Created by</div>
                    <div className="info-value">
                        <div className="user-avatar">
                            <span className="avatar-initials">GB</span>
                            <span className="created-info">on {formattedDate}</span>
                        </div>
                    </div>
                </div>
                
                <div className="info-row">
                    <div className="info-label">Notifications</div>
                    <div className="info-value">
                        <span className="notification-setting">
                            <span className="bell-icon">🔔</span>
                            Everything
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
