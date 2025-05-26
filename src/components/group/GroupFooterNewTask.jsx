import React, { useState, useRef, useContext } from 'react';
import { BoardContext } from '../../contexts/board/BoardContext.jsx';

export const GroupFooterNewTask = ({ color, groupId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);
    const { onNewTaskClicked } = useContext(BoardContext);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        if (inputValue.trim()) {
            onNewTaskClicked(groupId, inputValue);
            setInputValue('');
        }
    };

    const handleSpanClick = () => {
        setIsEditing(true);

        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    }

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            if (inputValue && inputValue.trim()) {
                onNewTaskClicked(groupId, inputValue); // Use the right function
                setInputValue('');
            }
        }
    };

    return (
        <div className="group-footer-new-task-row">
            <div className="group-footer-new-task-wrapper">
                <div className="group-footer-new-task-menu" />
                <div className="group-footer-left-indicator" style={{ backgroundColor: color }} />
                <div className="group-footer-checkbox-wrapper">
                    <input className="group-footer-checkbox" name="" type="checkbox" aria-label="" value="" />
                </div>
                <div className="group-footer-new-task">
                    {isEditing ? (
                        <span ref={inputWrapperRef} style={{ display: 'inline-block', width: '100%' }}>
                            <input
                                ref={inputRef}
                                className="new-task-title-input"
                                value={inputValue}
                                placeholder="+ Add item"
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onKeyDown={handleInputKeyDown}
                            />
                        </span>
                    ) : (
                        <span onClick={handleSpanClick}>+ Add task</span>
                    )}

                </div>
            </div>
            <div className="group-footer-new-task-blank" />
        </div>
    )
}