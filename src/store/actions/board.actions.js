import { boardService, getEmptyGroup, getEmptyTask } from '../../services/board';
import { store } from '../store';
import { 
    ADD_NEW_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, 
    ADD_BOARD_MSG, ADD_TASK_GROUP, UPDATE_TASK_PROPERTY_OPTIMISTIC, UPDATE_TASK_COLUMN_OPTIMISTIC,
    UPDATE_GROUP_PROPERTY_OPTIMISTIC, ADD_GROUP_OPTIMISTIC, ADD_TASK_OPTIMISTIC
} from '../reducers/board.reducer';

// ================ BOARD ACTIONS ================

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        // If no boardId is provided, use the current board's ID from the store
        if (!boardId && store.getState().boardModule.board) {
            boardId = store.getState().boardModule.board._id;
            console.log('Using current board ID from store:', boardId);
        }
        
        if (!boardId) {
            console.error('No boardId provided and no board in store');
            return null;
        }
        
        const board = await boardService.getById(boardId);
        store.dispatch(getCmdSetBoard(board));

        return board
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    // Store the current boards state for potential rollback
    const currentBoards = store.getState().boardModule.boards;
    const boardToRemove = currentBoards.find(board => board._id === boardId);
    
    if (!boardToRemove) {
        console.error('Board not found for removal:', boardId);
        return;
    }
    
    try {
        // Optimistically remove the board from the UI
        store.dispatch(getCmdRemoveBoard(boardId));
        
        // Actually remove from server
        await boardService.removeBoard(boardId);
        // No need to dispatch again since we already updated the UI
        
    } catch (err) {
        console.log('Cannot remove board', err);
        
        // Revert the optimistic update by adding the board back
        if (boardToRemove) {
            console.log('Error occurred, reverting optimistic board removal');
            store.dispatch({
                type: ADD_NEW_BOARD, 
                board: boardToRemove
            });
        }
        
        throw err;
    }
}

export async function addNewBoard(title='New Board') {
    // Create a new empty board
    const newBoard = boardService.getEmptyBoard(title)
    
    try {
        // Immediately dispatch to update UI
        store.dispatch(getCmdAddNewBoard(newBoard))
        
        // Save to server
        const savedBoard = await boardService.saveBoard(newBoard)
        
        // Update with server response (might include generated IDs, etc)
        store.dispatch({
            type: UPDATE_BOARD,
            board: savedBoard
        })
        console.log('UPDATE_BOARD action dispatched with server data');
        
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        
        // Since this is a new board, we can't revert to a previous state,
        // but we could remove the optimistically added board from the boards array
        const boards = store.getState().boardModule.boards.filter(
            b => b._id !== newBoard._id
        );
        
        store.dispatch({
            type: SET_BOARDS,
            boards
        });
        
        throw err
    }
}

export async function updateBoard(board) {
    // Store original board for error recovery
    const originalBoard = store.getState().boardModule.board;
    
    try {
        // Dispatch optimistic update to immediately update the UI
        store.dispatch(getCmdUpdateBoard(board));
        
        // Save to server
        const savedBoard = await boardService.saveBoard(board)
        
        // Confirm update with server data
        store.dispatch(getCmdUpdateBoard(savedBoard))

        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        
        // Revert optimistic update on error
        if (originalBoard) {
            console.log('Error occurred, reverting optimistic update');
            store.dispatch({
                type: SET_BOARD,
                board: originalBoard
            });
        }
        
        throw err
    }
}

export async function addBoardMsg(boardId, txt) {
    // Create an optimistic message
    const optimisticMsg = {
        id: Date.now().toString(), // Temporary ID
        txt,
        createdAt: new Date().toISOString()
    };
    
    try {
        // Dispatch optimistic update
        store.dispatch(getCmdAddBoardMsg(optimisticMsg));
        
        // Save to server
        const savedMsg = await boardService.addBoardMsg(boardId, txt);
        // Note: No need to update again as the message is already displayed
        // However, we could update if we need the correct ID or other server-generated data
        
        return savedMsg;
    } catch (err) {
        console.log('Cannot add board msg', err);
        
        // We could implement a removeMsg action to undo the optimistic update
        // But for now we'll just let the error propagate
        
        throw err;
    }
}

export async function addTaskGroup(board, isPositionTop = true) {
    try {
        // Create the new group
        const group = getEmptyGroup()
        console.log('Created new group with ID:', group._id);

        // Perform optimistic update to immediately update UI
        store.dispatch({
            type: ADD_GROUP_OPTIMISTIC,
            group,
            isPositionTop,
            boardId: board._id
        });
        
        // Get the updated board after the reducer has processed the update
        const updatedBoard = store.getState().boardModule.board;
        
        // Save to server
        const savedBoard = await boardService.saveBoard(updatedBoard)
        
        // Confirm update with server data
        store.dispatch(getCmdUpdateBoard(savedBoard))

        return group

    } catch (err) {
        console.log('Cannot add task group', err)
        
        // Revert optimistic update on error
        if (board) {
            console.log('Error occurred, reverting optimistic update');
            store.dispatch({
                type: SET_BOARD,
                board: board
            });
        }
        
        throw err
    }
}

export async function addNewTask(board, groupId, title) {
    try {
        console.log('addNewTask', groupId)
        const task = getEmptyTask(board.columns)

        // Create a new board object for the optimistic update
        const updatedBoard = JSON.parse(JSON.stringify(board));
        
        // Make sure board.tasks exists
        if (!updatedBoard.tasks) updatedBoard.tasks = []
        
        if(title){
            task.title = title
        }
        
        // Set the groupid on the task to link it to the correct group
        if (groupId) {
            task.groupid = groupId
            // Add task to the board's tasks array
            updatedBoard.tasks.push(task)
        } else {
            // If no groupId specified, use the first group's ID
            const firstGroupId = updatedBoard.groups[0]?._id
            if (!firstGroupId) {
                throw new Error('No groups exist in this board')
            }
            task.groupid = firstGroupId
            // Add task to the beginning of the board's tasks array
            updatedBoard.tasks.unshift(task)
        }        
        
        // Optimistic update - immediately update the UI
        store.dispatch({
            type: ADD_TASK_OPTIMISTIC,
            task,
            groupId: task.groupid,
            isPositionTop: !groupId // Top position if no groupId was specified
        });
        
        // Get the updated board after the reducer has processed the update
        const updatedBoardAfterOptimistic = store.getState().boardModule.board;
        
        // Save to server
        const savedBoard = await boardService.saveBoard(updatedBoardAfterOptimistic)
        
        // Confirm update with server data
        store.dispatch(getCmdUpdateBoard(savedBoard))

        return task
    } catch (err) {
        console.log('Cannot add new task', err)

        // Revert optimistic update on error by restoring the original board
        if (board) {
            console.log('Error occurred, reverting optimistic update');
            store.dispatch({
                type: SET_BOARD,
                board: board  // Use the original board passed to the function
            });
        }
        
        throw err
    }
}

// ================ TASK ACTIONS ================

/**
 * Updates a specific task's column value (like status or priority)
 * Uses optimistic updates pattern for smoother UX
 * @param {Object} board - The current board
 * @param {String} groupId - The ID of the group containing the task
 * @param {String} taskId - The ID of the task to update
 * @param {String} columnId - The ID of the column to update
 * @param {*} value - The new value for the column
 * @returns {Promise<Object>} - The updated task
 */
export async function updateTaskColumnValue(boardFromStore, groupId, taskId, columnId, value) {
    try {
        
        // 1. Dispatch optimistic update to update UI immediately
        store.dispatch({
            type: UPDATE_TASK_COLUMN_OPTIMISTIC,
            taskId,
            columnId,
            value
        });
        
        // 2. Get the updated board from the store (after reducer has run)
        const updatedBoard = store.getState().boardModule.board;
        
        // 3. Save the updated board to the server
        const savedBoard = await boardService.saveBoard(updatedBoard);
        
        // 4. Dispatch success action with server response to confirm update
        store.dispatch(getCmdUpdateBoard(savedBoard));
        
        // 5. Find and return the updated task
        const task = savedBoard.tasks.find(t => t._id === taskId);
        if (!task) {
            throw new Error(`Task not found in saved board: ${taskId}`);
        }
        
        return task;
    } catch (err) {
        console.error('Cannot update task column value', err);
        
        // In case of error, we should revert the optimistic update
        // by dispatching the original board data
        if (boardFromStore) {
            console.log('Error occurred, reverting optimistic update');
            store.dispatch({
                type: SET_BOARD,
                board: boardFromStore
            });
        }
        
        throw err;
    }
}

/**
 * Updates any direct property of a task (like title, description, etc.)
 * Uses optimistic updates pattern for smoother UX
 * @param {Object} boardFromStore - The current board from Redux store
 * @param {String} groupId - The ID of the group containing the task
 * @param {String} taskId - The ID of the task to update
 * @param {String} propertyName - The name of the property to update
 * @param {*} value - The new value for the property
 * @returns {Promise<Object>} - The updated task
 */
export async function updateTaskDirectProperty(boardFromStore, groupId, taskId, propertyName, value) {
    try {
        
        // 1. Dispatch optimistic update to update UI immediately
        store.dispatch({
            type: UPDATE_TASK_PROPERTY_OPTIMISTIC,
            taskId,
            propertyName,
            value
        });
        
        // 2. Get the updated board from the store (after reducer has run)
        const updatedBoard = store.getState().boardModule.board;
        
        // 3. Save the updated board to the server
        const savedBoard = await boardService.saveBoard(updatedBoard);
        
        // 4. Dispatch success action with server response to confirm update
        store.dispatch(getCmdUpdateBoard(savedBoard));
        
        // 5. Find and return the updated task
        const task = savedBoard.tasks.find(t => t._id === taskId);
        if (!task) {
            throw new Error(`Task not found in saved board: ${taskId}`);
        }
        
        return task;
    } catch (err) {
        console.error(`Cannot update task ${propertyName}`, err);
        
        // In case of error, we should revert the optimistic update
        // by dispatching the original board data
        if (boardFromStore) {
            console.log('Error occurred, reverting optimistic update');
            store.dispatch({
                type: SET_BOARD,
                board: boardFromStore
            });
        }
        
        throw err;
    }
}

/**
 * Updates any direct property of a group (like title, color, etc.)
 * Uses optimistic updates pattern for smoother UX
 * @param {Object} boardFromStore - The current board from Redux store
 * @param {String} groupId - The ID of the group to update
 * @param {String} propertyName - The name of the property to update
 * @param {*} value - The new value for the property
 * @returns {Promise<Object>} - The updated group
 */
export async function updateGroupDirectProperty(boardFromStore, groupId, propertyName, value) {
    try {
        
        // 1. Dispatch optimistic update to update UI immediately
        store.dispatch({
            type: UPDATE_GROUP_PROPERTY_OPTIMISTIC,
            groupId,
            propertyName,
            value
        });
        
        // 2. Get the updated board from the store (after reducer has run)
        const updatedBoard = store.getState().boardModule.board;
        
        // 3. Save the updated board to the server
        const savedBoard = await boardService.saveBoard(updatedBoard);
        
        // 4. Dispatch success action with server response to confirm update
        store.dispatch(getCmdUpdateBoard(savedBoard));
        
        // 5. Find and return the updated group
        const group = savedBoard.groups.find(g => g._id === groupId);
        if (!group) {
            throw new Error(`Group not found in saved board: ${groupId}`);
        }
        
        return group;
    } catch (err) {
        console.error(`Cannot update group ${propertyName}`, err);
        
        // In case of error, we should revert the optimistic update
        // by dispatching the original board data
        if (boardFromStore) {
            console.log('Error occurred, reverting optimistic update');
            store.dispatch({
                type: SET_BOARD,
                board: boardFromStore
            });
        }
        
        throw err;
    }
}

/**
 * Get a board by its ID
 * @param {String} boardId - The ID of the board to get
 * @returns {Promise<Object>} - The board object
 */
export function getBoardById(boardId) {
    return boardService.getById(boardId)
        .then(board => {
            store.dispatch({
                type: SET_BOARD,
                board
            })
            return board
        })
}

// ================ ACTION CREATORS ================

function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
function getCmdAddNewBoard(board) {
    return {
        type: ADD_NEW_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}
function getCmdAddBoardMsg(msg) {
    return {
        type: ADD_BOARD_MSG,
        msg
    }
}

// Unit tests for actions - uncomment to run
// async function unitTestActions() {
//     await loadBoards()
//     await addNewBoard() // Fixed function name
//     await updateBoard({
//         _id: 'm1oC7',
//         title: 'Board-Good',
//     })
//     await removeBoard('m1oC7')
//     // TODO unit test addBoardMsg
// }
