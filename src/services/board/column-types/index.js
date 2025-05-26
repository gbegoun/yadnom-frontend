import { statusColumn } from './status.js'
import { peopleColumn } from './people.js'
import { dateColumn } from './date.js'

export const columnTypes = {
    status: statusColumn,
    people: peopleColumn,
    date: dateColumn
}

export function getDefaultValueForType(type) {
    if (!columnTypes[type]) return null;
    return columnTypes[type].getDefaultValue();
}