// Auto-import all SVGs as React components
const svgModules = import.meta.glob('../assets/icons/*.svg', {
    import: 'ReactComponent',
    eager: true,
});

const SVGService = {};

// Convert file paths to component-friendly names
// add_comment_icon.svg -> AddCommentIcon
for (const path in svgModules) {
    const name = path
        .split('/')
        .pop()
        .replace('.svg', '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    SVGService[name] = svgModules[path];
}

export default SVGService;
