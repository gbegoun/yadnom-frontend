/**
 * A hook for handling modal positioning with different strategies
 */
export const useModalPosition = () => {
    const centerBottomPosition = (rect) => ({
        top: rect.top,
        bottom: rect.bottom + 8, // 8px padding from the target
        left: rect.left /*- (rect.width / 2) */,  // Center the modal
        right: rect.right,
        width: rect.width,
        height: rect.height
    });

    return {
        centerBottomPosition
        // We can add more positioning strategies here in the future
        // like rightPosition, leftPosition, etc.
    };
};
