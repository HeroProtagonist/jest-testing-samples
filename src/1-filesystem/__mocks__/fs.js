const fs = jest.genMockFromModule('fs')

const _readFileSync = jest.fn(() => 'This is the file')
const _writeFileSync = jest.fn((filePath, contents) => 'ok')

fs.readFileSync = _readFileSync
fs.writeFileSync = _writeFileSync

module.exports = fs
