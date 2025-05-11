import { createContext, useContext } from 'react';

/**
 * @typedef {Object} ModalContextType
 * @property {(content: React.ReactNode, position?: { x: number, y: number }) => void} openModal
 * @property {() => void} closeModal
 */

/** @type {React.Context<ModalContextType>} */
export const ModalContext = createContext();

/**
 * Custom hook to use the modal context
 * @returns {ModalContextType} The modal context value
 */
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

