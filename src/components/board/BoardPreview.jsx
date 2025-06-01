import React from 'react';
import { Link } from 'react-router-dom';
import SVGService from '../../services/svg/svg.service';

export const BoardPreview = ({ board, onRemoveBoard }) => {
    return (
        <Link key={board._id} to={`/board/${board._id}`} className="board-item">
            <img src="https://res.cloudinary.com/drunensjg/image/upload/v1748779275/home_page_default_board_img_xoaqk3.svg" alt="board image" />
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
        </Link>
    );
};
