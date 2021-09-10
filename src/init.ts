import * as glob from 'fast-glob'
import * as path from 'path'

export default async function init(options) {
  return Promise.all(
    options.files.map(
      async (file) => await glob(path.join(process.cwd(), file.path))
    )
  )
}
