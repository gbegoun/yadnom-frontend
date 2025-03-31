import { useEffect } from "react";
import { loadBoards, addNewBoard, removeBoard } from "../store/actions/board.actions.js"
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
            <div className="board-items">
                {boards && boards.map(board => {
                    return (
                        <a key={board._id} href={`/boards/${board._id}`} className="board-item">
                            <img src="../src/assets/icons/home_page_default_board_img.svg" alt="board image" />
                            <div className="board-content">
                                <h3>{board.title || board._id}</h3>
                                <p>{board.description}</p>
                            </div>
                            <div className="board-actions">
                                <img src="../src/assets/icons/star_favorite.svg" alt="favorite" className="favorite-icon" />
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
            </div>
        </div>
    );
};