module.exports = {
  // GitHub API configuration
  username: "yourusername",
  repository: "your-blog-repo",
  branch: "main",
  
  // GitHub API settings
  apiUrl: "https://api.github.com",
  rawContentUrl: "https://raw.githubusercontent.com",
  
  // Content paths
  postsPath: "posts",
  imagesPath: "images",
  
  // GitHub token (set via environment variable)
  token: process.env.GITHUB_TOKEN || "",
  
  // Rate limiting
  rateLimit: {
    requestsPerHour: 5000,
    requestsPerDay: 50000
  },
  
  // Content types to fetch
  contentTypes: ["md", "markdown", "txt"],
  
  // Exclude patterns
  excludePatterns: [
    "node_modules",
    ".git",
    "README.md",
    "LICENSE"
  ]
};
