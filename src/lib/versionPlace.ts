import * as rt from 'runtypes'

export const VersionPlace = rt.Record({
  file: rt.String,
  keyPath: rt.String
})
export type VersionPlace = rt.Static<typeof VersionPlace>

export type VersionPlaceWithCurrent = VersionPlace & {
  currentVersion: string | number
}
export type VersionPlaceWithCurrentAndNext = VersionPlaceWithCurrent & {
  nextVersion: string | number | null
}
