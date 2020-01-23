#!/usr/bin/env node

import fs from 'fs'
import * as rt from 'runtypes'
import { get } from 'lodash'
import React, { useState, FunctionComponent } from 'react'
import { render, Color, Box } from 'ink'
import yn from 'yn'

import TextInput from './components/TextInput'
import FormatVersionInfo from './components/FormatVersionInfo'
import saveChanges from './lib/saveChanges'
import loadConfig from './lib/loadConfig'
import {
  VersionPlaceWithCurrent,
  VersionPlaceWithCurrentAndNext
} from './lib/versionPlace'
import preserveVersionFormat from './lib/preserveVersionFormat'

const NumberOrString = rt.Union(rt.Number, rt.String)
const config = loadConfig()

const versions: VersionPlaceWithCurrent[] = config.versions.map(version => {
  const parsedFile = JSON.parse(fs.readFileSync(version.file, 'utf-8'))

  const currentVersion = NumberOrString.check(get(parsedFile, version.keyPath))

  return {
    file: version.file,
    keyPath: version.keyPath,
    currentVersion
  }
})

type Versions = {
  done: VersionPlaceWithCurrentAndNext[]
  next: VersionPlaceWithCurrent[]
}

const App: FunctionComponent<{
  versions: VersionPlaceWithCurrent[]
}> = function App(props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputVersions, setInputVersions] = useState<
    (string | number | null)[]
  >([])
  const [input, setInput] = useState('')
  const [commitMessage, setCommitMessage] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [isOkay, setIsOkay] = useState()
  const [inputError, setInputError] = useState()

  const versions: Versions = {
    done: props.versions.slice(0, currentIndex).map((version, index) => ({
      ...version,
      nextVersion: inputVersions[index]
    })),
    next: props.versions.slice(currentIndex)
  }

  const current = versions.next[0]

  function handleInput(input: string) {
    setInput(input)

    setInputError(null)
    if (input.length > 0) {
      try {
        preserveVersionFormat(current, input)
      } catch (error) {
        setInputError(error.message)
      }
    }
  }

  function handleSubmit() {
    try {
      const optionalInput =
        input.length > 0 ? preserveVersionFormat(current, input) : null
      setInputVersions([...inputVersions, optionalInput])
      setInput('')

      setCurrentIndex(currentIndex + 1)
      setInputError(null)
    } catch (error) {
      setInputError(error.message)
    }
  }

  function handleYesNo(yesNo: string) {
    const shouldSaveChanges = yn(yesNo, { default: true })
    setIsOkay(shouldSaveChanges)

    if (shouldSaveChanges) {
      saveChanges(versions.done)
    }

    setIsDone(true)
  }

  return (
    <Box flexDirection="column">
      {versions.done.map(version => (
        <Box key={version.file + version.keyPath}>
          <FormatVersionInfo version={version} />
        </Box>
      ))}

      {current && (
        <TextInput
          label={<FormatVersionInfo version={current} pending />}
          value={input}
          onChange={handleInput}
          onSubmit={handleSubmit}
        />
      )}

      {inputError && <Color yellow>{inputError}</Color>}

      {!current && !isDone && (
        <TextInput
          label={
            <>
              Is this okay? (<Color green>Y</Color>/<Color red>n</Color>)
            </>
          }
          value={commitMessage}
          onChange={setCommitMessage}
          onSubmit={handleYesNo}
        />
      )}

      {isDone && (
        <Box>
          {isOkay ? (
            <Color green>Done 🚀</Color>
          ) : (
            <Color red>Cancelled. No versions were changed.</Color>
          )}
        </Box>
      )}
    </Box>
  )
}

render(<App versions={versions} />)
