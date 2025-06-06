import { useState, useRef } from 'react';
import { useModal } from '../../contexts/modal/useModal';
import { useSelector } from 'react-redux';
import { updateBoard } from '../../store/actions/board.actions';
import SVGService from '../../services/svg/svg.service';
import { userService } from '../../services/user/index.js';

export const BoardNameModal = () => {
    // Redux state
    const board = useSelector(state => state.boardModule.board);
    const users = useSelector(state => state.userModule.users);
    const { closeModal } = useModal();

    // Local state
    const [boardName, setBoardName] = useState(board?.name || '');
    const [boardDescription, setBoardDescription] = useState(board?.description || '');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    
    const inputRef = useRef();    
    
    // --- Board info ---
    let ownerInfo = { initials: '??', name: 'Unknown' };
    if (board?.members?.length > 0) ownerInfo = userService.getUserDisplayInfo(board.members[0], users);
    let creatorInfo = ownerInfo;
    if (board?.created_by?.length > 0) creatorInfo = userService.getUserDisplayInfo(board.created_by[0], users);
    let formattedDate = 'Unknown';
    if (board?.created_at) {
        const date = new Date(board.created_at);
        formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // --- Board name editing ---
    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleNameChange = (e) => setBoardName(e.target.value);
    const handleTitleBlur = async () => {
        setIsEditingTitle(false);
        if (boardName.trim() && boardName.trim() !== board?.name) {
            try {
                await updateBoard({ ...board, name: boardName.trim() });
            } catch (err) {/* Optionally handle error */ }
        }
    };

    const handleTitleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditingTitle(false);
            if (boardName.trim() && boardName.trim() !== board?.name) {
                try {
                    await updateBoard({ ...board, name: boardName.trim() });
                } catch (err) {/* Optionally handle error */ }
            }
        } else if (e.key === 'Escape') {
            setIsEditingTitle(false);
            setBoardName(board?.name || '');
        }
    };

    // --- Board description editing ---
    const handleDescriptionChange = (e) => setBoardDescription(e.target.value);
    const handleDescriptionClick = () => setIsEditingDescription(true);
    const handleDescriptionBlur = async () => {
        setIsEditingDescription(false);
        if (boardDescription.trim() !== board?.description) {
            try {
                await updateBoard({ ...board, description: boardDescription.trim() });
            } catch (err) {/* Optionally handle error */ }
        }
    };
    const handleDescriptionKeyPress = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setIsEditingDescription(false);
            if (boardDescription.trim() !== board?.description) {
                try {
                    await updateBoard({ ...board, description: boardDescription.trim() });
                } catch (err) {/* Optionally handle error */ }
            }
        } else if (e.key === 'Escape') {
            setIsEditingDescription(false);
            setBoardDescription(board?.description || '');
        }
    };

    // --- Star button ---
    const handleStar = (e) => {
        e.stopPropagation();
        // Star functionality can be implemented here if needed
    };

    // --- Render ---
    return (
        <div className="board-name-modal" onKeyDown={e => e.key === 'Escape' && closeModal()}>
            <div className="board-name-header">
                {isEditingTitle ? (
                    <textarea
                        ref={inputRef}
                        value={boardName}
                        onChange={handleNameChange}
                        onKeyDown={handleTitleKeyPress}
                        onBlur={handleTitleBlur}
                        placeholder="Enter board name"
                        autoFocus
                        className="board-name-input"
                        rows={1}
                        style={{ resize: 'none', height: '30px' }}
                    />
                ) : (
                    <span
                        className="board-name-text"
                        onClick={handleTitleClick}
                    >
                        {boardName || 'Untitled Board'}
                    </span>
                )}
                <button className="star-button" onClick={handleStar}>
                    <SVGService.StarFavorite className="star-icon" />
                </button>
            </div>
            <div className="board-description">
                {isEditingDescription ? (
                    <textarea
                        value={boardDescription}
                        onChange={handleDescriptionChange}
                        onKeyDown={handleDescriptionKeyPress}
                        onBlur={handleDescriptionBlur}
                        placeholder="Manage any type of project. Assign owners, set timelines and keep track of where your project stands."
                        className="board-description-input"
                        autoFocus
                        rows="3"
                    />
                ) : (
                    <div
                        className="board-description-text"
                        onClick={handleDescriptionClick}
                    >
                        {boardDescription || 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.'}
                    </div>
                )}
            </div>
            <div className="board-info-section">
                <h3 className="section-title">Board info</h3>
                <div className="info-row">
                    <div className="info-label">Owner</div>
                    <div className="info-value">
                        <div className="user-avatar">
                            {ownerInfo.imgUrl ? (
                                <img
                                    src={ownerInfo.imgUrl}
                                    alt={ownerInfo.name}
                                    className="avatar-image"
                                    onError={e => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <span
                                className="avatar-initials"
                                style={{ display: ownerInfo.imgUrl ? 'none' : 'flex' }}
                            >
                                {ownerInfo.initials}
                            </span>
                            <span className="user-name">{ownerInfo.name}</span>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info-label">Created by</div>
                    <div className="info-value">
                        <div className="user-avatar">
                            {creatorInfo.imgUrl ? (
                                <img
                                    src={creatorInfo.imgUrl}
                                    alt={creatorInfo.name}
                                    className="avatar-image"
                                    onError={e => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <span
                                className="avatar-initials"
                                style={{ display: creatorInfo.imgUrl ? 'none' : 'flex' }}
                            >
                                {creatorInfo.initials}
                            </span>
                            <span className="created-info">on {formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
