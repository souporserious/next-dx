const { promises } = require('fs')
const { bundleMDX } = require('mdx-bundler')
const { parse } = require('react-docgen-typescript')
const propFilter = (prop) => {
  if (prop.declarations !== undefined && prop.declarations.length > 0) {
    const hasPropAdditionalDescription = prop.declarations.some(
      (declaration) => !declaration.fileName.includes('node_modules')
    )
    return hasPropAdditionalDescription
  }
  return true
}

const withNextDX = require('next-dx')({
  files: [
    {
      name: 'component-docs',
      path: '/components/**/*.mdx',
      async resolve(filePaths) {
        const docs = await Promise.all(
          filePaths.map(async (filePath) => {
            const mdxSource = await promises.readFile(filePath, 'utf-8')
            const result = await bundleMDX(mdxSource)
            return result.code
          })
        )
        console.log(docs)
      },
    },
    {
      name: 'component-types',
      path: '/components/**/*.tsx',
      async resolve(filePaths) {
        const types = parse(filePaths, { propFilter })
        console.log(types)
      },
    },
    // {
    //   name: 'components',
    //   inherits: ['component-types', 'component-docs'],
    //   async resolve(data) {
    //     console.log(data)
    //   },
    // },
  ],
})

const nextConfig = {}

module.exports = withNextDX(nextConfig)
