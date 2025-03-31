import { makeId } from '../../util.service.js'

export const statusColumn = {
    type: 'status',

    getDefaultValue() {
        return {
            _id: makeId(),
            title: 'Status',
            type: 'status',
            settings: {
                options: [
                    { id: 'done', label: 'Done', color: '#00c875' },
                    { id: 'working', label: 'Working on it', color: '#fdab3d' },
                    { id: 'stuck', label: 'Stuck', color: '#e2445c' }
                ]
            },
        }
    }
}