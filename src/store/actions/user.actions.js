import { userService } from '../../services/user'
import { socketService } from '../../services/socket.service'
import { store } from '../store'
import { showErrorMsg } from '../../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }

}
export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export function setLoggedInUserFromLocalStorage() {
    try {
        const user = JSON.parse(localStorage.getItem('loggedInUser')) || null;
        if (!user) {
            throw new Error('No logged in user found in localStorage');
        }

        store.dispatch({
            type: SET_USER,
            user
        });

        console.log('Logged in user set to:', user);
        return user;
    } catch (err) {
        console.log('Cannot set logged in user', err);
        throw err;
    }
}

export async function loginUserFromCookies() {
    try {
        const user = await userService.verifyToken();

        store.dispatch({
            type: SET_USER,
            user
        });

        // socketService.login(user._id);

        return user;
    } catch (err) {
        console.log('No valid session found', err);
        // Don't throw - let app continue as guest
        return null;
    }
}