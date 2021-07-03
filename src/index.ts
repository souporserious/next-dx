type PluginOptions = {
  files: []
}

function plugin(options: PluginOptions): (config) => any {
  return function withConfig(nextConfig = {}) {
    return nextConfig
  }
}

export = plugin
