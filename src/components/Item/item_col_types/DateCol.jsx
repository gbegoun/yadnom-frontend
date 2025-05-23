import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../../contexts/modal/useModal.jsx';
import { useModalPosition } from '../../../hooks/useModalPosition.js';
import { updateTaskColumnValue } from '../../../store/actions/board.actions.js';
import DateOptionsModal from '../../modal_types/DateOptionsModal.jsx';

export const DateCol = ({ column, value, taskId, groupId }) => {
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();
    const board = useSelector(state => state.boardModule.board);
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
    } else {
        display = 'Set date';
    }

    return (
        <div
            ref={dateRef}
            className="date-item"
            style={{ cursor: 'pointer' }}
            onClick={handleOpenModal}
        >
            <span>{display}</span>
        </div>
    );
};