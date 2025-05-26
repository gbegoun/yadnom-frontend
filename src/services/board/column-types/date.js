import { makeId } from '../../util.service.js'

export const dateColumn = {
    type: 'date',

    getDefaultValue() {
        return {
            _id: makeId(),
            title: 'Date',
            type: 'date',
            width: '140px',
            settings: {
                include_time: false
            }
        }
    }
}
