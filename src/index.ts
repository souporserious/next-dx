import init from './init'

type PluginOptions = {
  files: {
    name: string
    path: string
    resolve: (filePaths: any[]) => Promise<any>
  }[]
}

export = function plugin(options: PluginOptions): (config) => any {
  init(options)
  return function withConfig(nextConfig = {}) {
    return {
      ...nextConfig,
    }
  }
}
