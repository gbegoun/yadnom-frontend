import { useParams } from 'react-router-dom';
import { BoardHeader } from '../cmps/BoardHeader.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
import {demo_data} from  "../../demo-data.js"

export const Board = () => {
    const { boardId } = useParams();
    const board = demo_data["boards"][0]

    return (
        <div>
            <BoardHeader name={board.name} />
            <GroupList columns={board.columns} group={board.groups[0]}/>
        </div>
    );
};
