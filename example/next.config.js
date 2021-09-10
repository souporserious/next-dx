const withNextDX = require('next-dx')({
  files: [
    {
      name: 'components',
      title: 'Components',
      path: '/components/**/*.mdx',
    },
  ],
})

const nextConfig = {}

module.exports = withNextDX(nextConfig)
