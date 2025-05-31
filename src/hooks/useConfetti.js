import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * Custom hook for managing confetti effects in a container element
 * @param {Object} options Configuration options
 * @param {string} options.elementId - ID for the canvas element
 * @param {React.RefObject} options.containerRef - Reference to the container element
 * @param {React.RefObject} options.canvasRef - Reference to the canvas element
 * @returns {Object} Confetti control functions
 */
export const useConfetti = ({ elementId, containerRef, canvasRef }) => {
    const [hasPlayed, setHasPlayed] = useState(false);

    // Strong colors for the confetti
    const colors = [
        '#FF0000', '#FF0000', '#FF0000', // Red (3 times for higher frequency)
        '#FFFF00', '#FFFF00', '#FFFF00', // Yellow (3 times)
        '#FFFFFF', '#FFFFFF',            // White (2 times)
    ];

    // Reset played state when elementId changes
    useEffect(() => {
        setHasPlayed(false);
    }, [elementId]);

    /**
     * Trigger the confetti animation
     * @param {Object} options - Confetti options
     */
    const triggerConfetti = (options = {}) => {
        if (!canvasRef.current || !containerRef.current) return;

        // Get the container
        const container = containerRef.current;

        // Remove old canvas if it exists
        if (canvasRef.current) {
            canvasRef.current.remove();
        }

        // Create a new canvas
        const canvas = document.createElement('canvas');
        canvas.id = elementId;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.background = 'transparent';

        // Add the canvas to the container
        container.insertBefore(canvas, container.firstChild);

        // Set canvas dimensions
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Create confetti instance
        const confettiInstance = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });

        // Run two bursts of confetti for a more dramatic effect
        const defaultOptions = {
            particleCount: 80,
            spread: 40,
            origin: { y: 6, x: 0.5 },              // Use our strong colors
            disableForReducedMotion: true,
            colors: colors,
            //decay: 0.87,
            scalar: 1.2,                 // Make particles 70% larger
            gravity: 0.5,                // Slightly less gravity so they float higher
            shapes: ['circle'],
            zIndex: 1,
            ticks: 400,                   // Last longer
            opacity: 1,
            flat: false,
            startVelocity: 30,            // Start with a higher velocity
        };

        // Fire confetti with defaults merged with provided options
        confettiInstance({
            ...defaultOptions,
            ...options
        });

        // Update the ref to point to the new canvas
        canvasRef.current = canvas;

        // Mark as played
        setHasPlayed(true);
    };

    return {
        triggerConfetti,
        hasPlayed,
        resetConfetti: () => setHasPlayed(false)
    };
};