import { useState } from "react";
import { BoardList } from "../components/board/BoardList";
import SVGService from '../services/svg/svg.service';

export const HomePage = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIcon = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Board Manager</h1>
            <div className="icon-span-container">
                {isExpanded ? 
                    <SVGService.CollapseGroupIcon
                        onClick={toggleIcon}
                        className="icon-button"
                    />
                : 
                    <SVGService.ExpandItemIcon
                        onClick={toggleIcon}
                        className="icon-button"
                    />
                }
                <span>Recently visited</span>
            </div>
            {isExpanded && <BoardList />}
        </div>
    );
};