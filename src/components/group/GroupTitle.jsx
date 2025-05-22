import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks/useClickOutside';
import { updateGroupDirectProperty } from '../../store/actions/board.actions';

export const GroupTitle = ({ group, color }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);
    const board = useSelector(state => state.boardModule.board);
    
    const handleSpanClick = () => {
        setInputValue(group.title); // Set input value only when entering edit mode
        setIsEditing(true);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    };
    
    useClickOutside(inputWrapperRef, () => {
        if (isEditing) setIsEditing(false);
    });

    const saveTitle = (newTitle) => {
        if (newTitle !== group.title && newTitle.trim() && board) {
            // Use the centralized action to update the group title
            updateGroupDirectProperty(board, group._id, 'title', newTitle)
                .then(() => {
                    console.log('Group title updated successfully');
                })
                .catch(err => {
                    console.error("Error updating group title:", err);
                });
        }
    };
    
    const handleInputBlur = () => {
        setIsEditing(false);
        saveTitle(inputValue);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            saveTitle(inputValue);
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    return (
        <div className="group-title">
            {isEditing ? (
                <div ref={inputWrapperRef} style={{ width: '100%' }}>
                    <input
                        ref={inputRef}
                        className="group-title-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
            ) : (
                <div 
                    className="group-title-text" 
                    onClick={handleSpanClick}
                >
                    {group.title}
                </div>
            )}
        </div>
    );
};