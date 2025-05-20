import { useState, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSelector } from 'react-redux'
import { updateTaskTitle } from '../../store/actions/task.actions'

export const TaskPreviewTitle = ({ task, color, groupId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(task.title);
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);
    const board = useSelector(state => state.boardModule.board);

    useClickOutside(inputWrapperRef, () => {
        if (isEditing) setIsEditing(false);
    });

    const handleSpanClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    };

    const saveTitle = async (newTitle) => {
        if (newTitle !== task.title && board && groupId) {
            await updateTaskTitle(board, groupId, task._id, newTitle);
        }
    };

    const handleInputBlur = async () => {
        setIsEditing(false);
        await saveTitle(inputValue);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            await saveTitle(inputValue);
        }
    };

    return (
        <div className="task-preview-title-wrapper">
            <div className="task-preview-menu" />
            <div className="task-left-indicator" style={{ backgroundColor: color }} />
            <div className="task-checkbox-wrapper">
                <input className="task-checkbox" name="" type="checkbox" aria-label="" value="" />
            </div>
            <div className="task-title">
                {isEditing ? (
                    <span ref={inputWrapperRef} style={{ display: 'inline-block', width: '80%' }}>
                        <input
                            ref={inputRef}
                            className="task-title-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleInputKeyDown}
                        />
                    </span>
                ) : (
                    <span className="task-title-inner" onClick={handleSpanClick}>{inputValue}</span>
                )}
            </div>
        </div>
    )
}

// const TaskPreviewTitleExpand = ({ task, color }) => {
    
// }

// const TaskPreviewTitleName = ({ task, color }) => {
//     return (
//         <div className="task-title">{task.title}</div>
//     )
// }

// const TaskPreviewTitleActions = ({ task, color }) => {
//     return (
//         <div className="task-actions">
//             {/* Add action buttons or icons here */}
//         </div>
//     )
// }