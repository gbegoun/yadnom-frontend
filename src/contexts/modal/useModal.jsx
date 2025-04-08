import { createContext, useContext } from 'react';


export const ModalContext = createContext();

// Custom hook to use the modal context
export const useModal = () => useContext(ModalContext); 

