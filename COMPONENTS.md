# Component Architecture

This portfolio project now uses a modular, component-based architecture to avoid code duplication and improve maintainability.

## 🧩 Available Components

### Core Layout Components

#### `nav.njk`
**Location**: `src/_includes/nav.njk`
**Purpose**: Navigation header with logo and menu
**Usage**: Automatically included in the base layout
**Customization**: Update navigation links and logo text

#### `footer.njk`
**Location**: `src/_includes/footer.njk`
**Purpose**: Site footer with copyright and social links
**Usage**: Automatically included in the base layout
**Customization**: Update social media links in `src/_data/site.js`

#### `head.njk`
**Location**: `src/_includes/head.njk`
**Purpose**: Meta tags, Open Graph, and SEO elements
**Usage**: Automatically included in the base layout
**Customization**: Update meta information in `src/_data/site.js`

### Utility Components

#### `button.njk`
**Location**: `src/_includes/button.njk`
**Purpose**: Reusable button component with consistent styling
**Usage**: 
```njk
{% include "button.njk" with { 
  href: "/about", 
  text: "Learn More", 
  type: "primary",
  classes: "custom-class"
} %}
```

**Parameters**:
- `href` (optional): URL for link buttons
- `text`: Button text content
- `type`: Button style (`primary`, `secondary`)
- `classes` (optional): Additional CSS classes
- `target` (optional): Link target attribute
- `rel` (optional): Link rel attribute
- `buttonType` (optional): Button type for form buttons

#### `post-card.njk`
**Location**: `src/_includes/post-card.njk`
**Purpose**: Consistent blog post card display
**Usage**: Currently used as a reference for consistent styling

## 🔧 How to Use Components

### Including Components
```njk
{% include "component-name.njk" %}
```

### Passing Data to Components
For simple components, you can pass data using Nunjucks variables:
```njk
{% set buttonText = "Click Me" %}
{% include "button.njk" %}
```

### Component Nesting
Components can include other components:
```njk
<!-- In a layout -->
{% include "nav.njk" %}
<main>
  {% include "content.njk" %}
</main>
{% include "footer.njk" %}
```

## 📁 File Structure

```
src/
├── _includes/           # Reusable components
│   ├── nav.njk         # Navigation component
│   ├── footer.njk      # Footer component
│   ├── head.njk        # Head meta component
│   ├── button.njk      # Button component
│   └── post-card.njk   # Post card component
├── _layouts/            # Page layouts
│   ├── base.njk        # Base layout (uses components)
│   └── blog.njk        # Blog-specific layout
├── _data/              # Data files
│   ├── site.js         # Site configuration
│   ├── posts.js        # Blog posts data
│   └── github.js       # GitHub integration config
└── index.njk           # Homepage
```

## 🎨 Benefits of This Architecture

### ✅ **DRY Principle**
- No more duplicated navigation code
- Consistent styling across components
- Single source of truth for common elements

### ✅ **Easy Maintenance**
- Update navigation in one place
- Consistent button styling
- Centralized meta tag management

### ✅ **Reusability**
- Components can be used on any page
- Easy to create new pages with existing components
- Consistent user experience

### ✅ **Scalability**
- Easy to add new components
- Simple to modify existing components
- Clear separation of concerns

## 🚀 Adding New Components

### 1. Create the Component File
```njk
<!-- src/_includes/new-component.njk -->
<div class="new-component">
  <h3>{{ title }}</h3>
  <p>{{ description }}</p>
</div>
```

### 2. Use the Component
```njk
{% include "new-component.njk" %}
```

### 3. Pass Data (if needed)
```njk
{% set title = "My Title" %}
{% set description = "My Description" %}
{% include "new-component.njk" %}
```

## 🔍 Best Practices

### Component Design
- Keep components focused and single-purpose
- Use descriptive names for components
- Include proper documentation in component files

### Data Management
- Use data files for configuration
- Pass data through Nunjucks variables
- Keep components flexible with fallback values

### Styling
- Use CSS classes for component styling
- Maintain consistent naming conventions
- Keep components responsive by default

## 📝 Example: Creating a Hero Section Component

### 1. Create the Component
```njk
<!-- src/_includes/hero.njk -->
<section class="hero">
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <div class="hero-actions">
      {% for button in buttons %}
        <a href="{{ button.href }}" class="btn btn-{{ button.type }}">
          {{ button.text }}
        </a>
      {% endfor %}
    </div>
  </div>
</section>
```

### 2. Use the Component
```njk
{% set title = "Welcome to My Portfolio" %}
{% set subtitle = "Developer & Designer" %}
{% set buttons = [
  { href: "/#about", text: "Learn More", type: "primary" },
  { href: "/blog", text: "Read Blog", type: "secondary" }
] %}
{% include "hero.njk" %}
```

## 🎯 Next Steps

1. **Customize existing components** to match your design
2. **Create new components** for specific sections
3. **Organize components** by functionality
4. **Document component usage** for your team

---

This component architecture makes your portfolio site more maintainable, scalable, and professional! 🎉
