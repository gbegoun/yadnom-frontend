import { useState, useEffect } from "react";
import { boardService } from "../services/board/board.service.local.js"

export const BoardList = () => {
    const [boards, setBoards] = useState(null);

    function loadBoards() {
        boardService.query()
            .then(setBoards)
            .catch(err => {
                console.log('Problems getting boards:', err);
            });
    }

    useEffect(() => {
        loadBoards();
        console.log(boards);
    },[]);

    if (!boards) {
        return (<div>Loading...</div>);
    }
    return (
        <div>
            <h1>Boards List</h1>
            {boards && boards.map(board=>{
                return(
                    <div key={board._id}>
                        <a href={`/boards/${board._id}`}>{board.title || board._id}</a>
                    </div>
                );
            })}
        </div>
    );
};