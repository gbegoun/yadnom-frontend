import { useState } from "react";
import { BoardList } from "../components/board/BoardList";
import SVGService from '../services/svg/svg.service';
import { useSelector } from "react-redux";

export const HomePage = () => {
    const loggedInUser = useSelector(state => state.userModule.user);
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleIcon = () => {
        setIsExpanded(!isExpanded);
    };

    const getWelcomeMessage = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good morning";
        } else if (currentHour < 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    const getPersonalizedWelcomeMessage = () => {
        if (loggedInUser) {
            return `${getWelcomeMessage()}, ${loggedInUser.fullname}!`;
        }
        return `${getWelcomeMessage()}!`;
    };

    return (
        <div className="home-container">
            <div className="welcome-message-container">
                <p className="personal-welcome-message">{getPersonalizedWelcomeMessage()}</p>
                <p className="default-welcome-message">Quickly access your recent boards, Inbox and workspaces
                </p>
            </div>
            <div className="home-board-list-container">
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
        </div>
    );
};