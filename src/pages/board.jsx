import { useParams } from 'react-router-dom';
import { BoardHeader } from '../components/board/BoardHeader.jsx';
import { GroupList } from '../components/group/GroupList.jsx';
import { boardService } from '../services/board/index.js';
import { useEffect, useState, useCallback } from 'react';
import { BoardContext } from '../contexts/board/BoardContext.jsx';
import { addTaskGroup, addNewTask, updateBoard, loadBoard } from "../store/actions/board.actions.js";
import { useSelector } from 'react-redux';

export const Board = () => {
    const { boardId } = useParams();
    const [localBoard, setLocalBoard] = useState(null);
    // Get the board directly from Redux store
    const reduxBoard = useSelector(state => state.boardModule.board);
    
    // Use Redux board if available, otherwise use local state
    const board = reduxBoard || localBoard;
    
    console.log("Board component rendering with board:", board ? `ID: ${board._id}` : 'no board');

    useEffect(() => {
        console.log("Board component: Loading board with ID:", boardId);
        loadBoard(boardId)
            .then(loadedBoard => {
                console.log("Board component: Board loaded successfully:", loadedBoard._id);
                setLocalBoard(loadedBoard);
            })
            .catch(err => { console.log("Error loading board:", err); });
    }, [boardId])

    const onNewGroupClicked = (isTopPosition = true) => {
        addTaskGroup(board, isTopPosition)
            .then(group => {
                addNewTask(board, group._id)
                    .then(() => {
                        loadBoard()
                    })
            })
    }

    const onNewTaskClicked = (groupId = null) => {
        addNewTask(board, groupId)
            .then(() => {
                loadBoard()
            })
    }

    const onBoardSave = (updatedBoard) => {
        updateBoard(updatedBoard)
            .then(() => {
                loadBoard()
            })
    }

    if (!board) return (<div>Loading...</div>)
    return (
        <BoardContext.Provider value={{ board, onNewGroupClicked, onNewTaskClicked, loadBoard }}>
            <main className="board-container">
                {board && <div>
                    <BoardHeader board={board} />
                    <GroupList board={board} onBoardSave={onBoardSave}/>
                </div>}
                <button onClick={() => onNewGroupClicked(false)}>Add new group</button>
            </main>
        </BoardContext.Provider>
    )
}
