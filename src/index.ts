type PluginOptions = {
  files: []
}

function plugin(options: PluginOptions): (config) => any {
  return function withConfig(nextConfig = {}) {
    return {
      ...nextConfig,
      exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        console.log(defaultPathMap)
        return defaultPathMap
        // return {
        //   '/': { page: '/' },
        //   '/about': { page: '/about' },
        //   '/p/hello-nextjs': {
        //     page: '/post',
        //     query: { title: 'hello-nextjs' },
        //   },
        //   '/p/learn-nextjs': {
        //     page: '/post',
        //     query: { title: 'learn-nextjs' },
        //   },
        //   '/p/deploy-nextjs': {
        //     page: '/post',
        //     query: { title: 'deploy-nextjs' },
        //   },
        // }
      },
    }
  }
}

export = plugin
