// Main JavaScript file for portfolio functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Blog search and filtering functionality
    const searchInput = document.getElementById('search-input');
    const postsGrid = document.getElementById('posts-grid');
    const tagFilters = document.getElementById('tag-filters');
    
    if (searchInput && postsGrid) {
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterPosts(searchTerm, getActiveTags());
        });

        // Tag filtering
        setupTagFilters();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.post-card, .skill-category, .stat').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    addAnimationStyles();
});

// Blog filtering functions
function setupTagFilters() {
    const posts = document.querySelectorAll('.post-card');
    const allTags = new Set();
    
    // Collect all unique tags
    posts.forEach(post => {
        const tags = post.dataset.tags ? post.dataset.tags.split(' ') : [];
        tags.forEach(tag => allTags.add(tag));
    });
    
    // Create tag filter buttons
    const tagFilters = document.getElementById('tag-filters');
    if (tagFilters) {
        allTags.forEach(tag => {
            const tagButton = document.createElement('button');
            tagButton.className = 'tag-filter-btn';
            tagButton.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
            tagButton.dataset.tag = tag;
            tagButton.addEventListener('click', function() {
                this.classList.toggle('active');
                const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
                filterPosts(searchTerm, getActiveTags());
            });
            tagFilters.appendChild(tagButton);
        });
    }
}

function getActiveTags() {
    const activeTags = [];
    document.querySelectorAll('.tag-filter-btn.active').forEach(btn => {
        activeTags.push(btn.dataset.tag);
    });
    return activeTags;
}

function filterPosts(searchTerm, activeTags) {
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        const title = post.querySelector('.post-card-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-card-excerpt').textContent.toLowerCase();
        const tags = post.dataset.tags ? post.dataset.tags.split(' ') : [];
        
        const matchesSearch = !searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm);
        const matchesTags = activeTags.length === 0 || activeTags.some(tag => tags.includes(tag));
        
        if (matchesSearch && matchesTags) {
            post.style.display = 'block';
            post.classList.add('animate-in');
        } else {
            post.style.display = 'none';
            post.classList.remove('animate-in');
        }
    });
}

// Animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .post-card, .skill-category, .stat {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .post-card.animate-in, .skill-category.animate-in, .stat.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .tag-filter-btn {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            transition: var(--transition);
            margin: 0.25rem;
        }
        
        .tag-filter-btn:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .tag-filter-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            border-top: 1px solid var(--border-color);
            padding: 1rem;
            box-shadow: var(--shadow-md);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
}

// GitHub integration for blog posts (placeholder for future implementation)
async function fetchGitHubPosts() {
    // This function can be implemented to fetch blog posts from GitHub
    // For now, it's a placeholder for future development
    console.log('GitHub integration ready for implementation');
}

// Export functions for potential external use
window.portfolioApp = {
    filterPosts,
    setupTagFilters,
    fetchGitHubPosts
};
