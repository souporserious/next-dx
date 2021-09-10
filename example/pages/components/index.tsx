import Link from 'next/link'
import { getProps } from 'next-dx/dist/utils'

export default function Component(props) {
  return (
    <div>
      <h1>Components</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.components.map((component) => (
          <Link key={component.name} href={component.slug}>
            <a>{component.name}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: getProps('components'),
  }
}
