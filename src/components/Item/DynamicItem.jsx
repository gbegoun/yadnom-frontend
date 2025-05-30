import { Dropdown } from '../Item/item_col_types/Dropdown.jsx';
import { Label } from '../Item/item_col_types/Label.jsx';
import { People } from '../Item/item_col_types/People.jsx';
import { Files } from '../Item/item_col_types/Files.jsx';
import { DateCol } from '../Item/item_col_types/DateCol.jsx';

export const DynamicItem = ({ column, value, taskId, groupId }) => {
    switch (column.type) {
        case 'label':
            return <Label column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'dropdown':
            return <Dropdown column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'people':
            return <People column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'date':
            return <DateCol column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'file':
            return <Files column={column} value={value} taskId={taskId} groupId={groupId} />
        // case 'progress':
        //     return <Progress column={column} value={value} taskId={taskId} groupId={groupId} />
        default:
            return <span>{value}</span>
    }
}