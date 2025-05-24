import { useEffect } from "react";
import { loadBoards, addNewBoard, removeBoard } from "../../store/actions/board.actions.js"
import * as ReactRedux from 'react-redux'
import { BoardPreview } from './BoardPreview'
import { useModal } from '../../contexts/modal/useModal.jsx'
import { NewBoardModal } from '../modal_types/NewBoardModal.jsx'

const { useSelector } = ReactRedux

export const BoardList = () => {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { openModal, closeModal } = useModal();

    const onAddBoard = () => {
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
        addNewBoard(title).then((newBoard) => {
            if (newBoard) {
                window.location.href = `/board/${newBoard._id}`;
            }
        });
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