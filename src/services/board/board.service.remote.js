import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    saveBoard,
    removeBoard,
    addBoardMsg,
    removeComment
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`board`, filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function saveBoard(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`board/${boardId}/msg`, {txt})
    return savedMsg
}

async function removeComment(boardId, taskId, commentId) {
    return httpService.delete(`board/${boardId}/tasks/${taskId}/comments/${commentId}`)
}