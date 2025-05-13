import React from 'react';
import SVGService from '../../services/svg/svg.service';

export const BoardPreview = ({ board, onRemoveBoard }) => {
    return (
        <a key={board._id} href={`/board/${board._id}`} className="board-item">
            <img src="../src/assets/icons/home_page_default_board_img.svg" alt="board image" />
            <div className="board-content">
                <SVGService.BoardIcon className="board-icon" />
                <h3>{board.name || board._id}</h3>
                <SVGService.StarFavorite className="favorite-icon" />
                <p>{board.description}</p>
            </div>
            <div className="board-actions">
                <button className="remove-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemoveBoard(board._id);
                    }}>
                    Remove
                </button>
            </div>
        </a>
    );
};
