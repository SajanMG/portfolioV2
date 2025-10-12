---
layout: blog
title: "Getting Started with 11ty"
description: "Learn how to build fast, modern websites with 11ty static site generator"
date: 2025-10-12
tags: ["11ty", "static-sites", "web-development"]
excerpt: "11ty is a powerful static site generator that makes building modern websites simple and fast. In this post, we'll explore the basics of setting up an 11ty project and creating your first static site."
featureImage: "/images/blog/11ty-feature.jpg"
featureImageAlt: "11ty static site generator logo and code on a dark background"
---

# Getting Started with 11ty

11ty is a powerful static site generator that makes building modern websites simple and fast. In this post, we'll explore the basics of setting up an 11ty project and creating your first static site.

## What is 11ty?

11ty (Eleventy) is a simpler static site generator. It transforms a directory of templates (of varying types) into HTML. It's written in JavaScript and supports multiple template languages like Markdown, Nunjucks, Liquid, and more.

## Why Choose 11ty?

- **Zero-config by default**: Works out of the box
- **Template flexibility**: Use multiple template languages
- **Fast builds**: Optimized for performance
- **Data-driven**: Easy to work with data files
- **Active community**: Great documentation and support

## Getting Started

### Installation

```bash
npm init -y
npm install --save-dev @11ty/eleventy
```

### Basic Setup

Create an `index.html` file in your project root:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My 11ty Site</title>
</head>
<body>
    <h1>Hello, 11ty!</h1>
</body>
</html>
```

### Running 11ty

```bash
npx @11ty/eleventy --serve
```

This will start a local development server and watch for changes.

## Next Steps

Once you have the basics down, you can:

1. Add templates and layouts
2. Work with data files
3. Create collections
4. Add filters and shortcodes
5. Deploy your site

11ty is an excellent choice for developers who want flexibility and performance in their static site generation workflow.
