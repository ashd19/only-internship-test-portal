# Yuga Yatra Logo Custom Cursor System

A sophisticated custom cursor implementation that uses the Yuga Yatra logo as the cursor, providing a premium brand experience with smooth animations and accessibility features.

## Features

### 🎯 Logo-Based Cursor States
- **Default**: 32x32 gold Yuga Yatra logo with subtle glow
- **Hover**: 24x24 white logo with gold halo on interactive elements
- **Loading**: 28x28 rotating gold logo during API calls and async operations
- **Clicking**: Compressed white logo with enhanced glow
- **Text Selection**: Gold vertical line for text inputs
- **Disabled**: Grayed out logo for disabled elements

### ✨ Logo Animations
- **Outer Circle**: Animated dashed circle rotation
- **Y Shapes**: Subtle bounce animation
- **Pillars**: Glowing effect animation
- **Loading**: Smooth rotation animation
- **Pulse**: Luxury pulsating effect

### ♿ Accessibility
- Automatically disabled on touch devices
- Respects `prefers-reduced-motion` user preference
- High contrast mode support
- Fallback to default cursor when needed
- SVG-based for crisp scaling at any size

## Installation

The logo-based cursor is already integrated into the application. The following files are included:

```
src/
├── components/common/
│   ├── CustomCursor.js          # Main cursor component
│   ├── CursorDemo.js           # Demo component
│   └── YugaYatraLogo.js        # Logo SVG component
├── hooks/
│   └── useLoadingCursor.js     # Loading cursor hook
├── styles/
│   └── cursor.css              # Logo cursor styles
├── utils/
│   └── cursorUtils.js          # Utility functions
└── App.js                      # Main app with cursor integration
```

## Logo Design

The Yuga Yatra logo cursor features:
- **Outer Circle**: Incomplete circle with breaks and dots
- **Stylized Y Shapes**: Two mirrored Y letters
- **YUGA YATRA Text**: Clean typography
- **Vertical Pillars**: Architectural column elements
- **Central Line**: Subtle symmetry divider

## Usage

### Basic Integration

The logo cursor is automatically active throughout the application. No additional setup required.

### Loading States

Use the `useLoadingCursor` hook for manual loading control:

```jsx
import useLoadingCursor from '../hooks/useLoadingCursor';

const MyComponent = () => {
  const { startLoading, stopLoading, withLoading } = useLoadingCursor();

  const handleAsyncOperation = async () => {
    startLoading();
    try {
      await someAsyncOperation();
    } finally {
      stopLoading();
    }
  };

  // Or use the wrapper
  const handleWithWrapper = async () => {
    await withLoading(async () => {
      await someAsyncOperation();
    });
  };

  return (
    <button onClick={handleAsyncOperation}>
      Start Operation
    </button>
  );
};
```

### Logo Component Usage

Use the YugaYatraLogo component directly:

```jsx
import YugaYatraLogo from '../components/common/YugaYatraLogo';

const MyComponent = () => {
  return (
    <div>
      {/* Default logo */}
      <YugaYatraLogo size={32} color="#D4AF37" />
      
      {/* Animated logo */}
      <YugaYatraLogo size={32} color="#D4AF37" animated={true} />
      
      {/* Loading logo */}
      <YugaYatraLogo size={32} color="#D4AF37" loading={true} />
      
      {/* White variant */}
      <YugaYatraLogo size={32} color="#FFFFFF" />
    </div>
  );
};
```

### Utility Functions

Use utility functions for common patterns:

```jsx
import { withLoadingCursor, fetchWithLoading } from '../utils/cursorUtils';

// Wrap any async function
const enhancedFunction = withLoadingCursor(async (data) => {
  // Your async logic here
});

// Enhanced fetch requests
const response = await fetchWithLoading('/api/data');

// Form submissions
const handleSubmit = withFormLoading(async (formData) => {
  await submitForm(formData);
});
```

### Custom Interactive Elements

Add the `clickable` class to make any element interactive:

```jsx
<div className="clickable">
  This div will show hover cursor
</div>
```

## Demo

Visit `/cursor-demo` to see all logo cursor features in action:

- Interactive elements (buttons, links, inputs)
- Loading state demonstrations
- Logo animation showcase
- Accessibility information
- Technical implementation details

## Customization

### Logo Colors

Modify colors in the component or CSS:

```jsx
<YugaYatraLogo color="#D4AF37" /> // Gold
<YugaYatraLogo color="#FFFFFF" /> // White
<YugaYatraLogo color="#000000" /> // Black
```

### Logo Sizes

Adjust logo sizes:

```jsx
<YugaYatraLogo size={32} /> // Default
<YugaYatraLogo size={24} /> // Hover
<YugaYatraLogo size={28} /> // Loading
```

### Animation Speed

Modify animation timing in CSS:

```css
.custom-cursor .yuga-yatra-logo {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes logo-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Browser Support

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (fallback to default cursor)

## Performance

- SVG-based logo for infinite scalability
- Uses `requestAnimationFrame` for smooth animations
- Efficient event handling with proper cleanup
- Minimal DOM manipulation
- Automatic touch device detection

## Technical Details

### SVG Implementation
- Vector-based logo for crisp rendering
- CSS-controlled colors and animations
- Responsive scaling without quality loss
- Cross-browser compatibility

### Animation System
- CSS keyframes for smooth transitions
- JavaScript-controlled state management
- Hardware-accelerated animations
- Reduced motion support

### Accessibility Features
- Touch device detection
- Motion preference respect
- High contrast mode support
- Screen reader compatibility

## Troubleshooting

### Logo Not Visible
1. Check if you're on a touch device (cursor is disabled)
2. Ensure `CustomCursor` component is mounted in `App.js`
3. Verify CSS is properly imported
4. Check browser console for SVG rendering issues

### Loading Not Working
1. Use the `useLoadingCursor` hook
2. Dispatch custom events: `loading-start` and `loading-end`
3. Check browser console for errors

### Performance Issues
1. Reduce animation complexity in CSS
2. Check for memory leaks in event listeners
3. Ensure proper cleanup in component unmount
4. Monitor SVG rendering performance

## Contributing

When adding new logo features:

1. Update `src/components/common/YugaYatraLogo.js` for logo changes
2. Modify `src/styles/cursor.css` for new states
3. Update `src/components/common/CustomCursor.js` for logic
4. Add utility functions to `src/utils/cursorUtils.js`
5. Update documentation
6. Test on multiple devices and browsers

## License

This logo-based cursor implementation is part of the OnlyInternship.in platform and follows the same licensing terms. 