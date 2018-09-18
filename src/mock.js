// https://github.com/mjackson/expect/blob/master/modules/SpyUtils.js#L23
const generateMock = fn => {
  function mock () {
    mock.calls.push({
      arguments: Array.prototype.slice.call(arguments, 0)
    })

    return fn.apply(null, arguments)
  }

  mock.calls = []

  mock.reset = () => {
   mock.calls = []
  }

  return mock
}

// Function to be mocked
const add = (...args) => args.reduce((a, b) => a + b)

// Create mocked version
const mockedAdd = generateMock(add)

const mockSum = mockedAdd(1,2,3,4)
const mockSum1 = mockedAdd(1,2)
const mockSum2 = mockedAdd(3,4)

console.log('First: ', mockSum)
console.log('Second: ', mockSum1)
console.log('Third: ', mockSum2)

console.log('\nMeta\n')
console.log('Called with: \n', mockedAdd.calls, '\n')
console.log(`Called ${mockedAdd.calls.length} times\n`)

console.log('\nResetting mock\n')
mockedAdd.reset()
console.log('Called with: ', mockedAdd.calls)
console.log(`Called ${mockedAdd.calls.length} times\n`)
