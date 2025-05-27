import { useRightPanel } from '../contexts/rightPanel/RightPanelContext.jsx';
import SVGService from '../services/svg/svg.service.js';

export const RightSidePanel = () => {
    const { isPanelOpen, closePanel } = useRightPanel();

    return (
        <div className={`right-side-panel ${isPanelOpen ? 'open' : ''}`}>
            <div className="close-button" onClick={() => closePanel()}><SVGService.XIcon className='close-icon'/></div>
            {/* Panel content */}
        </div>
    );
};