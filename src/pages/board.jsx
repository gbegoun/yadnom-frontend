import { useParams } from 'react-router-dom';
import { BoardHeader } from '../components/board/BoardHeader.jsx';
import { GroupList } from '../components/group/GroupList.jsx';
import { useEffect } from 'react';
import { BoardContext } from '../contexts/board/BoardContext.jsx';
import { addTaskGroup, addNewTask, updateBoard, loadBoard } from "../store/actions/board.actions.js";
import { useSelector } from 'react-redux';
import SVGService from '../services/svg/svg.service.js';
import { useBoardAnimations } from '../hooks/useBoardAnimations.js';

export const Board = () => {
    const { boardId } = useParams();
    const board = useSelector(state => state.boardModule.board);
    
    // Custom hook for animation coordination
    const { isAnimating, showAddButton, resetAnimations } = useBoardAnimations(board);

    useEffect(() => {
        // Reset animation state when boardId changes
        resetAnimations();
        loadBoard(boardId)
            .catch(err => { console.log("Error loading board:", err); });
            
    }, [boardId, resetAnimations]);

    const onNewGroupClicked = (isTopPosition = true) => {
        addTaskGroup(board, isTopPosition)
            .then(group => {
                addNewTask(board, group._id)
                    .catch(err => console.error('Error adding task to new group:', err));
            })
            .catch(err => console.error('Error adding task group:', err));
    };

    const onNewTaskClicked = (groupId = null, title = null) => {
        console.log('Adding new task to group:', groupId);
        addNewTask(board, groupId, title)
            .catch(err => console.error('Error adding new task:', err));
    };

    const onBoardSave = (updatedBoard) => {
        updateBoard(updatedBoard)
           .catch(err => console.error('Error saving board:', err));
    };


    if (!board) return (<div className='loading'></div>); 
    
    // Check if board has all necessary data loaded
    const isBoardFullyLoaded = board && board.groups && board.tasks && board.columns;
    
    return (
        <BoardContext.Provider value={{ board, onNewGroupClicked, onNewTaskClicked, loadBoard }}>
            <main className={`board-container ${isAnimating ? 'board-enter' : ''}`}>
                {isBoardFullyLoaded && isAnimating && (
                    <>
                        <BoardHeader board={board} />
                        <GroupList board={board} onBoardSave={onBoardSave} />
                    </>)}
                {showAddButton && (
                    <button 
                        className="add-group-btn button-enter" 
                        onClick={() => onNewGroupClicked(false)}
                    >
                        <SVGService.AddViewIcon className="add-group-btn-icon" />
                        Add new group
                    </button>
                )}
            </main>
        </BoardContext.Provider>
    )
}
