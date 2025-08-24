# Portfolio Website - Built with 11ty

A modern, responsive portfolio website built with [11ty (Eleventy)](https://www.11ty.dev/) static site generator. Features a landing page with personal information and a blog section that can be integrated with GitHub for content management.

## Features

- 🎨 **Modern Design**: Clean, responsive design with smooth animations
- 📱 **Mobile-First**: Optimized for all device sizes
- 🚀 **Fast Performance**: Static site generation for optimal speed
- 📝 **Blog System**: Built-in blog with search and tag filtering
- 🔍 **Search & Filter**: Real-time search and tag-based filtering
- 🎯 **SEO Optimized**: Meta tags, Open Graph, and structured data
- 🎭 **Smooth Animations**: CSS animations and intersection observer effects
- 📊 **GitHub Integration Ready**: Prepared for GitHub-based content management

## Project Structure

```
portfolio-11ty/
├── src/
│   ├── _data/           # Data files (site config, posts)
│   ├── _includes/       # Reusable template parts
│   ├── _layouts/        # Page layouts
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   ├── images/         # Image assets
│   ├── index.njk       # Homepage
│   └── blog.njk        # Blog listing page
├── .eleventy.js        # 11ty configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download** this project to your local machine
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Customize the content**:
   - Edit `src/_data/site.js` with your personal information
   - Update `src/index.njk` with your details
   - Modify `src/_data/posts.js` with your blog posts
   - Replace placeholder images and content

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Customization

### Personal Information

Update the following files with your information:

- **`src/_data/site.js`**: Site-wide configuration
- **`src/index.njk`**: Landing page content
- **`src/_layouts/base.njk`**: Navigation and footer links

### Styling

- **`src/css/style.css`**: Main stylesheet with CSS custom properties
- **Color scheme**: Modify CSS variables in `:root` selector
- **Typography**: Update font imports and family declarations

### Blog Posts

Add your blog posts to `src/_data/posts.js` or create individual markdown files in a `posts/` directory.

## GitHub Integration

The project is prepared for GitHub integration:

1. **GitHub API**: Use the `axios` dependency to fetch content
2. **Content Management**: Implement `fetchGitHubPosts()` function in `src/js/main.js`
3. **Markdown Support**: 11ty can process markdown files from GitHub repositories

## Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build the site for production
- `npm run serve` - Build and serve the site locally
- `npm start` - Alias for development server

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `_site`

### Vercel

1. Import your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `_site`

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `_site` folder to your `gh-pages` branch
3. Enable GitHub Pages in repository settings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Static Generation**: Pre-built HTML for fast loading
- **CSS Optimization**: Efficient CSS with custom properties
- **JavaScript Lazy Loading**: Intersection Observer for animations
- **Image Optimization**: Responsive images and lazy loading ready
- **Minification Ready**: CSS and JS can be minified during build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:

1. Check the [11ty documentation](https://www.11ty.dev/docs/)
2. Review the [11ty GitHub repository](https://github.com/11ty/eleventy)
3. Open an issue in this repository

## Acknowledgments

- [11ty](https://www.11ty.dev/) - Static site generator
- [Inter Font](https://rsms.me/inter/) - Typography
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Web fonts

---

Built with ❤️ using 11ty
