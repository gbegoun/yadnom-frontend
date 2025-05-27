import { createContext, useContext, useState } from 'react';

const RightPanelContext = createContext();

export const RightPanelProvider = ({ children }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const openPanel = () => {
        console.log('Opening right panel');
        setIsPanelOpen(true);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
    };

    return (
        <RightPanelContext.Provider value={{
            isPanelOpen,
            togglePanel,
            openPanel,
            closePanel
        }}>
            {children}
        </RightPanelContext.Provider>
    );
};

export const useRightPanel = () => {
    const context = useContext(RightPanelContext);
    if (!context) {
        throw new Error('useRightPanel must be used within a RightPanelProvider');
    }
    return context;
};