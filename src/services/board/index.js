const { DEV, VITE_LOCAL } = import.meta.env

import {  makeId } from '../util.service'
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { columnTypes } from './column-types'

export function getDefaultBoard(title) {
    const columns = getDefaultColumns()
    
    // Create two groups
    const group1 = {
        _id: makeId(),
        title: "Group Title",
        color: "#00c875", // Green color
        tasks: []
    }
    
    const group2 = {
        _id: makeId(),
        title: "Group Title",
        color: "#579bfc", // Blue color
        tasks: []
    }
    
    // Create 5 tasks (3 for first group, 2 for second)
    const tasks = []
    
    // First group tasks
    for (let i = 1; i <= 3; i++) {
        const task = {
            _id: makeId(),
            title: `Item ${i}`,
            created_at: Date.now(),
            updated_at: Date.now(),
            column_values: {},
            groupid: group1._id
        }
          // Initialize column values with specific status for each task
          // Status column - specific values for first two tasks, null for the rest
        if (i === 1) {
            task.column_values['status_column'] = 'working'; // "Working on it"
        } else if (i === 2) {
            task.column_values['status_column'] = 'done'; // "Done ✓"
        } else {
            task.column_values['status_column'] = 'Default'; // Default/no label
        }
        
        // Person column
        task.column_values['owners_column'] = []; // Empty array for owners column
        
        // Date column - empty as requested
        task.column_values['due_date_column'] = null;
        
        tasks.push(task)
    }
    
    // Second group tasks
    for (let i = 4; i <= 5; i++) {
        const task = {
            _id: makeId(),
            title: `Item ${i}`,
            created_at: Date.now(),
            updated_at: Date.now(),
            column_values: {},
            groupid: group2._id
        }
          // Initialize column values
          // Status column - set to null for all tasks in the second group (no label)
        task.column_values['status_column'] = "Default"; // Default/no label
        
        // Person column
        task.column_values['owners_column'] = []; // Empty array for owners column
        
        // Date column - empty as requested
        task.column_values['due_date_column'] = null;
        
        tasks.push(task)
    }
    
    return {
        name: title, 
        members: [201, 202, 203], // Include all available members
        created_at: Date.now(),
        updated_at: Date.now(),
        columns: columns,
        groups: [group1, group2],
        tasks: tasks,
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
        } else if (column.type === 'status' || column._id === 'status_column' || column.type === 'label' || column._id === 'priority_column') {
            // Set default value for status columns to 'Default' (the empty status)
            task.column_values[column._id] = 'Default';
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
    // Create status column with specific ID to match expected usage in components
    const statusColumn = columnTypes.status.getDefaultValue()
    statusColumn._id = 'status_column'
    
    // Create people column with specific ID
    const peopleColumn = columnTypes.people.getDefaultValue()
    peopleColumn._id = 'owners_column'
    
    // Create date column with specific ID
    const dateColumn = columnTypes.date.getDefaultValue()
    dateColumn._id = 'due_date_column'
    
    const columns = [statusColumn, peopleColumn, dateColumn]
    console.log('columns', columns)
    return columns
}


const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getDefaultBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
