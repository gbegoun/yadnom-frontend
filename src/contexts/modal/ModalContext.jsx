import { useState, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { ModalContext } from './useModal'

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const modalRef = useRef(null)
    const targetRectRef = useRef(null)
    const isFromDynamicItemRef = useRef(false); // Added ref to track if modal is from DynamicItem

    const handleModalClick = (e) => e.stopPropagation()

    useLayoutEffect(() => {
        if (!isModalOpen || !modalRef.current) return

        const modal = modalRef.current
        const modalRect = modal.getBoundingClientRect()
        const targetRect = targetRectRef.current

        if (!targetRect) {
            // Center modal if no target rect
            const newX = window.innerWidth / 2 - (modalRect.width ? modalRect.width / 2 : 0);
            const newY = window.innerHeight / 2 - (modalRect.height ? modalRect.height / 2 : 0);
            setPosition({ x: newX, y: newY });
            return
        }

        let x, y;

        // Determine initial position based on isFromDynamicItem
        if (isFromDynamicItemRef.current) {
            // Center modal horizontally relative to the target, and position below it
            x = targetRect.left + (targetRect.width / 2) - (modalRect.width / 2);
            y = targetRect.bottom;
        } else {
            // Default: position directly below and aligned to the left of the target
            x = targetRect.left;
            y = targetRect.bottom;
        }

        // Adjust for right overflow
        if (x + modalRect.width > window.innerWidth) {
            x = window.innerWidth - modalRect.width - 16 // 16px padding from edge
        }
        
        // Adjust for left overflow
        if (x < 0) {
            x = 16
        }

        // Adjust for bottom overflow
        if (y + modalRect.height > window.innerHeight) {
            // Try to position above the target
            y = targetRect.top - modalRect.height
            // If still overflows at top, or target is too high, position at top of viewport with padding
            if (y < 0) {
                y = 16
            }
        }

        setPosition({ x, y })
    }, [isModalOpen, modalContent])

    const openModal = (content, targetRect, isFromDynamicItem = false) => {
        setModalContent(content)
        targetRectRef.current = targetRect
        isFromDynamicItemRef.current = isFromDynamicItem; // Set the ref

        // Initial position; useLayoutEffect will calculate the final one.
        if (targetRect) {
            setPosition({
                x: targetRect.left, 
                y: targetRect.bottom 
            });
        } else {
            // Fallback if no targetRect, initial position to center of screen
            setPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            });
        }
        
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setModalContent(null)
        setIsModalOpen(false)
        isFromDynamicItemRef.current = false; // Reset the ref on close
        // setPosition({ x: 0, y: 0 }) // Resetting position is optional
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {isModalOpen && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        ref={modalRef}
                        onClick={handleModalClick}
                        style={{
                            left: position.x,
                            top: position.y
                        }}
                    >
                        {modalContent}
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}
        </ModalContext.Provider>
    )
}

