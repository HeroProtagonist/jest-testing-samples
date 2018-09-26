const { exec } = require('shelljs')
const fetchMock = require('fetch-mock')

const app = require('./')

describe('app', () => {
  let server
  beforeEach(() => {
    server = app.listen('4000')

    fetchMock.mock(
      /https:\/\/opentdb.com\/*/,
      {
        data: {
          questions: [1,2,3,4]
        },
      }
    )
  })

  afterEach(() => {
    server.close()
    fetchMock.restore()
  })

  describe('/', () => {
    it('response as expected', done => {
      const response = exec('curl http://localhost:4000', (code, stdout, stderr) => {
        expect(stdout).toBe('Welcome Home')
        done()
      })
    })
  })

  describe('/trivia', () => {
    it('does not call api when invalid amount is supplied', done => {
      const response = exec('curl http://localhost:4000/trivia/wat', (code, stdout, stderr) => {
        expect(stdout).toBe('Invalid amount - please enter a number')
        done()
      })
    })

    it('responds as expected', done => {
      const response = exec('curl http://localhost:4000/trivia/1', (code, stdout, stderr) => {
        expect(stdout).toBe(JSON.stringify({
          data: {
            questions: [1,2,3,4]
          },
        }))
        done()
      })
    })

    it('responds when remote api is down', done => {
      fetchMock.restore()
      fetchMock.mock(
        /https:\/\/opentdb.com\/*/,
        {
          status: 500,
          throws: 'internal server error'
        }
      )

      const response = exec('curl http://localhost:4000/trivia/1', (code, stdout, stderr) => {
        expect(stdout).toBe('internal server error')
        done()
      })
    })
  })
})
