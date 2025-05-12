import { useEffect } from "react";
import { loadBoards, addNewBoard, removeBoard } from "../../store/actions/board.actions.js"
import * as ReactRedux from 'react-redux';
import { BoardPreview } from './BoardPreview';

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
                {boards && boards.map(board => (
                    <BoardPreview 
                        key={board._id}
                        board={board}
                        onRemoveBoard={onRemoveBoard}
                    />
                ))}
            </ul>
        </div>
    );
};