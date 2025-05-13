import { BoardFilter } from './BoardFilter.jsx';
import SVGService from '../../services/svg/svg.service';

export const BoardHeader = ({ board }) => {
    return (
        <div className='board-header'>
            <div className='info-row'>
                <div className='title-container'>
                    <h2>{board.name}</h2>
                    <SVGService.CollapseGroupIcon alt="collapse" />
                </div>
                <div className='users-integration'>
                    activity log
                </div>
            </div>
            <div className='tables-row'>
                <div className='tables-row-card'>
                    Main Table
                    <SVGService.OptionsIcon alt="options" />
                </div>
                <div className='add-new-table-card'>
                    <SVGService.AddViewIcon alt="add view" />
                </div>
            </div>
            <div className='filter-plus-new-item-row'>
                <BoardFilter board={board} />
            </div>
        </div>
    );
};