import { useState, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { ModalContext } from './useModal'

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [trianglePosition, setTrianglePosition] = useState(null); // Added state for triangle
    const modalRef = useRef(null)
    const targetRectRef = useRef(null)
    const isFromDynamicItemRef = useRef(false); // Added ref to track if modal is from DynamicItem

    const handleModalClick = (e) => e.stopPropagation()

    useLayoutEffect(() => {
        if (!isModalOpen || !modalRef.current) {
            if (trianglePosition !== null) setTrianglePosition(null);
            return;
        }

        const modal = modalRef.current;
        const modalRect = modal.getBoundingClientRect();
        const targetRect = targetRectRef.current;

        let newModalX, newModalY;

        if (!targetRect) {
            // Center modal if no target rect
            newModalX = window.innerWidth / 2 - (modalRect.width > 0 ? modalRect.width / 2 : 0);
            newModalY = window.innerHeight / 2 - (modalRect.height > 0 ? modalRect.height / 2 : 0);
        } else {
            // Determine initial position based on isFromDynamicItem
            if (isFromDynamicItemRef.current) {
                // Center modal horizontally relative to the target, and position below it
                newModalX = targetRect.left + (targetRect.width / 2) - (modalRect.width > 0 ? modalRect.width / 2 : 0);
                newModalY = targetRect.bottom;
            } else {
                // Default: position directly below and aligned to the left of the target
                newModalX = targetRect.left;
                newModalY = targetRect.bottom;
            }

            // Adjust for right overflow
            if (newModalX + modalRect.width > window.innerWidth) {
                newModalX = window.innerWidth - modalRect.width - 16; // 16px padding from edge
            }
            
            // Adjust for left overflow
            if (newModalX < 0) {
                newModalX = 16;
            }

            // Adjust for bottom overflow
            if (newModalY + modalRect.height > window.innerHeight) {
                newModalY = targetRect.top - modalRect.height;
                
                if (newModalY < 0) {
                    newModalY = 16;
                }
            }
        }

        // Check if modal position actually needs to change to avoid potential loops
        if (position.x !== newModalX || position.y !== newModalY) {
            setPosition({ x: newModalX, y: newModalY });
        }

        // Calculate triangle position based on newModalX, newModalY and current modalRect.width
        if (isFromDynamicItemRef.current && modalRect.width > 0 && modalRect.height > 0) {
            let pointsDown = false;
            let triangleContainerActualY = newModalY; // Default: container top aligns with modal top

            // Check if modal was positioned above its default (targetRect.bottom) due to overflow
            // And also ensure targetRect exists to avoid errors
            if (targetRect && (targetRect.bottom + modalRect.height > window.innerHeight) && newModalY < targetRect.bottom) {
                pointsDown = true;
                // Position container so its bottom aligns with modal's bottom.
                // The triangle itself is 10px high, so its container should be at modal bottom.
                triangleContainerActualY = newModalY + modalRect.height -10; // Adjusted: container bottom aligns with modal bottom
            }

            const triangleContainerX = newModalX + (modalRect.width / 2) - 5; // 5 is half triangle width

            // Check if triangle position actually needs to change
            if (!trianglePosition || trianglePosition.x !== triangleContainerX || trianglePosition.y !== triangleContainerActualY || trianglePosition.pointsDown !== pointsDown) {
                setTrianglePosition({ x: triangleContainerX, y: triangleContainerActualY, pointsDown });
            }
        } else {
            if (trianglePosition !== null) {
                setTrianglePosition(null);
            }
        }
    }, [isModalOpen, modalContent, position.x, position.y, trianglePosition]); // Added missing dependencies

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
        setTrianglePosition(null); // Reset triangle position
        // setPosition({ x: 0, y: 0 }) // Resetting position is optional
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {isModalOpen && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={closeModal}>
                    {isFromDynamicItemRef.current && trianglePosition && (
                        <div
                            style={{
                                position: 'fixed',
                                left: trianglePosition.x,
                                top: trianglePosition.y,
                                width: '10px', // Container for the 10x10 triangle
                                height: '10px',// Container for the 10x10 triangle
                                zIndex: 2001, // Ensure triangle is above modal-content
                                pointerEvents: 'none', // Allow clicks to pass through the positioner
                            }}
                        >
                            <div className={`modal-triangle ${trianglePosition.pointsDown ? 'points-down' : ''}`}></div>
                        </div>
                    )}
                    <div
                        className="modal-content"
                        ref={modalRef}
                        onClick={handleModalClick}
                        style={{
                            left: position.x,
                            top: position.y
                        }}
                    >
                        {/* Triangle removed from here */}
                        {modalContent}
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}
        </ModalContext.Provider>
    )
}

