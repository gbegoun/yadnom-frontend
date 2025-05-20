import { useState, useRef, useEffect, useContext } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSelector } from 'react-redux'
import { BoardContext } from '../../contexts/board/BoardContext.jsx'
import { boardService } from '../../services/board'

export const TaskPreviewTitle = ({ task, color, groupId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(task.title);
    const inputRef = useRef(null);
    const inputWrapperRef = useRef(null);
    const board = useSelector(state => state.boardModule.board);
    const { loadBoard } = useContext(BoardContext);
    
    // Keep input value in sync with task.title when task changes
    useEffect(() => {
        setInputValue(task.title);
    }, [task.title]);

    useClickOutside(inputWrapperRef, () => {
        if (isEditing) setIsEditing(false);
    });

    const handleSpanClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    };    const saveTitle = async (newTitle) => {
        try {
            if (newTitle !== task.title && board && groupId) {
                console.log('Saving task title:', { taskId: task._id, groupId, newTitle });
                
                // Create a new board with the updated task title
                const updatedBoard = JSON.parse(JSON.stringify(board));
                
                // Find the task in the board's tasks array
                const taskIndex = updatedBoard.tasks.findIndex(t => t._id === task._id);
                
                if (taskIndex !== -1) {
                    // Update the title directly
                    updatedBoard.tasks[taskIndex].title = newTitle;
                      // Save the updated board
                    console.log('Saving updated board with new task title');
                    const savedBoard = await boardService.saveBoard(updatedBoard);
                    console.log('Board saved successfully:', savedBoard._id);
                    
                    // Force a reload of the board from server to get fresh data
                    if (loadBoard) {
                        console.log('Reloading board with ID:', board._id);
                        await loadBoard(board._id);
                        console.log('Board reloaded successfully');
                    } else {
                        console.warn('loadBoard function not available in context');
                    }
                } else {
                    console.error(`Task not found in board's tasks array: ${task._id}`);
                }
            }
        } catch (err) {
            console.error("Error updating task title:", err);
            // Reset to original title on error
            setInputValue(task.title);
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