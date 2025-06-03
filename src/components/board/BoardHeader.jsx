import { BoardFilter } from './BoardFilter.jsx';
import SVGService from '../../services/svg/svg.service';
import { useModal } from '../../contexts/modal/useModal';
import { BoardNameModal } from '../modal_types/BoardNameModal.jsx';
import { updateBoard } from '../../store/actions/board.actions.js';
import { useModalPosition } from '../../hooks/useModalPosition';
import { useRef } from 'react';

export const BoardHeader = ({ board }) => {
    const { openModal } = useModal();
    const boardTitleRef = useRef(null);
    const { boardNameModalPosition } = useModalPosition();

    const handleBoardNameClick = () => {
        if (!board) return;

        const rect = boardTitleRef.current.getBoundingClientRect();
        const modifiedRect = boardNameModalPosition(rect);

        openModal(
            <BoardNameModal
                board={board}
                onSave={handleSaveBoardName}
            />,
            {
                targetRect: modifiedRect,

            }
        );
    };

    const handleSaveBoardName = async (newName) => {
        if (board && newName !== board.name) {
            const updatedBoard = { ...board, name: newName };
            try {
                await updateBoard(updatedBoard);
            } catch (error) {
                console.error('Failed to update board name:', error);
            }
        }
    };

    if (!board) {
        return <div className='board-header'>Loading...</div>;
    }

    return (
        <div className='board-header'>
            <div className='board-header-container'>
                <div className='info-row'>
                    <div className='title-container'>
                        <h2
                            ref={boardTitleRef}
                            className='board-title clickable'
                            onClick={handleBoardNameClick}
                            title="Click to edit board name"
                        >
                            {board.name}
                        </h2>
                        <SVGService.CollapseGroupIcon alt="collapse" />
                    </div>
                    {/* <div className='users-integration'>
                        activity log
                    </div> */}
                </div>
                <div className='tables-row'>
                    <div className='tables-row-card'>
                        Main Table
                        <SVGService.OptionsIcon alt="options" />
                    </div>
                    <div className='add-new-table-card'>
                        <SVGService.AddViewIcon className="add-view-icon" alt="add view" />
                    </div>
                </div>
                <div className='filter-plus-new-item-row'>
                    <BoardFilter board={board} />
                </div>
            </div>
        </div>
    );
};