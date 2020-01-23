import fs from 'fs'
import { set, isNumber, isInteger, isString } from 'lodash'
import { VersionPlaceWithCurrentAndNext } from './versionPlace'

export default function saveChanges(
  versions: VersionPlaceWithCurrentAndNext[]
) {
  versions.forEach(version => {
    if (!version.nextVersion) return

    const json = JSON.parse(fs.readFileSync(version.file, 'utf-8'))

    set(json, version.keyPath, version.nextVersion)
    fs.writeFileSync(version.file, JSON.stringify(json, null, 2), 'utf-8')
  })
}
