# Quick Start Guide

Get your portfolio website up and running in minutes!

## 🚀 Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Customize your information**
   - Edit `src/_data/site.js` with your details
   - Update `src/index.njk` with your content
   - Replace placeholder text and images

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **View your site**
   Open http://localhost:8080 in your browser

## ✨ What You Get

- **Landing Page**: Professional homepage with your information
- **Blog Section**: Ready-to-use blog with search and filtering
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, professional design with animations
- **SEO Ready**: Optimized for search engines

## 🎨 Customization

### Colors & Styling
Edit `src/css/style.css` and modify the CSS variables in `:root`:
```css
:root {
  --primary-color: #3b82f6;    /* Your brand color */
  --accent-color: #f59e0b;     /* Accent color */
  --text-primary: #1e293b;     /* Main text color */
}
```

### Content
- **Site Info**: `src/_data/site.js`
- **Blog Posts**: `src/_data/posts.js`
- **Homepage**: `src/index.njk`
- **Blog Page**: `src/blog.njk`

### Layouts
- **Base Layout**: `src/_layouts/base.njk`
- **Blog Layout**: `src/_layouts/blog.njk`

## 📝 Adding Blog Posts

### Option 1: Data File
Add posts to `src/_data/posts.js`:
```javascript
{
  title: "Your Post Title",
  description: "Post description",
  date: "2024-01-20",
  tags: ["tag1", "tag2"],
  excerpt: "Post excerpt...",
  url: "/blog/your-post-url"
}
```

### Option 2: Markdown Files
Create `.md` files in `src/posts/` with front matter:
```markdown
---
title: Your Post Title
description: Post description
date: 2024-01-20
tags: [tag1, tag2]
---

Your post content here...
```

## 🔧 Available Commands

- `npm run dev` - Development server with live reload
- `npm run build` - Build for production
- `npm run serve` - Build and serve locally
- `npm start` - Alias for development server

## 🌐 Deployment

### Netlify
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `_site`

### Vercel
1. Import your GitHub repo
2. Build command: `npm run build`
3. Output directory: `_site`

### GitHub Pages
1. Build: `npm run build`
2. Push `_site` folder to `gh-pages` branch
3. Enable GitHub Pages in settings

## 📱 Mobile Testing

Test your site on mobile devices:
- Use browser dev tools (F12 → Device toolbar)
- Test on actual mobile devices
- Check responsive breakpoints in CSS

## 🎯 Next Steps

1. **Add your content** - Replace all placeholder text
2. **Customize styling** - Adjust colors, fonts, and layout
3. **Add images** - Place your images in `src/images/`
4. **Set up domain** - Configure your custom domain
5. **Add analytics** - Integrate Google Analytics or similar

## 🆘 Need Help?

- Check the [main README.md](README.md) for detailed documentation
- Review [11ty documentation](https://www.11ty.dev/docs/)
- Open an issue in this repository

---

**Happy coding! 🎉**
