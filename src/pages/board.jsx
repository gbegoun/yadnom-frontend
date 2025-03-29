import { useParams } from 'react-router-dom';
import { BoardHeader } from '../cmps/BoardHeader.jsx';
import { BoardFilter } from '../cmps/BoardFilter.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
import { boardService } from '../services/board/index.js';
// import { boardService } from '../services/board/board.service.local.js';
import { useEffect, useState } from 'react';

export const Board = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);

    useEffect(() => {
        loadBoard()
    }, []);

    function loadBoard() {
        boardService.getById(boardId)
            .then(setBoard)
            .catch(err => { console.log(err) });

    }

    const { name , columns, groups } = board || {};

    if (!board) return (<div>Loading...</div>)
    return (
        <main>
            {board && <div>
                <BoardHeader name={name} />
                <BoardFilter board={board} />
                <GroupList columns={columns} groups={groups} />
            </div>
            }
        </main>
    );
};
