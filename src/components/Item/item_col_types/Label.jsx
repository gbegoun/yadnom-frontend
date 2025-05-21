import { useRef} from 'react'
import { useModal } from '../../../contexts/modal/useModal.jsx'
import { LabelOptionsModal } from '../../modal_types/LabelOptionsModal.jsx'
import { BoardContext } from '../../../contexts/board/BoardContext.jsx'
import { updateTaskColumnValue } from '../../../store/actions/board.actions.js'
import { useModalPosition } from '../../../hooks/useModalPosition.js'
import { useSelector } from 'react-redux'

export const Label = ({ column, value, taskId, groupId }) => {
    
    const board = useSelector(state => state.boardModule.board);

    // Find the selected option based on value
    const selectedOption = column.settings.options.find(option => option._id === value)
    const color = selectedOption?.color || '#000'
    const label = selectedOption?.label || 'Label'
    const { openModal, closeModal } = useModal();
    const labelRef = useRef();
    const { centerBottomPosition } = useModalPosition();



    const handleLabelUpdate = (selectedValue) => {
        if (taskId && groupId && board) {
            // With optimistic updates, UI will update immediately
            updateTaskColumnValue(board, groupId, taskId, column._id, selectedValue)
                .catch(err => console.error('Failed to update task', err));
        }
        closeModal();
    }

    const handleOpenModal = (e) => {
        e.stopPropagation()
        const rect = labelRef.current.getBoundingClientRect()
        const modifiedRect = centerBottomPosition(rect)

        openModal(
            <LabelOptionsModal
                options={column.settings.options}
                value={value}
                onSelect={handleLabelUpdate}
                onClose={closeModal}
            />,
            modifiedRect,
            true // isFromDynamicItem
        )
    }

    return (
        <div
            ref={labelRef}
            className="label-item"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            onClick={handleOpenModal}
        >
            <span>{label}</span>
        </div>
    )
}