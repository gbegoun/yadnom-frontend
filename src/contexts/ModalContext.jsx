import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = createContext();

// Modal Provider component
export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {isModalOpen &&
                ReactDOM.createPortal(
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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

// Custom hook to use the modal context
export const useModal = () => useContext(ModalContext);