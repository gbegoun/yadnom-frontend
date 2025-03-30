import { statusColumn } from './status.js'

export const columnTypes = {
    status: statusColumn,
}

export function getDefaultValueForType(type) {
    if (!columnTypes[type]) return null;
    return columnTypes[type].getDefaultValue();
}
