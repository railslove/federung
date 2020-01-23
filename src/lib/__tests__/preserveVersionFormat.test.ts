import preserveVersionFormat from '../preserveVersionFormat'

describe('preserveVersionFormat', () => {
  it('keeps as a string if the currentVersion is a string', () => {
    const result = preserveVersionFormat(
      {
        currentVersion: '1',
        file: 'fileName',
        keyPath: 'keyPath'
      },
      '2'
    )

    expect(result).toBe('2')
  })

  it('casts the nextVersion to a float if currentVersion is a float', () => {
    const result = preserveVersionFormat(
      {
        currentVersion: 1.1,
        file: 'fileName',
        keyPath: 'keyPath'
      },
      '2.2'
    )

    expect(result).toBe(2.2)
  })

  it('casts the nextVersion to an integer if currentVersion is an integer', () => {
    const result = preserveVersionFormat(
      {
        currentVersion: 1,
        file: 'fileName',
        keyPath: 'keyPath'
      },
      '2'
    )

    expect(result).toBe(2)
  })

  it('throws an error if the types are not compatible', () => {
    expect(() => {
      preserveVersionFormat(
        {
          currentVersion: 1,
          file: 'fileName',
          keyPath: 'keyPath'
        },
        '2.1'
      )
    }).toThrow()
  })
})
