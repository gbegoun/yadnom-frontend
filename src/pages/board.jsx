import { useParams } from 'react-router-dom';
import { BoardHeader } from '../components/board/BoardHeader.jsx';
import { GroupList } from '../components/group/GroupList.jsx';
import { boardService } from '../services/board/index.js';
import { useEffect, useState, useCallback } from 'react';
import { BoardContext } from '../contexts/board/BoardContext.jsx';
import { addTaskGroup, addNewTask } from "../store/actions/board.actions.js"

export const Board = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    
    const loadBoard = useCallback(() => {
        boardService.getById(boardId)
            .then(setBoard)
            .catch(err => { console.log(err) });
    }, [boardId]);

    useEffect(() => {
        loadBoard()
    }, [loadBoard])

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
        console.log('groupId', groupId)
        addNewTask(board, groupId)
            .then(() => {
                loadBoard()
            })
    }

    const { columns, groups } = board || {};

    if (!board) return (<div>Loading...</div>)
    return (
        <BoardContext.Provider value={{ board, onNewGroupClicked, onNewTaskClicked, loadBoard }}>
            <main className="board-container">
                {board && <div>
                    <BoardHeader board={board} />
                    <GroupList board={board} />
                </div>}
                <button onClick={() => onNewGroupClicked(false)}>Add new group</button>
            </main>
        </BoardContext.Provider>
    )
}
