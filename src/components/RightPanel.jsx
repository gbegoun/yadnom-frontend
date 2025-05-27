import { useEffect, useState } from 'react';
import { useRightPanel } from '../contexts/rightPanel/RightPanelContext.jsx';
import SVGService from '../services/svg/svg.service.js';
import { TaskDetails } from './task/TaskDetails.jsx';

export const RightPanel = () => {
    const { panelData, isPanelOpen, closePanel } = useRightPanel();

    const SetContent = () => {
        if (!panelData) {
            return null
        }
        if (panelData.type === "task") {
            return <TaskDetails taskId={panelData.taskId} />;
        }
    }

    return (
        <div className={`right-side-panel ${isPanelOpen ? 'open' : ''}`}>
            <div className="close-button" onClick={() => closePanel()}><SVGService.XIcon className='close-icon' /></div>
            <div className="panel-content">
                {SetContent()}
            </div>
        </div>
    );
};