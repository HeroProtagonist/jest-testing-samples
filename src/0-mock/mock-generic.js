const generateMock = require('./')

const genericMock = generateMock(() => console.log('🐛'))

genericMock()
genericMock()

console.log(`Called ${genericMock.calls.length} times\n`)
