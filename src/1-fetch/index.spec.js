const fetchMock = require('fetch-mock')
const fetchPosts = require('./')

describe('Fetch posts', () => {
  it('is a function', () => {
    expect(fetchPosts).toBeInstanceOf(Function)
  })

  describe('API up', () => {
    beforeEach(() => {
      fetchMock.mock(
        /https:\/\/gateway.reddit.com\/*/,
        {
          posts: [1,2,3] ,
          page: 1,
        }
      )
    })

    afterEach(() => {
      fetchMock.restore()
    })

    it('returns proper output', async () => {
      const posts = await fetchPosts()
      // expect(posts).toBe({
      expect(posts).toEqual({
        posts: [1,2,3] ,
        page: 1,
      })
    })
  })

  describe('API down', () => {
    beforeEach(() => {
      fetchMock.mock(
        /https:\/\/gateway.reddit.com\/*/,
        {
          status: 500,
          throws: 'internal server error'
        }
      )
    })

    afterEach(() => {
      fetchMock.restore()
    })

    xit('returns output', async () => {
      let err

      try {
        await fetchPosts()
      } catch (e) {
        err = e
      }

      expect(err).toBe('internal server error')
    })
  })
})
