import { Dropdown } from '../Item/item_col_types/Dropdown.jsx';
import { Label } from '../Item/item_col_types/Label.jsx';
import { People } from '../Item/item_col_types/People.jsx';
import { Files } from '../Item/item_col_types/Files.jsx';
import { Progress } from '../Item/item_col_types/Progress.jsx';

export const DynamicItem = ({ column, value, taskId, groupId }) => {
    switch (column.type) {
        case 'label':
            return <Label column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'dropdown':
            return <Dropdown column={column} value={value} taskId={taskId} groupId={groupId} />
        case 'people':
            return <People column={column} value={value} />
        // case 'files':
        //     return <Files column={column} value={value} />
        // case 'progress':
        //     return <Progress column={column} value={value} />
        default:
            return <span>{value}</span>
    }
}