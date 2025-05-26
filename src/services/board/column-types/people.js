import { makeId } from '../../util.service.js'

export const peopleColumn = {
    type: 'people',

    getDefaultValue() {
        return {
            _id: makeId(),
            title: 'Person',
            type: 'people',
            width: '140px',
            settings: {
                allow_multiple: true
            }
        }
    }
}
