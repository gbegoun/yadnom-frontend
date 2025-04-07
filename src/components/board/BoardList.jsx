import { useEffect } from "react";
import { loadBoards, addNewBoard, removeBoard } from "../../store/actions/board.actions.js"
import * as ReactRedux from 'react-redux';

const { useSelector } = ReactRedux

export const BoardList = () => {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    const onAddBoard = () => {
        addNewBoard();
    }

    const onRemoveBoard = (boardId) => {
        removeBoard(boardId);
    }

    useEffect(() => {
        loadBoards();
    }, []);


    if (!boards) {
        return (<div>Loading...</div>);
    }

    return (
        <div className="board-list">
            <button className="add-board-btn" onClick={() => onAddBoard()}>Add Board</button>
            <ul className="board-items">
                {boards && boards.map(board => {
                    return (
                        <a key={board._id} href={`/boards/${board._id}`} className="board-item">
                            <img src="../src/assets/icons/home_page_default_board_img.svg" alt="board image" />
                            <div className="board-content">
                                <img src="../src/assets/icons/board_icon.svg" alt="board" className="board-icon" />
                                <h3>{board.name || board._id}</h3>
                                <img src="../src/assets/icons/star_favorite.svg" alt="favorite" className="favorite-icon" />
                                <p>{board.description}</p>
                            </div>
                            <div className="board-actions">
                                <button className="remove-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRemoveBoard(board._id);
                                    }}>
                                    Remove
                                </button>
                            </div>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};