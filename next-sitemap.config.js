// next-sitemap.config.js
module.exports = {
    siteUrl: "https://menoob.in/",
    generateRobotsTxt: true,
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
        "/admin/*",
        "/admin",
        "/api/*",
        "/api",
        "/checkout/*",
        "/checkout",
    ],
  };
  