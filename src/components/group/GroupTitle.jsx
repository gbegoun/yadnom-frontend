import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks/useClickOutside';
import { updateGroupDirectProperty } from '../../store/actions/board.actions';
import { useModal } from '../../contexts/modal/useModal';
import { ColorOptionsModal } from '../modal_types/ColorOptionsModal';
import { useModalPosition } from '../../hooks/useModalPosition';

export const GroupTitle = ({ group }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);
    const board = useSelector(state => state.boardModule.board);
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();
    const colorPickerButtonRef = useRef(null);

    const handleSpanClick = () => {
        setInputValue(group.title);
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

    const handleColorSelect = (selectedColor) => {
        if (board && group) {
            updateGroupDirectProperty(board, group._id, 'color', selectedColor)
                .then(() => {
                    console.log('Group color updated successfully');
                })
                .catch(err => {
                    console.error("Error updating group color:", err);
                });
        }
        closeModal();
    };

    const openColorPickerModal = (e) => {
        e.stopPropagation();
        if (!colorPickerButtonRef.current) return;
        const rect = colorPickerButtonRef.current.getBoundingClientRect();
        const modifiedRect = centerBottomPosition(rect);

        openModal(
            <ColorOptionsModal
                currentColor={group.color}
                onSelectColor={handleColorSelect}
            />,
            modifiedRect,
            false // is not from dynamic item - it's from the group title
        );
    };

    return (
        <div className="group-title">
            {isEditing ? (
                <div ref={inputWrapperRef} className="group-title-edit-wrapper" style={{ width: '100%' }}>
                    <div className="group-title-input-container">
                        <input
                            ref={inputRef}
                            className="group-title-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleInputKeyDown}
                        />
                        <button
                            ref={colorPickerButtonRef}
                            className="color-picker-btn"
                            onClick={openColorPickerModal}
                            style={{ backgroundColor: group.color || 'transparent' }}
                        >
                        </button>
                    </div>
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