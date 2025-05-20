import { useRef, useContext } from 'react';
import { useModal } from '../../../contexts/modal/useModal.jsx';
import { useModalPosition } from '../../../hooks/useModalPosition.js';
import { BoardContext } from '../../../contexts/board/BoardContext.jsx';
import { updateTaskColumnValue } from '../../../store/actions/task.actions.js';
import DateOptionsModal from '../../modal_types/DateOptionsModal.jsx';

export const DateCol = ({ column, value, taskId, groupId }) => {
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();
    const { board, loadBoard } = useContext(BoardContext);
    const dateRef = useRef();    const handleDateUpdate = (selectedValue) => {
        if (taskId && groupId && board) {
            console.log('DateCol update: Calling updateTaskColumnValue with selectedValue:', selectedValue);
            updateTaskColumnValue(board, groupId, taskId, column._id, selectedValue)
                .then(() => {
                    console.log('DateCol update: Task updated, now loading board with ID:', board._id);
                    if (loadBoard) loadBoard(board._id);
                })
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