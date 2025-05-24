import React from 'react';
import PropTypes from 'prop-types';

// Colors exactly matching Monday.com color palette
const colors = [
    '#037F4C', '#00C875', '#9CD326', '#CAB641', '#FFCB00',
    '#784BD1', '#9D50DD', '#007EB5', '#579BFC', '#66CCFF',
    '#BB3354', '#DF2F4A', '#FF007F', '#FF5AC4', '#FF642E',
    '#FDAB3D', '#7F5347', '#C4C4C4', '#757575'
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
