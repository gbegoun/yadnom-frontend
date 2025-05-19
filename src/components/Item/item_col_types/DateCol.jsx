import { useRef, useContext } from 'react';
import { useModal } from '../../../contexts/modal/useModal.jsx';
import { BoardContext } from '../../../contexts/board/BoardContext.jsx';
import { updateTaskColumnValue } from '../../../store/actions/task.actions.js';

// Simple modal for picking a date
const DateOptionsModal = ({ value, onSelect, onClose, includeTime }) => {
    const handleChange = (e) => {
        onSelect(e.target.value);
        onClose();
    };
    return (
        <div>
            <input
                type={includeTime ? 'datetime-local' : 'date'}
                value={value ? value.substring(0, includeTime ? 16 : 10) : ''}
                onChange={handleChange}
                style={{ fontSize: 16, padding: 4 }}
                autoFocus
            />
        </div>
    );
};

export const DateCol = ({ column, value, taskId, groupId }) => {
    const { openModal, closeModal } = useModal();
    const { board, loadBoard } = useContext(BoardContext);
    const dateRef = useRef();
    const includeTime = column?.settings?.include_time;

    const handleDateUpdate = (selectedValue) => {
        if (taskId && groupId && board) {
            updateTaskColumnValue(board, groupId, taskId, column._id, selectedValue)
                .then(() => loadBoard && loadBoard())
                .catch(err => console.error('Failed to update due date', err));
        }
        closeModal();
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        const rect = dateRef.current.getBoundingClientRect();
        openModal(
            <DateOptionsModal
                value={value}
                onSelect={handleDateUpdate}
                onClose={closeModal}
                includeTime={includeTime}
            />, rect
        );
    };

    // Format date for display
    let display = value;
    if (value) {
        const d = new Date(value);
        display = includeTime
            ? d.toLocaleString()
            : d.toLocaleDateString();
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