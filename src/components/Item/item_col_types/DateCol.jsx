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
    const task = board?.tasks?.find(t => t._id === taskId);

    // Check if the task status is "done" to apply strikethrough on date
    const isTaskDone = task?.column_values?.status_column === 'done';

    // Check if task was completed on time by comparing dates without time components
    const isCompletedOnTime = (() => {
        if (!isTaskDone || !value) return false;

        // Get current date without time component
        const today = new Date();
        const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Get due date without time component
        const dueDate = new Date(value);
        const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

        // Task is completed on time if due date is >= current date
        return dueDateOnly >= currentDate;
    })();

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
    };

    return (
        <div
            ref={dateRef}
            className={`date-item ${!value ? 'date-item-empty' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={handleOpenModal}
        >
            {value ? (
                <>
                    <span className={isTaskDone ? 'date-completed' : ''}>
                        {isCompletedOnTime && (
                            <span className="completed-on-time-icon">
                                <SVGService.VIcon />
                            </span>
                        )}
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