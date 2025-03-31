const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { columnTypes } from './column-types'

export function getEmptyBoard() {
    return {
        name: null,
        description: null,
        members: [],
        created_at: Date.now(),
        updated_at: Date.now(),
        columns: getDefaultColumns(),
        groups: [],
        activities: []
    }
}

export function getEmptyGroup() {
    return {
        _id: makeId(),
        title: "New Group",
        tasks: []
    }
}

export function getEmptyTask(columns = []) {
    const task = {
        _id: makeId(),      
        title: 'New Task',
        created_at: Date.now(),
        updated_at: Date.now(),
        column_values: {}
    }

    columns.forEach(column => {
        task.column_values[column._id] = column.defaultValue || null
    })
    
    return task;
}


function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

function getDefaultColumns() {
    const columns = []
    columns.push(columnTypes.status.getDefaultValue())
    console.log('columns', columns)
    return columns
}


const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
