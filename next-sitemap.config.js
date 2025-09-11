module.exports = {
  siteUrl: process.env.SITE_URL,         
  generateRobotsTxt: true,
  exclude: ['/api/*','/_next/*','/admin'],
  additionalPaths: async (config) => ([
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/services', changefreq: 'monthly' },
    { loc: '/about', changefreq: 'yearly' },
    { loc: '/contact', changefreq: 'yearly' },
  ]),
}
