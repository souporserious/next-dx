import * as glob from 'fast-glob'
import * as path from 'path'

export default async function init(options) {
  await Promise.all(
    options.files.map(async (file) => {
      return await file.resolve(await glob(path.join(process.cwd(), file.path)))
    })
  )
}
