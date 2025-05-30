import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SVGService from '../services/svg/svg.service';
import { useEffect } from 'react';
import { loadBoards, addNewBoard } from '../store/actions/board.actions.js';
import { useModal } from '../contexts/modal/useModal.jsx'
import { NewBoardModal } from './modal_types/NewBoardModal.jsx'

export const MainSidebar = () => {
    const boards = useSelector(storeState => storeState.boardModule.boards);
    const location = useLocation();

    const { openModal, closeModal } = useModal();

    const onAddClick = () => {
        openModal(
            <NewBoardModal
                onClose={closeModal}
                onAddNewBoard={onAddNewBoard}
            />,
            { backgroundOverlay: true }
        );
    }

    const onAddNewBoard = (title) => {
        closeModal();
        loadBoards();
        addNewBoard(title).then((newBoard) => {
            if (newBoard) {
                window.location.href = `/board/${newBoard._id}`;
            }
        });
    }

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
                <div className="workspace-section">
                    <div className="workspace-header">
                        <div className="workspace-icon">W</div>
                        <span className="workspace-title">Workspace</span>
                    </div>
                    <div className="sidebar-AddBoard-Button" onClick={onAddClick}>
                        <SVGService.AddViewIcon className="sidebar-AddBoard-icon" />
                    </div>
                </div>

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