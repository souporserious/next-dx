import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <h1>Hello Index</h1>
      <h2>Components</h2>
      <Link href="components/button">
        <a>Button</a>
      </Link>
      <Link href="components/text">
        <a>Text</a>
      </Link>
      <Link href="components/stack">
        <a>Stack</a>
      </Link>
      <h2>Releases</h2>
      <Link href="releases/1.0.0">
        <a>Version 1.0.0</a>
      </Link>
      <Link href="releases/1.0.0-beta.1">
        <a>Version 1.0.0-beta.1</a>
      </Link>
      <h2>Guides</h2>
      <Link href="guides/using-the-system-effectively">
        <a>Using the system effectively</a>
      </Link>
    </div>
  )
}
