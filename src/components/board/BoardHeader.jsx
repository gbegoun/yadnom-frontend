import { BoardFilter } from './BoardFilter.jsx';

export const BoardHeader = ({ board }) => {
    return (
        <div className='board-header'>
            <div className='info-layer'>
                <h2>{board.name}</h2>
                <img src="..\src\assets\icons\collapse_group_icon.svg" alt="collapse" />
                <div className='users-integration'>
                    activity log
                </div>
            </div>
            <div className='tables-row'>
                main table
            </div>
            <hr className='divider' />
            <div className='filter-plus-new-item-container'>
                <BoardFilter board={board} />
            </div>
        </div>
    );
};