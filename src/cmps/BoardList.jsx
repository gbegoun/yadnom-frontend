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
        <div>
            <h1>Boards List</h1>
            <button onClick={() => onAddBoard()}>Add Board</button>
            {boards && boards.map(board => {
                return (
                    <div key={board._id}>
                        <a href={`/boards/${board._id}`}>{board.title || board._id}</a><button onClick={() => onRemoveBoard(board._id)}>X</button>
                    </div>
                );
            })}
        </div>
    );
};