import { useParams } from 'react-router-dom';
import { BoardHeader } from '../cmps/BoardHeader.jsx';
import { BoardFilter } from '../cmps/BoardFilter.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
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

    const onNewGroupClicked = (position) => {
        addTaskGroup(board)
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
        </BoardContext.Provider>
    );
};
