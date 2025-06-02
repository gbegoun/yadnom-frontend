import Axios from 'axios'
import { store } from '../store/store'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`

    let config = { url, method }

    if (method === 'GET') {
        config.params = data
    } else {
        config.data = data
    }


    try {
        const res = await axios(config)
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}`)
        throw err
    }
}



//////temp

function getCurrentUser() {
    try {
        const state = store.getState()
        return state.userModule?.user || null
    } catch (err) {
        console.warn('Could not get current user from store:', err)
        return null
    }
}