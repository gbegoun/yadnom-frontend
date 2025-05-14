import { useRef, useContext } from 'react'
import { useModal } from '../../contexts/modal/useModal'
import { StatusOptionsModal } from '../modal_types/StatusOptionsModal.jsx'
import { BoardContext } from '../../contexts/board/BoardContext'
import { updateTaskColumnValue } from '../../store/actions/task.actions'

export const Label = ({ column, value, taskId, groupId }) => {
    // Find the selected option based on value
    const selectedOption = column.settings.options.find(option => option._id === value)
    const color = selectedOption?.color || '#000'
    const label = selectedOption?.label || 'Label'

    const { openModal, closeModal } = useModal()
    const { board, loadBoard } = useContext(BoardContext)
    const labelRef = useRef()

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
        openModal(
            <StatusOptionsModal
                options={column.settings.options}
                value={value}
                onSelect={handleLabelUpdate}
                onClose={closeModal}
            />,
            { x: rect.left, y: rect.bottom + 5 }
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