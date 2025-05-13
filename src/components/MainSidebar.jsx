import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SVGService from '../services/svg/svg.service';
import { useEffect } from 'react';
import { loadBoards } from '../store/actions/board.actions.js';

export const MainSidebar = () => {
    const boards = useSelector(storeState => storeState.boardModule.boards);
    const location = useLocation();

    useEffect(() => {
        loadBoards();
    }, []);

    const getHomeClass = () => {
        return `sidebar-btn${location.pathname === '/' ? ' active' : ''}`;
    };

    const getBoardClass = (boardId) => {
        return `sidebar-link${location.pathname.includes(boardId) ? ' active' : ''}`;
    };

    return (
        <nav className="main-sidebar-nav">
            {/* Home button */}
            <Link to="/" className={getHomeClass()}> 
                <SVGService.HomeIcon className="sidebar-icon" />
                <span>Home</span>
            </Link>

            {/* Boards section */}
            <div className="sidebar-section">
                <ul className="sidebar-list sidebar-boards">
                    {boards && boards.length ? boards.map(board => (
                        <li key={board._id}>
                            <Link to={`/board/${board._id}`} className={getBoardClass(board._id)}>
                                <SVGService.BoardIcon className="sidebar-icon" />
                                <span>{board.name}</span>
                            </Link>
                        </li>
                    )) : <li className="sidebar-empty">No boards</li>}
                </ul>
            </div>
        </nav>
    );
};