import { cosmiconfigSync } from 'cosmiconfig'
import * as rt from 'runtypes'

import { VersionPlace } from './versionPlace'

const FederungConfig = rt.Record({
  versions: rt.Array(VersionPlace)
})
type FederungConfig = rt.Static<typeof FederungConfig>

export default function loadConfig(): FederungConfig {
  const explorerSync = cosmiconfigSync('federung')
  const searchedFor = explorerSync.search()

  if (!searchedFor) {
    console.error('Error: Can not find any configuration.')
    process.exit(1)
  }

  try {
    return FederungConfig.check(searchedFor.config)
  } catch (error) {
    console.error(`Error: Configuration is in the wrong format.`)
    process.exit(1)
  }
}
