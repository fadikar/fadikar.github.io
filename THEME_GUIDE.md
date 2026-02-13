# Gradient Theme with Light/Dark Mode

Your website now features a modern gradient-based design with automatic light/dark theme switching!

## Features

### 1. **Beautiful Gradients**
- **Navbar**: Purple-to-violet gradient (light mode) or purple-to-pink (dark mode)
- **Cards**: Smooth hover effects with gradient borders
- **Buttons**: Gradient backgrounds with elevation on hover
- **Text Accents**: Gradient text for headings and important elements

### 2. **Light/Dark Theme Toggle**
- Click the moon/sun icon in the navbar to switch themes
- Your preference is saved automatically in your browser
- Smooth transitions between themes
- Theme persists across page navigation

### 3. **Gradient Colors**

**Light Theme:**
- Primary Gradient: Purple (#667eea) to Violet (#764ba2)
- Accent Gradient: Pink (#f093fb) to Blue (#4facfe)
- Background: White with subtle gray gradient
- Cards: White with soft shadows

**Dark Theme:**
- Primary Gradient: Purple (#8b5cf6) to Pink (#ec4899)
- Accent Gradient: Pink (#f093fb) to Blue (#4facfe)
- Background: Dark blue-gray (#1a202c)
- Cards: Dark gray (#2d3748) with deeper shadows

## How It Works

### Theme Toggle Button
Located in the navbar (right side), shows:
- 🌙 Moon icon when in light mode (click to switch to dark)
- ☀️ Sun icon when in dark mode (click to switch to light)

### Automatic Persistence
Your theme preference is saved in `localStorage`, so when you return to the site, it remembers your choice.

## Customizing Colors

### Option 1: Quick Color Change
Edit `css/custom.css` and modify the CSS variables at the top:

```css
/* Light Theme */
:root {
    --gradient-start: #667eea;      /* Change start color */
    --gradient-end: #764ba2;        /* Change end color */
    --gradient-accent: #f093fb;     /* Accent color 1 */
    --gradient-secondary: #4facfe;  /* Accent color 2 */
}

/* Dark Theme */
[data-theme="dark"] {
    --gradient-start: #8b5cf6;      /* Change start color */
    --gradient-end: #ec4899;        /* Change end color */
}
```

### Option 2: Popular Gradient Combinations

**Sunset Theme:**
```css
--gradient-start: #ff6b6b;
--gradient-end: #feca57;
```

**Ocean Theme:**
```css
--gradient-start: #00d2ff;
--gradient-end: #3a7bd5;
```

**Forest Theme:**
```css
--gradient-start: #11998e;
--gradient-end: #38ef7d;
```

**Royal Theme:**
```css
--gradient-start: #000428;
--gradient-end: #004e92;
```

**Candy Theme:**
```css
--gradient-start: #ee9ca7;
--gradient-end: #ffdde1;
```

## Technical Details

### Files Modified
- `css/custom.css` - Complete theme system with CSS variables
- `js/theme-toggle.js` - Theme switching logic
- All HTML files - Added theme toggle button and script

### Browser Support
- Works in all modern browsers
- CSS variables for dynamic theming
- LocalStorage for preference persistence
- Smooth transitions with CSS

### Accessibility
- Theme button has proper ARIA labels
- High contrast in both light and dark modes
- Keyboard accessible theme toggle
- Respects system preferences (optional enhancement)

## Tips

1. **Test Both Themes**: Always preview your content in both light and dark modes
2. **Check Images**: Ensure images look good in both themes
3. **Text Contrast**: Verify text is readable in both modes
4. **Card Shadows**: Shadows are automatically adjusted for each theme

## Disabling Dark Mode

If you want to remove the dark mode option:

1. Delete the theme toggle button from all HTML files
2. Remove `js/theme-toggle.js`
3. Remove the `[data-theme="dark"]` section from `custom.css`

## Advanced: System Theme Detection

To automatically match the user's system preference, add this to `theme-toggle.js`:

```javascript
// Detect system preference
function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Use system theme if no preference set
function getTheme() {
    return localStorage.getItem('theme') || getSystemTheme();
}
```

## Support

For gradient inspiration: https://uigradients.com/
For color palettes: https://coolors.co/
