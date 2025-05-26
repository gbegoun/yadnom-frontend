import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../../contexts/modal/useModal.jsx';
import { useModalPosition } from '../../../hooks/useModalPosition.js';
import { updateTaskColumnValue } from '../../../store/actions/board.actions.js';
import DateOptionsModal from '../../modal_types/DateOptionsModal.jsx';
import SVGService from '../../../services/svg/svg.service.js';
import * as calendarService from '../../../services/calendar.service.js';

export const DateCol = ({ column, value, taskId, groupId }) => {
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();
    const board = useSelector(state => state.boardModule.board);
    const task = board?.tasks?.find(t => t._id === taskId);
    const isTaskDone = task?.column_values?.status_column === 'done';
    
    // Get task date status (completed on time, completed late, overdue)
    const { isCompletedOnTime, isCompletedLate, isOverdue } = calendarService.getTaskDateStatus(value, isTaskDone);
    
    const dateRef = useRef();

    const handleDateUpdate = (selectedValue) => {
        if (taskId && groupId && board) {
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
            />, {
                targetRect: modifiedRect,
                isFromDynamicItem: true,
            }
        );
    };

    // Format date for display - "Jan 22" format
    const display = calendarService.formatDateForDisplay(value);

    const handleDeleteDate = (e) => {
        e.stopPropagation();
        handleDateUpdate(null);
    };

    return (
        <div
            ref={dateRef}
            className={`date-item ${!value ? 'date-item-empty' : ''}`}
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={handleOpenModal}
        >
            {value ? (
                <>
                    {/* Status icons with tooltips */}
                    {isCompletedOnTime && (
                        <span className="completed-on-time-icon" title="Done on time">
                            <SVGService.VIcon />
                        </span>
                    )}
                    
                    {isCompletedLate && (
                        <span className="completed-late-icon" title="Done after due date">
                            <SVGService.ColumnInfoIcon />
                        </span>
                    )}
                    
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
            ) : (
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