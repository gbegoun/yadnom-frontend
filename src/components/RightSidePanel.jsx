import { usePanel } from '../contexts/panel/PanelContext';

export const RightSidePanel = () => {
    const { isPanelOpen } = usePanel();

    return (
        <div className={`right-side-panel ${isPanelOpen ? 'open' : ''}`}>
            {/* Panel content */}
        </div>
    );
};