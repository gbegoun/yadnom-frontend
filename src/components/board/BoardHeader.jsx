import { BoardFilter } from './BoardFilter.jsx';

export const BoardHeader = ({ board }) => {
    return (
        <div className='board-header'>
            <div className='info-row'>
                <div className='title-container'>
                    <h2>{board.name}</h2>
                    <img src="..\src\assets\icons\collapse_group_icon.svg" alt="collapse" />
                </div>
                <div className='users-integration'>
                    activity log
                </div>
            </div>
            <div className='tables-row'>
                <div className='tables-row-card'>
                    Main Table
                    <img src="..\src\assets\icons\options_icon.svg" alt="options" />
                </div>
                <div className='add-new-table-card'>
                    <img src="..\src\assets\icons\add_view_icon.svg" alt="" />
                </div>
            </div>
            <div className='filter-plus-new-item-row'>
                <BoardFilter board={board} />
            </div>
        </div>
    );
};