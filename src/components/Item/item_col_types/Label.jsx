import { useRef, useEffect } from 'react'
import { useModal } from '../../../contexts/modal/useModal.jsx'
import { LabelOptionsModal } from '../../modal_types/LabelOptionsModal.jsx'
import { updateTaskColumnValue } from '../../../store/actions/board.actions.js'
import { useSelector } from 'react-redux'
import { useConfetti } from '../../../hooks/useConfetti.js'
import { useModalPosition } from '../../../hooks/useModalPosition.js'

export const Label = ({ column, value, taskId, groupId }) => {
    // Core refs and state
    const board = useSelector(state => state.boardModule.board);
    const labelRef = useRef();
    const confettiRef = useRef();
    const { openModal, closeModal } = useModal();
    const { centerBottomPosition } = useModalPosition();

    // Create a unique ID for this label's confetti canvas
    const canvasId = `confetti-canvas-${taskId}-${column._id}`;

    // Initialize confetti hook
    const { triggerConfetti, resetConfetti } = useConfetti({
        elementId: canvasId,
        containerRef: labelRef,
        canvasRef: confettiRef
    });

    // Find the selected option based on value
    const selectedOption = column.settings.options.find(option => option._id === value);
    const color = selectedOption?.color || '#000';
    const label = selectedOption?.label || 'Label';

    // Detect if current option is "done" (for confetti effect)
    const isDoneOption = (optionValue) => {
        const doneOption = column.settings.options.find(opt =>
            opt.label.toLowerCase().includes('done')
        );
        return doneOption && optionValue === doneOption._id;
    };

    // Reset confetti state when changed from "done" to something else
    useEffect(() => {
        if (!isDoneOption(value)) {
            resetConfetti();
        }
    }, [value, resetConfetti]);

    // Handle label selection from dropdown
    const handleLabelUpdate = (selectedValue) => {
        closeModal();

        if (taskId && groupId && board) {
            updateTaskColumnValue(board, groupId, taskId, column._id, selectedValue)
                .catch(err => console.error('Failed to update task', err));
        }

        // Show confetti if selected "done"
        if (isDoneOption(selectedValue)) {
            setTimeout(() => triggerConfetti(), 50);
        }
    };

    // Open the label options modal
    const handleOpenModal = (e) => {
        e.stopPropagation();
        const rect = labelRef.current.getBoundingClientRect();
        const modifiedRect = centerBottomPosition(rect);

        openModal(
            <LabelOptionsModal
                options={column.settings.options}
                value={value}
                onSelect={handleLabelUpdate}
                onClose={closeModal}
            />, {
            targetRect: modifiedRect,
            isFromDynamicItem: true,
        }
        );
    };

    return (
        <div
            ref={labelRef}
            className="label-item"
            style={{ backgroundColor: color, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
            onClick={handleOpenModal}
        >
            <canvas
                id={canvasId}
                ref={confettiRef}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    pointerEvents: 'none',
                    background: 'transparent',
                    zIndex: 1,
                }}
            />
            <span style={{ position: 'relative', zIndex: 2 }}>{label}</span>
            <div className="corner-fold-wrapper">
                <div className="corner-shadow" />
                <div className="corner-fold" />
            </div>
        </div>
    );
};