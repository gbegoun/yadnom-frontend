import { useRef, useContext } from 'react'
import { useModal } from '../../../contexts/modal/useModal.jsx'
import { LabelOptionsModal } from '../../modal_types/LabelOptionsModal.jsx'
import { BoardContext } from '../../../contexts/board/BoardContext.jsx'
import { updateTaskColumnValue } from '../../../store/actions/task.actions.js'
import { useModalPosition } from '../../../contexts/modal/useModalPosition.js'

export const Label = ({ column, value, taskId, groupId }) => {
    // Find the selected option based on value
    const selectedOption = column.settings.options.find(option => option._id === value)
    const color = selectedOption?.color || '#000'
    const label = selectedOption?.label || 'Label'

    const { openModal, closeModal } = useModal()
    const { board, loadBoard } = useContext(BoardContext)
    const labelRef = useRef()
    const { centerBottomPosition } = useModalPosition()

    const handleLabelUpdate = (selectedValue) => {
        if (taskId && groupId && board) {
            updateTaskColumnValue(board, groupId, taskId, column._id, selectedValue)
                .then(() => loadBoard())
                .catch(err => console.error('Failed to update task', err))
        }
        closeModal()
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
            modifiedRect
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