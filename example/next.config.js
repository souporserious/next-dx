const withNextDX = require('next-dx')({
  files: [],
})

const nextConfig = {
  pageExtensions: ['mdx', 'tsx'],
}

module.exports = withNextDX(nextConfig)
