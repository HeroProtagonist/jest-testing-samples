const generateMock = require('./')

// Function to be mocked
const add = (...args) => args.reduce((a, b) => a + b)

// Create mocked version (spy)
let mockedAdd = generateMock(add)

let mockSum = mockedAdd(1,2,3,4)
let mockSum1 = mockedAdd(1,2)
let mockSum2 = mockedAdd(3,4)

console.log('First: ', mockSum)
console.log('Second: ', mockSum1)
console.log('Third: ', mockSum2)

console.log('\nMeta:\n')
console.log('Called with: \n', mockedAdd.calls, '\n')
console.log(`Called ${mockedAdd.calls.length} times\n`)

console.log('\nResetting mock:\n')
mockedAdd.reset()

console.log('Called with: ', mockedAdd.calls)
console.log(`Called ${mockedAdd.calls.length} times\n`)

// Create mocked version (hijacked)
mockedAdd = generateMock(add).andReturn(() => 8)

mockSum = mockedAdd(1,2,3,4)
mockSum1 = mockedAdd(1,2)
mockSum2 = mockedAdd(3,4)

console.log('First: ', mockSum)
console.log('Second: ', mockSum1)
console.log('Third: ', mockSum2)
