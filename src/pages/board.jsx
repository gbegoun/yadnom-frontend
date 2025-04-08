import { useParams } from 'react-router-dom';
import { BoardHeader } from '../components/board/BoardHeader.jsx';
import { GroupList } from '../components/group/GroupList.jsx';
import { boardService } from '../services/board/index.js';
import { useEffect, useState } from 'react';
import { BoardContext } from '../contexts/board/BoardContext.jsx';
import { addTaskGroup, addNewTask } from "../store/actions/board.actions.js"

export const Board = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);

    useEffect(() => {
        loadBoard()
    }, [board]);

    const onNewGroupClicked = (isTopPosition = true) => {
        addTaskGroup(board, isTopPosition)
            .then(group => { addNewTask(board, group._id) })
    };

    const onNewTaskClicked = (groupId = null) => {
        console.log('groupId', groupId)
        addNewTask(board, groupId)
    };

    function loadBoard() {
        boardService.getById(boardId)
            .then(setBoard)
            .catch(err => { console.log(err) });
    }

    const { columns, groups } = board || {};

    if (!board) return (<div>Loading...</div>)
    return (
        <BoardContext.Provider value={{ onNewGroupClicked, onNewTaskClicked }}>
            <main className="board-container">
                {board && <div>
                    <BoardHeader board={board} />
                    <GroupList columns={columns} groups={groups} />
                </div>}
                <button onClick={() => onNewGroupClicked(false)}>Add new group</button>
            </main>
        </BoardContext.Provider>
    );
};
