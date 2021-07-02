# next-dx

Enhance NextJS development with utilities for local and remote content.

## Features

♻️ Fast Refresh Remote Data

🗺 Generate Page Map

↔️ Navigation Links

📝 Normalize MDX Authoring

🧩 Extract TypeScript Types

## Usage

```js
const withNextDX = require('next-dx')({
  remarkPlugins: [], // runs on internal/external data md/mdx sources
  // watches and fast refreshes changed files
  // exposes meta information to utility functions
  files: [
    {
      name: 'components',
      entry: '../packages/package/components',
      exclude: '**/tests',
    },
    {
      name: 'hooks',
      entry: '../packages/package/hooks',
      exclude: '**/stories',
    },
  ],
})

module.exports = withNextDX({
  pageExtensions: ['.ts', '.tsx', '.mdx'],
})
```

```tsx
import { getPages, getRoutes, getTypes } from 'next-dx'

function ComponentDoc({ pages, components, types, MDX }) {
  return <MDX />
}

export async function getStaticProps() {
  const { activeRoute, previousRoute, nextRoute } = getRoutes('components') // get top-level and sub routes
  const pages = await getPages() // get meta about all inernal and external pages
  const components = await getPages('components', 'slug') // get specific pages
  const types = await getTypes(components) // get TypeScript type information
  return {
    pages,
    components,
    types,
  }
}
```

## ♻️ Fast Refresh Remote Data

In your [app file](https://nextjs.org/docs/advanced-features/custom-app) add the included hook to enable Fast Refresh for remote data:

```tsx
import { useRemoteRefresh } from 'next-dx'

export default function App({ Component, pageProps }) {
  useRemoteRefresh()
  return <Component {...pageProps} />
}
```

## 🗺 Generate Page Map

Generate a map of all pages used throughout your app:

```js
import { getPages } from 'next-dx'

export default function Index() {
  return <div>{flatMapPages(pages)}</div>
}

export function getStaticProps() {
  const pages = getPages()
  return {
    props: pages,
  }
}
```

Target specific pages:

```js
const pages = getPages()
```

As well as static remote sources:

```js
const pages = getPages('components/Avatar')
```

Optionally pass additional options to ignore:

```js
const pages = getPages('components/Avatar', { ignore: 'tests' })
```

## 📝 Normalize MDX authoring

Use the same components and plugins for your MDX content:

```js
const withNextDX = require('next-dx')({
  files: [
    {
      name: 'componentDocs',
      entry: '../packages/package/components/**/*.mdx',
    },
  ],
  remarkPlugins: [require('remark-gfm')],
})

module.exports = withNextDX({
  pageExtensions: ['.mdx'],
})
```

## ↔️ Navigation Links

Generate links for specific pages:

```js
import { getRoutes } from 'next-dx'
import Link from 'next/link'

export default function Index({ posts, routes }) {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={post.slug}>
          <a>{post.title}</a>
        </Link>
      ))}
      <Link href={routes.previous.slug}>
        <a>{routes.previous.name}</a>
      </Link>
      <Link href={routes.next.slug}>
        <a>{routes.next.name}</a>
      </Link>
    </div>
  )
}

export function getStaticProps() {
  const posts = getPages('posts', ['title', 'slug'])
  const routes = getRoutes(posts)
  return {
    props: {
      posts,
      routes,
    },
  }
}
```

And then easily navigate between them on individual pages:

```js
import { getRoutes } from 'next-dx'
import Link from 'next/link'

export default function Index({ posts, routes }) {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={post.slug}>
          <a>{post.title}</a>
        </Link>
      ))}
      <Link href={routes.previous.slug}>
        <a>{routes.previous.name}</a>
      </Link>
      <Link href={routes.next.slug}>
        <a>{routes.next.name}</a>
      </Link>
    </div>
  )
}

export function getStaticProps() {
  const posts = getPages('posts', ['title', 'slug'])
  const routes = getRoutes(posts)
  return {
    props: {
      posts,
      routes,
    },
  }
}
```

## 🧩 Extract TypeScript Types

There is a helper `getTypes` utility that utilizes [ts-morph](https://github.com/dsherret/ts-morph) that can be used to extract type information:

```js
import { getTypes, getPages, getPage, getPathFromSlug } from 'next-dx'

export default function ComponentDoc({ page, types }) {
  return (
    <div>
      <h1>{page.name}</h1>
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Default Value</td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(types).map(([name, type], index) => {
            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{type.description}</td>
                <td>{type.defaultValue?.value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export const getStaticPaths = async () => {
  const pages = await getPages('components')
  return {
    paths: pages.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const page = await getPage('components', params.slug)
  const types = await getTypes(getPathFromSlug(params.slug))
  return {
    props: {
      page,
      types,
    },
  }
}
```
