# SVG Service Usage Guide

The `svg.service.js` lets you use SVG icons as React components anywhere in your app.

## Usage

1. Import the service:
```javascript
import SVGService from '../services/svg.service';
```

2. Use an icon:
```jsx
<SVGService.BoardIcon className="my-svg-icon" />
```

You can also style directly:
```jsx
<SVGService.HomeIcon style={{ color: 'gray', width: 20 }} />
```

## Naming
SVG files in `assets/icons` become PascalCase components:
- `add_comment_icon.svg` → `AddCommentIcon`
- `home_icon.svg` → `HomeIcon`

## Styling
- Use `className` for CSS classes
- Use `style` for inline styles


> Note: For color changes, SVGs should use `fill="currentColor"`.
