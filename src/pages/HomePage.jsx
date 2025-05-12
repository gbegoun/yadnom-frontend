import { useState } from "react";
import { BoardList } from "../components/board/BoardList";

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
                    <img src="../src/assets/icons/collapse_group_icon.svg" alt="close item"
                        onClick={toggleIcon}
                        className="icon-button"
                    />
                : 
                    <img src="../src/assets/icons/expand_item_icon.svg" alt="expand item"
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