
import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'BOARD'
_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg
}
window.cs = boardService


async function query(filterBy = {}) {
    var boards = await storageService.query(STORAGE_KEY)
    console.log("123", boards)
    // const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // if (minSpeed) {
    //     boards = boards.filter(board => board.speed >= minSpeed)
    // }
    // if (sortField === 'vendor' || sortField === 'owner') {
    //     boards.sort((board1, board2) =>
    //         board1[sortField].localeCompare(board2[sortField]) * +sortDir)
    // }
    // if (sortField === 'price' || sortField === 'speed') {
    //     boards.sort((board1, board2) =>
    //         (board1[sortField] - board2[sortField]) * +sortDir)
    // }

    // boards = boards.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
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
    
    if (!boards) {
        console.log("Creating Demo Boards")
        const module = await import("../../../demo-data.js");
        const boards = module.demo_data["boards"];
        saveToStorage(STORAGE_KEY, boards)
    }
}