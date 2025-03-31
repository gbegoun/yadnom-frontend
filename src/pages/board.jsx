import { useParams } from 'react-router-dom';
import { BoardHeader } from '../components/BoardHeader.jsx';
import { BoardFilter } from '../components/BoardFilter.jsx';
import { GroupList } from '../components/GroupList.jsx';
import { boardService } from '../services/board/index.js';
import { useEffect, useState } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import { addTaskGroup, addNewTask } from "../store/actions/board.actions.js"

export const Board = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);

    useEffect(() => {
        loadBoard()
    }, [board]);

    const onNewGroupClicked = (isTopPosition = true) => {
        addTaskGroup(board,isTopPosition)
            .then(group => { addNewTask(board, group._id) })
    };

    const onNewTaskClicked = () => {
        addNewTask(board)
    };

    function loadBoard() {
        boardService.getById(boardId)
            .then(setBoard)
            .catch(err => { console.log(err) });
    }

    const { name, columns, groups } = board || {};

    if (!board) return (<div>Loading...</div>)
    return (
        <BoardContext.Provider value={{ onNewGroupClicked, onNewTaskClicked }}>
            <main>
                {board && <div>
                    <BoardHeader name={name} />
                    <BoardFilter board={board} />
                    <GroupList columns={columns} groups={groups} />
                </div>
                }
            </main>
            <button onClick={()=>onNewGroupClicked(false)}>Add new group</button>
        </BoardContext.Provider>
    );
};
