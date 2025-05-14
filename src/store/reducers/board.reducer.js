export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_NEW_BOARD = 'ADD_NEW_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const ADD_BOARD_MSG = 'ADD_BOARD_MSG'
export const ADD_TASK_GROUP = 'ADD_TASK_GROUP'
export const ADD_NEW_TASK = 'ADD_NEW_TASK'

const initialState = {
    boards: [],
    board: null
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case REMOVE_BOARD:{
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        }
        case ADD_NEW_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case ADD_BOARD_MSG:
            newState = { ...state, board: { ...state.board, msgs: [...state.board.msgs || [], action.msg] } }
            break
        case ADD_TASK_GROUP: {
            let newGroup = action.group
            let targetBoard = state.boards.find(board => board._id === action.boardId)

            if (!targetBoard.groups) targetBoard.groups = []

            if (action.position === 'top') targetBoard.groups.unshift(newGroup)
            else targetBoard.groups.push(newGroup)

            boards = state.boards.map(b => (b._id === action.boardId) ? targetBoard : b)
            newState = { ...state, boards }
            break
        }

        case ADD_NEW_TASK: {
            let taskBoard = action.board
            let taskGroup = action.group
            
            if (!taskGroup.tasks) taskGroup.tasks = []

            if (action.position === 'top') taskGroup.tasks.unshift(action.task)
            else taskGroup.tasks.push(action.task)

            taskBoard.groups = taskBoard.groups.map(g => (g._id === action.groupId) ? taskGroup : g)
            boards = state.boards.map(b => (b._id === action.boardId) ? taskBoard : b)
            newState = { ...state, boards }
            break
        }

        default:
    }
    
    return newState
}

// unitTestReducer()

// eslint-disable-next-line no-unused-vars
function unitTestReducer() {
    var state = initialState
    const board1 = { _id: 'b101', vendor: 'Board ' + parseInt(Math.random() * 10), msgs: [] }
    const board2 = { _id: 'b102', vendor: 'Board ' + parseInt(Math.random() * 10), msgs: [] }

    state = boardReducer(state, { type: SET_BOARDS, boards: [board1] })
    console.log('After SET_BOARDS:', state)

    state = boardReducer(state, { type: ADD_NEW_BOARD, board: board2 })
    console.log('After ADD_NEW_BOARD:', state)

    state = boardReducer(state, { type: UPDATE_BOARD, board: { ...board2, vendor: 'Good' } })
    console.log('After UPDATE_BOARD:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board2._id })
    console.log('After REMOVE_BOARD:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = boardReducer(state, { type: ADD_BOARD_MSG, boardId: board1._id, msg })
    console.log('After ADD_BOARD_MSG:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board1._id })
    console.log('After REMOVE_BOARD:', state)
}

