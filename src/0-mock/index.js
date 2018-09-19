// https://github.com/mjackson/expect/blob/master/modules/SpyUtils.js#L23
const generateMock = fn => {
  function mock (...args) {
    mock.calls.push({
      args,
    })
    return fn.apply(null, args)
  }

  mock.calls = []

  mock.andReturn = val => {
    fn = val
    return mock
  }

  mock.reset = () => {
   mock.calls = []
  }

  return mock
}

module.exports = generateMock
