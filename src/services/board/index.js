const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { columnTypes } from './column-types'

export function getEmptyBoard(title) {
    return {
        name: title, 
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
        color: "blue",
        tasks: []
    }
}

export function getEmptyTask(columns = []) {
    const task = {
        _id: makeId(),      
        title: 'New Task',
        created_at: Date.now(),
        updated_at: Date.now(),
        column_values: {},
        groupid: null  // Will be set by addNewTask
    }

    columns.forEach(column => {
        // Initialize array columns (like people) as empty arrays
        if (column.type === 'people') {
            task.column_values[column._id] = [];
        } else {
            task.column_values[column._id] = column.defaultValue || null;
        }
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
