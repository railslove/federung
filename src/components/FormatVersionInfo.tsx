import React, { FunctionComponent } from 'react'
import { Color } from 'ink'

import {
  VersionPlaceWithCurrent,
  VersionPlaceWithCurrentAndNext
} from '../lib/versionPlace'

const FormatVersionInfo: FunctionComponent<
  | {
      version: VersionPlaceWithCurrentAndNext
      pending?: false
    }
  | {
      version: VersionPlaceWithCurrent
      pending: true
    }
> = function FormatVersionInfo({ version, pending }) {
  if (pending) {
    return (
      <>
        {version.file} ▸ {version.keyPath}, currently at{' '}
        <Color green>{JSON.stringify(version.currentVersion)}</Color>
      </>
    )
  }

  if ('nextVersion' in version && version.nextVersion) {
    return (
      <>
        {version.file} ▸ {version.keyPath}, will change{'  '}
        <Color yellow>{JSON.stringify(version.currentVersion)}</Color>
        {' ▸ '}
        <Color green>{JSON.stringify(version.nextVersion)}</Color>
      </>
    )
  }

  return (
    <>
      {version.file} ▸ {version.keyPath}, will stay at{' '}
      <Color gray>{JSON.stringify(version.currentVersion)}</Color>
    </>
  )
}

export default FormatVersionInfo
