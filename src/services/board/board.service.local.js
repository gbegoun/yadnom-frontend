
import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'BOARD'
await _createBoards()

export const boardService = {
    query,
    // Board operations
    getById,
    saveBoard,
    removeBoard,
    addBoardMsg,

    // Group operations
    // saveGroup,
    // removeGroup
}
window.cs = boardService

async function query(filterBy = {}) {
    var boards = await storageService.query(STORAGE_KEY)
    return boards
}

async function getById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    return board
}

async function removeBoard(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function saveBoard(board) {
    var savedBoard
    
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

async function _createBoards() {
    let boards = loadFromStorage(STORAGE_KEY)
    
    if (!boards || !boards.length) {
        console.log("Creating Demo Boards")
        const module = await import("../../../demo-data-new.js");
        const boards = module.demo_data["boards"];
        saveToStorage(STORAGE_KEY, boards)
    }
}