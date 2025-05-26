import { makeId } from '../../util.service.js'

export const statusColumn = {
    type: 'status',

    getDefaultValue() {
        return {
            _id: makeId(),
            title: 'Status',
            type: 'label',
            width: '130px',
            settings: {
                options: [
                    { _id: 'done', label: 'Done \u2713', color: '#00c875' },
                    { _id: 'working', label: 'Working on it', color: '#fdab3d' },
                    { _id: 'stuck', label: 'Stuck', color: '#df2f4a' },
                    { _id: 'planning', label: 'Planning', color: '#66ccff' },
                    { _id: 'testing', label: 'Testing', color: '#9d50dd' },
                    { _id: 'Default', label: ' ', color: '#c4c4c4' }
                ]
            },
        }
    }
}