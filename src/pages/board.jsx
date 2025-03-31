import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addTaskGroup, addNewTask } from "../store/actions/board.actions.js"
import { BoardContext } from '../contexts/BoardContext';
import { BoardHeader } from '../components/board/BoardHeader.jsx';
import { BoardFilter } from '../components/board/BoardFilter.jsx';
import { GroupList } from '../components/group/GroupList.jsx';
import { boardService } from '../services/board/index.js';

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

    const onNewTaskClicked = (groupId = null) => {
        addNewTask(board, groupId)
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
