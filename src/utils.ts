const pageMap = {
  components: [
    { name: 'button', slug: 'components/button' },
    { name: 'stack', slug: 'components/stack' },
    { name: 'text', slug: 'components/text' },
  ],
}

export function getPaths(name: string) {
  return pageMap[name].map((file) => ({
    params: {
      slug: file.name,
    },
  }))
}

export function getProps(name: string, params?: any) {
  const pages = pageMap[name]
  return params
    ? pages.find((page) => page.name === params.slug)
    : { [name]: pages }
}
