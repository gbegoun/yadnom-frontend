import { DropdownSummary } from './DropdownSummary.jsx';
import { LabelSummary } from './LabelSummary.jsx';
import { PeopleSummary } from './PeopleSummary.jsx';

export const DynamicSummary = ({ column, tasks }) => {

    switch (column.type) {
        case 'label':
            return <LabelSummary column={column} tasks={tasks} />
        case 'dropdown':
            return <DropdownSummary column={column} tasks={tasks}/>
        case 'people':
            return <PeopleSummary column={column} tasks={tasks}/>
        default:
            return <span></span>
    }
}