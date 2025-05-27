import { createContext, useContext, useState } from 'react';

const RightPanelContext = createContext();

export const RightPanelProvider = ({ children }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelData, setPanelData] = useState(null);

    const openPanel = (data = null) => {
        setPanelData(data);
        setIsPanelOpen(true);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
    };

    const togglePanel = (data = null) => {
        if (isPanelOpen) {
            closePanel();
        } else {
            openPanel(data);
        }
    };

    return (
        <RightPanelContext.Provider value={{
            isPanelOpen,
            panelData,
            openPanel,
            closePanel,
            togglePanel
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