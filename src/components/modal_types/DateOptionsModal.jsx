import React, { useRef, useEffect } from 'react';

export default function DateOptionsModal({ value, onSelect, onClose }) {
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    // Format value for input - only take the date part (YYYY-MM-DD)
    const inputValue = value ? value.substring(0, 10) : '';
    return (
        <>
            <button className="date-modal-today-btn" onClick={() => {
                const today = new Date();
                let formatted = today.toISOString().substring(0, 10);
                onSelect(formatted);
                onClose();
            }}>Today</button>

            <input
                ref={inputRef}
                className="date-modal-input"
                type={'date'}
                value={inputValue}
                onChange={e => {
                    onSelect(e.target.value);
                    onClose();
                }}
            />
        </>
    );
}
