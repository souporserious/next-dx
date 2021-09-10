import { runAsWorker } from 'synckit'

/**
 * Run the program in another file so errors don't get swallowed:
 * https://github.com/rx-ts/synckit/issues/44#issuecomment-907677782
 */
runAsWorker(async (options) => await (await import('./init')).default(options))
