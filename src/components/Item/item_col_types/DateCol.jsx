import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../../contexts/modal/useModal.jsx';
import { useModalPosition } from '../../../hooks/useModalPosition.js';
import { updateTaskColumnValue } from '../../../store/actions/board.actions.js';
import DateOptionsModal from '../../modal_types/DateOptionsModal.jsx';
import SVGService from '../../../services/svg/svg.service.js';

export const DateCol = ({ column, value, taskId, groupId }) => {
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();
    const board = useSelector(state => state.boardModule.board);
    const task = board?.tasks?.find(t => t._id === taskId);    // Check if the task status is "done" to apply strikethrough on date
    const isTaskDone = task?.column_values?.status_column === 'done';    // Get current date without time component
    const today = new Date();
    const currentDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

    // Get due date without time component (if exists)
    let dueDateOnly = null;
    if (value) {
        const dueDate = new Date(value);
        dueDateOnly = new Date(Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()));
    }
    
    // Alternative comparison values using timestamps
    const currentTimestamp = currentDate.getTime();
    const dueDateTimestamp = dueDateOnly ? dueDateOnly.getTime() : null;

    // Calculate date statuses
    // For completed tasks: check if it's done on time or late
    // For incomplete tasks: check if it's overdue
    const isCompletedOnTime = isTaskDone && dueDateOnly && currentDate <= dueDateOnly;
    const isCompletedLate = isTaskDone && dueDateOnly && currentDate > dueDateOnly;
    const isOverdue = !isTaskDone && dueDateOnly && currentDate > dueDateOnly;

    // Debug logging for date comparison (remove in production)
    console.log('Date debugging:', {
        taskId,
        isTaskDone,
        currentDate: currentDate.toISOString(),
        dueDateOnly: dueDateOnly ? dueDateOnly.toISOString() : null,
        isCompletedOnTime,
        isCompletedLate,
        isOverdue
    });

    const dateRef = useRef();

    const handleDateUpdate = (selectedValue) => {
        if (taskId && groupId && board) {
            // With optimistic updates, UI will update immediately
            updateTaskColumnValue(board, groupId, taskId, column._id, selectedValue)
                .catch(err => console.error('Failed to update due date', err));
        }
        closeModal();
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        const rect = dateRef.current.getBoundingClientRect();
        const modifiedRect = centerBottomPosition(rect);

        openModal(
            <DateOptionsModal
                value={value}
                onSelect={handleDateUpdate}
                onClose={closeModal}
            />, modifiedRect,
            true // isFromDynamicItem
        );
    };

    // Format date for display - "Jan 22" format
    let display = value;
    if (value) {
        const d = new Date(value);
        const month = d.toLocaleString('en-US', { month: 'short' });
        const day = d.getDate();
        display = `${month} ${day}`;
    }

    const handleDeleteDate = (e) => {
        e.stopPropagation(); // Prevent opening the date modal
        handleDateUpdate(null); // Set date to null to delete it
    };    return (
        <div
            ref={dateRef}
            className={`date-item ${!value ? 'date-item-empty' : ''}`}
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={handleOpenModal}
        >
            {value ? (
                <>
                    {/* Icons outside of the date-completed span so they're visible regardless of task status */}
                    {/* Icon for tasks completed on time - before due date */}
                    {isCompletedOnTime && (
                        <span className="completed-on-time-icon" title="Done on time">
                            <SVGService.VIcon />
                        </span>
                    )}
                    
                    {/* Icon for tasks completed after due date - from first picture */}
                    {isCompletedLate && (
                        <span className="completed-late-icon" title="Done after due date">
                            <SVGService.ColumnInfoIcon />
                        </span>
                    )}
                    
                    {/* Icon for overdue tasks that aren't done - from second picture */}
                    {isOverdue && (
                        <span className="overdue-icon" title="Overdue">
                            <SVGService.ColumnInfoIcon />
                        </span>
                    )}
                    
                    <span className={isTaskDone ? 'date-completed' : ''}>                        
                        {display}
                    </span>
                    <button
                        className="date-delete-btn"
                        onClick={handleDeleteDate}
                        aria-label="Delete date"
                    >
                        <SVGService.XIcon className="date-delete-icon" />
                    </button>
                </>
            ) :(
                <div className="date-icons-container">
                    <div className="date-icon-wrapper add-icon">
                        <span>+</span>
                    </div>
                    <div className="date-icon-wrapper calendar-icon">
                        <SVGService.NewDateIcon className="calendar-svg-icon" />
                    </div>
                </div>
            )}
        </div>
    );
};