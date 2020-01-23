const fs = jest.genMockFromModule('fs')

fs.readFileSync = jest.fn((...args) => {
  return '{ "example": 1 }'
})

fs.writeFileSync = jest.fn((...args) => {})

export default fs
