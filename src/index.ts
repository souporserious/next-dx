import { createSyncFn } from 'synckit'

const syncFn = createSyncFn(require.resolve('./worker'))

type PluginOptions = {
  files: {
    name: string
    title: string
    path: string
  }[]
}

function plugin(options: PluginOptions): (config) => any {
  const files = syncFn(options)
  console.log({
    options,
    files,
  })
  return function withConfig(nextConfig = {}) {
    return {
      ...nextConfig,
    }
  }
}

export = plugin
