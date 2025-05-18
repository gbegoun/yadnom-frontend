import { useState, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { ModalContext } from './useModal'

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const modalRef = useRef(null)
    const targetRectRef = useRef(null)

    // Handler to stop modal click from closing
    const handleModalClick = (e) => e.stopPropagation()

    useLayoutEffect(() => {
        if (!isModalOpen || !modalRef.current) return

        const modal = modalRef.current
        const modalRect = modal.getBoundingClientRect()
        const targetRect = targetRectRef.current

        if (!targetRect) {
            // Center modal if no target rect
            setPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            })
            return
        }

        let x = targetRect.left
        let y = targetRect.bottom

        // Adjust for right overflow
        if (x + modalRect.width > window.innerWidth) {
            x = window.innerWidth - modalRect.width - 16
        }
        
        // Adjust for left overflow
        if (x < 0) x = 16

        // Adjust for bottom overflow
        if (y + modalRect.height > window.innerHeight) {
            // Try to position above the target
            y = targetRect.top - modalRect.height
            // If still overflows at top, position at top of viewport
            if (y < 0) y = 16
        }

        setPosition({ x, y })
    }, [isModalOpen])

    const openModal = (content, targetRect) => {
        setModalContent(content)
        targetRectRef.current = targetRect
        
        // Initial position under the target element
        if (targetRect) {
            setPosition({
                x: targetRect.left,
                y: targetRect.bottom
            })
        } else {
            setPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            })
        }
        
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setModalContent(null)
        setIsModalOpen(false)
        setPosition({ x: 0, y: 0 })
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

