import { userService } from '../../services/user'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'

const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
    
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            // eslint-disable-next-line no-case-declarations
            const user = { ...state.user, score: action.score }
            newState = { ...state, user }
            userService.saveLoggedinUser(user)
            break
        default:
    }
    
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
