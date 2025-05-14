import { Dropdown } from './Dropdown.jsx';
import { Label } from './Label.jsx';
import { People } from './People.jsx';

export const DynamicItem = ({ column, value, taskId, groupId }) => {
    switch (column.type) {
        case 'label':
            return <Label column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'dropdown':
            return <Dropdown column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'people':
            return <People column={column} value={value} />
        default:
            return <span>{value}</span>
    }
}