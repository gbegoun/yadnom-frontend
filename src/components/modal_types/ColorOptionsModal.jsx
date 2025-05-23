import React from 'react';
import PropTypes from 'prop-types';

// Colors exactly matching Monday.com color palette
const colors = [
    '#1F7D43', '#22C55E', '#A3E635', '#D4D61A', '#F59E0B',
    '#7C3AED', '#9CA3AF', '#0284C7', '#60A5FA', '#BE185D',
    '#E11D48', '#F43F5E', '#EC4899', '#F97316', '#FB923C',
    '#7D4F40', '#D3D3D3', '#6B7280'
];

export const ColorOptionsModal = ({ currentColor, onSelectColor }) => {
    return (
        <div className="color-options-grid">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`color-option ${currentColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onSelectColor(color)}
                />
            ))}
        </div>
    );
};

ColorOptionsModal.propTypes = {
    currentColor: PropTypes.string,
    onSelectColor: PropTypes.func.isRequired,
};
