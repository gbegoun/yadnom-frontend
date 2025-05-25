import { useState, useEffect, useCallback } from 'react';

export const useBoardAnimations = (board) => {
    const [showAddButton, setShowAddButton] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Memoize the reset function to prevent infinite loops
    const resetAnimations = useCallback(() => {
        setIsAnimating(false);
        setShowAddButton(false);
    }, []); // Empty dependency array since it doesn't depend on any props/state

    // Coordinate all animations to start together
    useEffect(() => {
        if (board && board.groups && board.tasks && board.columns) {
            // Small delay to ensure DOM is ready and to give "loading" effect, then trigger all animations together
            const timer = setTimeout(() => {
                setIsAnimating(true);
                // Slightly longer delay for the add button to appear after content
                setTimeout(() => setShowAddButton(true), 200);
            }, 120);
            
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            setShowAddButton(false);
        }
    }, [board]);

    return {
        isAnimating,
        showAddButton,
        resetAnimations
    };
};