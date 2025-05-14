import { useRef } from 'react'
import { useModal } from '../../contexts/modal/useModal'
import { StatusOptionsModal } from '../modal_types/StatusOptionsModal.jsx'

export const Label = ({column, value, onChange}) => {
    const color = column.settings.options.find(label => label._id === value)?.color || '#000'
    const label = column.settings.options.find(label => label._id === value)?.label || 'Label'

    const { openModal, closeModal } = useModal()
    const labelRef = useRef()

    const handleOpenModal = (e) => {
        e.stopPropagation()
        const rect = labelRef.current.getBoundingClientRect()
        openModal(
            <StatusOptionsModal
                options={column.settings.options}
                value={value}
                onSelect={onChange || (() => {})}
                onClose={closeModal}
            />,
            { x:  rect.left - 30 , y: rect.bottom + 8 }
        )
    }

    return (
        <div ref={labelRef} className="label-item" style={{backgroundColor: color, cursor: 'pointer'}} onClick={handleOpenModal}>
            <span>{label}</span>
        </div>
    )
}