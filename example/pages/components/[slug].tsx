import { getProps, getPaths } from 'next-dx/dist/utils'

export default function Component(props) {
  return `Hello ${props.name} at ${props.slug}`
}

export const getStaticPaths = async () => {
  const paths = getPaths('components')
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: getProps('components', params),
  }
}
