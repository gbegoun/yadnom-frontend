import { useRef, useContext } from 'react';
import { useModal } from '../../../contexts/modal/useModal.jsx';
import { useModalPosition } from '../../../hooks/useModalPosition.js';
import { BoardContext } from '../../../contexts/board/BoardContext.jsx';
import { updateTaskColumnValue } from '../../../store/actions/board.actions.js';
import DateOptionsModal from '../../modal_types/DateOptionsModal.jsx';

export const DateCol = ({ column, value, taskId, groupId }) => {
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();    const { board } = useContext(BoardContext);
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

    // Format date for display
    let display = value;
    if (value) {
        const d = new Date(value);
        display = d.toLocaleDateString();
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