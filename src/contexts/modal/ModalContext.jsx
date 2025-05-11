import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './useModal';

// Modal Provider component
export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const openModal = (content, mousePosition) => {
        setModalContent(content);
        setPosition(mousePosition || { x: window.innerWidth / 2, y: window.innerHeight / 2 });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {isModalOpen &&
                ReactDOM.createPortal(
                    <div className="modal-overlay" onClick={closeModal}>
                        <div 
                            className="modal-content" 
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'fixed',
                                left: `${position.x}px`,
                                top: `${position.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <button className="modal-close-btn" onClick={closeModal}>
                                ×
                            </button>
                            {modalContent}
                        </div>
                    </div>,
                    document.getElementById('modal-root')
                )}
        </ModalContext.Provider>
    );
};

