import { useParams } from 'react-router-dom';
import { BoardHeader } from '../cmps/BoardHeader.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
import { boardService } from '../services/board/index.js';
// import { boardService } from '../services/board/board.service.local.js';
import { useEffect, useState } from 'react';

export const Board = () => {
    const { boardId } = useParams();
    const [board, setBaord] = useState(null);

    useEffect(() => {
        loadBoard()
    }, []);

    function loadBoard(){
        boardService.getById(boardId)
        .then(setBaord)
        .catch(err => {console.log(err)});
        
    }

    if(!board) return (<div>Loading...</div>)
    return (
        <>
        {board && <div>
            <BoardHeader name={board.name} />
            <GroupList columns={board.columns} group={board.groups[0]} />
        </div>
        }
        </>
    );
};
