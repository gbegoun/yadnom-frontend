import { boardService } from '../../services/board'
import { store } from '../store'
import { UPDATE_BOARD, SET_BOARD } from '../reducers/board.reducer'

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
        // Create a deep copy of the board to ensure immutability
        const board = JSON.parse(JSON.stringify(boardFromStore));

        // Find the task in the cloned board's top-level tasks array
        const taskIndex = board.tasks.findIndex(t => t._id === taskId && t.groupid === groupId)
        if (taskIndex === -1) throw new Error(`Task not found: ${taskId}`)

        // Update the column value in the cloned board
        board.tasks[taskIndex].column_values[columnId] = value

        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))

        return board.tasks[taskIndex]
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


function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}
