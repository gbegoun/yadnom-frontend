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
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
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
        const savedBoard = await boardService.save(board)
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

        if (groupId) {
            let group;
            group = board.groups.find(group => group._id === groupId)
            group.tasks.push(task)
        } else {
            let group;
            group = board.groups[0]
            group.tasks.unshift(task)
        }

        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))

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
