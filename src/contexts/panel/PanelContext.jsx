import { createContext, useContext, useState } from 'react';

const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const openPanel = () => {
        setIsPanelOpen(true);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
    };

    return (
        <PanelContext.Provider value={{
            isPanelOpen,
            togglePanel,
            openPanel,
            closePanel
        }}>
            {children}
        </PanelContext.Provider>
    );
};

export const usePanel = () => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error('usePanel must be used within a PanelProvider');
    }
    return context;
};