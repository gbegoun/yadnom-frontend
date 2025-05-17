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
export async function updateTaskColumnValue(board, groupId, taskId, columnId, value) {
    try {
        // Find the group and task
        const group = board.groups.find(g => g._id === groupId)
        if (!group) throw new Error(`Group not found: ${groupId}`)
        
        const taskIndex = group.tasks.findIndex(t => t._id === taskId)
        if (taskIndex === -1) throw new Error(`Task not found: ${taskId}`)
        
        // Update the column value
        group.tasks[taskIndex].column_values[columnId] = value
        
        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        
        return group.tasks[taskIndex]
    } catch (err) {
        console.error('Cannot update task column value', err)
        throw err
    }
}

function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
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
