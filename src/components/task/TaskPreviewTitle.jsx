import { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSelector } from 'react-redux'
import { updateTaskDirectProperty } from '../../store/actions/board.actions'
import SVGService from '../../services/svg/svg.service.js';
import { useRightPanel } from '../../contexts/rightPanel/RightPanelContext.jsx'


export const TaskPreviewTitle = ({ task, color, groupId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(task.title);
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);
    const board = useSelector(state => state.boardModule.board);
    const { openPanel } = useRightPanel();

    // Keep input value in sync with task.title when task changes
    useEffect(() => {
        setInputValue(task.title);
    }, [task.title]);

    useClickOutside(inputWrapperRef, () => {
        if (isEditing) setIsEditing(false);
        saveTitle(inputValue);
    });

    const handleSpanClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    };

    const saveTitle = (newTitle) => {
        if (newTitle !== task.title && board && groupId) {

            // Use the centralized action to update the task title
            // The UI will update immediately due to the optimistic update pattern
            updateTaskDirectProperty(board, groupId, task._id, 'title', newTitle)
                .then(() => {
                    console.log('Task title updated successfully');
                })
                .catch(err => {
                    console.error("Error updating task title:", err);
                    // No need to manually reset - the optimistic update system will handle reverting
                    // the Redux state, and our component will update via the useEffect
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
        }
    };

    const onSidebarButtonClick = () => {
        openPanel({ type: 'task', taskId: task._id });
    }

    return (
        <div className="task-preview-title-wrapper">
            <div className="task-preview-menu" >
                <SVGService.OptionsIcon className='task-preview-menu-icon' />
            </div>
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
            <div className="task-title-sidebar-button" onClick={() => onSidebarButtonClick()}>
                {task.comments && task.comments.length > 0 ? (
                    <div className='has-comments-icon-wrapper'>
                        <SVGService.BoardDiscussionIcon className='has-comments-icon' />
                        <div className="comment-count-circle">
                            <span className='comments-count'>{task.comments.length}</span>
                        </div>
                    </div>
                ) : <SVGService.AddCommentIcon className='add-comment-icon' />}

            </div>
        </div>
    )
}
