import { useParams } from 'react-router-dom';
import { BoardHeader } from '../components/board/BoardHeader.jsx';
import { GroupList } from '../components/group/GroupList.jsx';
import { useEffect } from 'react';
import { BoardContext } from '../contexts/board/BoardContext.jsx';
import { addTaskGroup, addNewTask, updateBoard, loadBoard } from "../store/actions/board.actions.js";
import { useSelector } from 'react-redux';

export const Board = () => {
    const { boardId } = useParams();
    const board = useSelector(state => state.boardModule.board);

    useEffect(() => {
        loadBoard(boardId)
            .catch(err => { console.log("Error loading board:", err); });
    }, [boardId])

    const onNewGroupClicked = (isTopPosition = true) => {
        addTaskGroup(board, isTopPosition)
            .then(group => {
                // Add a new task to the newly created group
                addNewTask(board, group._id)
                    .catch(err => console.error('Error adding task to new group:', err));
            })
            .catch(err => console.error('Error adding task group:', err));
    }

    const onNewTaskClicked = (groupId = null, title = null) => {
        console.log('Adding new task to group:', groupId);
        addNewTask(board, groupId, title)
            .catch(err => console.error('Error adding new task:', err));
    }

    const onBoardSave = (updatedBoard) => {
        updateBoard(updatedBoard)
            .catch(err => console.error('Error saving board:', err));
    }

    if (!board) return (<div>Loading...</div>)
    return (
        <BoardContext.Provider value={{ board, onNewGroupClicked, onNewTaskClicked, loadBoard }}>
            <main className="board-container">
                {board && (
                    <>
                        <BoardHeader board={board} />
                        <GroupList board={board} onBoardSave={onBoardSave} />
                        <button onClick={() => onNewGroupClicked(false)}>Add new group</button>
                    </>)}
            </main>
        </BoardContext.Provider>
    )
}
