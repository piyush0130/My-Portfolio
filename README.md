# Piyush Nanda - Cybersecurity Expert Portfolio

A modern, responsive portfolio website for Piyush Nanda, a cybersecurity expert. This portfolio features a sleek design with animations, a 3D model, and a light/dark theme toggle.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Light/Dark Theme**: Toggle between light and dark theme
- **3D Model**: Interactive 3D model using Three.js
- **Animations**: Smooth animations and transitions for a modern feel
- **Project Filtering**: Filter projects by category
- **Skills Display**: Animated skill bars to showcase expertise
- **Contact Form**: Functional contact form with validation
- **Custom Cursor**: Enhanced user experience with a custom cursor

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS variables, flexbox, grid)
- JavaScript (ES6+)
- Three.js for 3D graphics
- Font Awesome for icons
- GSAP for animations

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser to view the portfolio

## Customization

### Personal Information

Edit the HTML file to update:
- Name and title
- About section content
- Skills and percentages
- Services offered
- Projects
- Contact information

### Styling

Modify the CSS variables in `css/style.css` to change the color scheme:

```css
:root {
    --accent-color: #4e54c8; /* Primary accent color */
    --accent-gradient: linear-gradient(45deg, #4e54c8, #8f94fb); /* Gradient accent */
    /* Other variables */
}
```

### 3D Model

The 3D model can be customized in `js/main.js` by modifying the Three.js code:

```javascript
// Create a different geometric shape
const geometry = new THREE.DodecahedronGeometry(1.5, 0);
// Change to different geometry as needed
```

## Browser Support

This portfolio is optimized for modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is available for personal use.

## Acknowledgements

- Three.js for 3D rendering
- Font Awesome for the icons
- Unsplash for demo images
- Google Fonts for typography 
