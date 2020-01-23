import saveChanges from '../saveChanges'
import fs from 'fs'

jest.mock('fs')

describe('saveChanges', () => {
  it('changes the value but tries to preserve the type', () => {
    saveChanges([
      {
        file: 'example.json',
        keyPath: 'example',
        currentVersion: 1,
        nextVersion: 2
      }
    ])

    //@ts-ignore
    expect(fs.writeFileSync.mock.calls).toEqual([
      ['example.json', '{\n  "example": 2\n}', 'utf-8']
    ])
  })
})
