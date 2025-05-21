import { boardService, getEmptyGroup, getEmptyTask } from '../../services/board'
import { store } from '../store'
import { ADD_NEW_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_BOARD_MSG, ADD_TASK_GROUP } from '../reducers/board.reducer'

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

// Command Creators:
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

// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: 'm1oC7',
        title: 'Board-Good',
    })
    await removeBoard('m1oC7')
    // TODO unit test addBoardMsg
}
