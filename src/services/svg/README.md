# SVG Service Usage Guide

The `svg.service.js` provides an easy way to use SVG icons throughout the application.

## How to Use

1. Import the service:
```javascript
import SVGService from '../services/svg.service';
```

2. Use SVG icons as React components:
```javascript
<SVGService.BoardIcon style={{ color: 'blue', width: 24 }} />
<SVGService.HomeIcon style={{ color: 'gray', width: 20 }} />
```

## Naming Convention
SVG files in the `assets/icons` directory are automatically converted to PascalCase component names:
- `add_comment_icon.svg` → `AddCommentIcon`
- `home_icon.svg` → `HomeIcon`
- `board_icon.svg` → `BoardIcon`

## Styling
You can style icons using the `style` prop:
- Change color using `color`
- Adjust size using `width` and `height`
- Apply any other valid SVG styles

Example:
```javascript
<SVGService.SearchIcon style={{ 
  color: 'tomato',
  width: 24,
  height: 24,
  transform: 'rotate(90deg)'
}} />
```

Note: For color changes to work, your SVG files should use `fill="currentColor"`.
