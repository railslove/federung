import React, { FunctionComponent } from 'react'
import { Text } from 'ink'

import {
  VersionPlaceWithCurrent,
  VersionPlaceWithCurrentAndNext,
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
      <Text>
        {version.file} ▸ {version.keyPath}, currently at{' '}
        <Text color="green">{JSON.stringify(version.currentVersion)}</Text>
      </Text>
    )
  }

  if ('nextVersion' in version && version.nextVersion) {
    return (
      <Text>
        {version.file} ▸ {version.keyPath}, will change{'  '}
        <Text color="yellow">{JSON.stringify(version.currentVersion)}</Text>
        {' ▸ '}
        <Text color="green">{JSON.stringify(version.nextVersion)}</Text>
      </Text>
    )
  }

  return (
    <Text>
      {version.file} ▸ {version.keyPath}, will stay at{' '}
      <Text color="gray">{JSON.stringify(version.currentVersion)}</Text>
    </Text>
  )
}

export default FormatVersionInfo
