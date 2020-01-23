import { isNumber, isInteger, isString } from 'lodash'
import { VersionPlaceWithCurrent } from './versionPlace'

export default function preserveVersionFormat(
  version: VersionPlaceWithCurrent,
  nextVersion: string
): number | string {
  const { currentVersion } = version
  if (!nextVersion) throw Error()

  if (isString(currentVersion)) {
    return nextVersion
  }

  if (isInteger(currentVersion)) {
    if (nextVersion === String(parseInt(nextVersion, 10))) {
      return parseInt(nextVersion)
    }

    throw new Error(
      `${version.file} ▸ ${version.keyPath}: The current version is an integer, but your input could not be cast to an integer. If you're sure that you want to use the entered version, change the type in the JSON to a string and rerun this script.`
    )
  } else if (isNumber(currentVersion)) {
    if (nextVersion === String(Number(nextVersion))) {
      return Number(nextVersion)
    }
  }

  throw new Error(
    `${version.file} ${
      version.keyPath
    }: The current version and the entered new version are incompatible. The current version is a ${typeof version.currentVersion}, but the new version could not be cast to it.`
  )
}
