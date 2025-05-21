import { boardService, getEmptyGroup, getEmptyTask } from '../../services/board'
import { store } from '../store'
import { ADD_NEW_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_BOARD_MSG, ADD_TASK_GROUP } from '../reducers/board.reducer'

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
        console.log('loadBoard called with boardId:', boardId);
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
        console.log('Board loaded from service:', board ? `ID: ${board._id}` : 'no board');
        store.dispatch(getCmdSetBoard(board));
        console.log('SET_BOARD action dispatched');
        return board
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.removeBoard(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addNewBoard() {
    try {
        const newBoard = boardService.getEmptyBoard()
        const savedBoard = await boardService.saveBoard(newBoard)
        store.dispatch(getCmdAddNewBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function addBoardMsg(boardId, txt) {
    try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        store.dispatch(getCmdAddBoardMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add board msg', err)
        throw err
    }
}

export async function addTaskGroup(board, isPositionTop = true) {
    try {
        if (!board.groups) board.groups = []
        const group = getEmptyGroup()

        if (isPositionTop) board.groups.unshift(group)
        else board.groups.push(group)

        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return group

    } catch (err) {
        console.log('Cannot add task group', err)
        throw err
    }
}

export async function addNewTask(board, groupId) {
    try {
        console.log('addNewTask', groupId)
        const task = getEmptyTask(board.columns)

        // Make sure board.tasks exists
        if (!board.tasks) board.tasks = []
        
        // Set the groupid on the task to link it to the correct group
        if (groupId) {
            task.groupid = groupId
            // Add task to the board's tasks array
            board.tasks.push(task)
        } else {
            // If no groupId specified, use the first group's ID
            const firstGroupId = board.groups[0]?._id
            if (!firstGroupId) {
                throw new Error('No groups exist in this board')
            }
            task.groupid = firstGroupId
            // Add task to the beginning of the board's tasks array
            board.tasks.unshift(task)
        }

        console.log('Added new task with ID:', task._id, 'to groupId:', task.groupid)
        
        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        
        // Also explicitly dispatch SET_BOARD to ensure immediate UI update
        store.dispatch({
            type: SET_BOARD,
            board: savedBoard
        })

        return task

    } catch (err) {
        console.log('Cannot add new task', err)
        throw err
    }
}

// ================ TASK ACTIONS ================

/**
 * Updates a specific task's column value (like status or priority)
 * @param {Object} board - The current board
 * @param {String} groupId - The ID of the group containing the task
 * @param {String} taskId - The ID of the task to update
 * @param {String} columnId - The ID of the column to update
 * @param {*} value - The new value for the column
 * @returns {Promise<Object>} - The updated task
 */
export async function updateTaskColumnValue(boardFromStore, groupId, taskId, columnId, value) {
    try {
        console.log('updateTaskColumnValue called with:', { groupId, taskId, columnId, value });
        
        // Create a deep copy of the board to ensure immutability
        const board = JSON.parse(JSON.stringify(boardFromStore));

        // Find the task in the cloned board's top-level tasks array
        const taskIndex = board.tasks.findIndex(t => t._id === taskId && t.groupid === groupId)
        if (taskIndex === -1) throw new Error(`Task not found: ${taskId}`)
        
        // Update the column value in the cloned board
        board.tasks[taskIndex].column_values[columnId] = value
        console.log('Task updated in memory:', board.tasks[taskIndex]);        
        const savedBoard = await boardService.saveBoard(board);
        console.log('Board saved, dispatching UPDATE_BOARD action');
        store.dispatch(getCmdUpdateBoard(savedBoard));
        console.log('UPDATE_BOARD action dispatched');

        // Also explicitly update the current board in Redux to ensure UI refreshes
        store.dispatch({
            type: SET_BOARD,
            board: savedBoard
        });
        console.log('SET_BOARD action also dispatched for immediate UI refresh');

        return board.tasks[taskIndex];
    } catch (err) {
        console.error('Cannot update task column value', err)
        throw err
    }
}

/**
 * Updates a specific task's title
 * @param {Object} board - The current board
 * @param {String} groupId - The ID of the group containing the task
 * @param {String} taskId - The ID of the task to update
 * @param {String} newTitle - The new title for the task
 * @returns {Promise<Object>} - The updated task
 */
export async function updateTaskTitle(boardFromStore, groupId, taskId, newTitle) {
    try {
        // Create a deep copy of the board to ensure immutability
        const board = JSON.parse(JSON.stringify(boardFromStore));

        // Find the group in the cloned board's groups array
        const group = board.groups.find(g => g._id === groupId);
        if (!group) {
            throw new Error(`Group not found: ${groupId}`);
        }

        // Find the task in the group's tasks array
        const taskIndex = group.tasks.findIndex(t => t._id === taskId);
        if (taskIndex === -1) {
            throw new Error(`Task not found: ${taskId} in group ${groupId}`);
        }

        group.tasks[taskIndex].title = newTitle;

        const savedBoard = await boardService.saveBoard(board);
        store.dispatch(getCmdUpdateBoard(savedBoard));
        
        return group.tasks[taskIndex];
    } catch (err) {
        console.error('Cannot update task title', err);
        throw err;
    }
}

/**
 * Updates any direct property of a task (like title, description, etc.)
 * @param {Object} boardFromStore - The current board from Redux store
 * @param {String} groupId - The ID of the group containing the task
 * @param {String} taskId - The ID of the task to update
 * @param {String} propertyName - The name of the property to update
 * @param {*} value - The new value for the property
 * @returns {Promise<Object>} - The updated task
 */
export async function updateTaskDirectProperty(boardFromStore, groupId, taskId, propertyName, value) {
    try {
        console.log(`updateTaskDirectProperty called with:`, { groupId, taskId, propertyName, value });
        
        // Create a deep copy of the board to ensure immutability
        const board = JSON.parse(JSON.stringify(boardFromStore));

        // Find the task in the cloned board's top-level tasks array
        const taskIndex = board.tasks.findIndex(t => t._id === taskId);
        
        if (taskIndex === -1) {
            throw new Error(`Task not found: ${taskId} in top-level tasks array`);
        }
        
        // Update the property on the task object
        board.tasks[taskIndex][propertyName] = value;
        console.log(`Updated task ${propertyName}:`, board.tasks[taskIndex]);
        
        // Save the board to the server
        const savedBoard = await boardService.saveBoard(board);
        console.log('Board saved, dispatching UPDATE_BOARD action');
        
        // Dispatch both action types to ensure the UI updates properly
        store.dispatch(getCmdUpdateBoard(savedBoard));
        console.log('UPDATE_BOARD action dispatched');

        // Also explicitly update the current board in Redux to ensure UI refreshes
        store.dispatch({
            type: SET_BOARD,
            board: savedBoard
        });
        console.log('SET_BOARD action also dispatched for immediate UI refresh');

        return board.tasks[taskIndex];
    } catch (err) {
        console.error(`Cannot update task ${propertyName}`, err);
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
