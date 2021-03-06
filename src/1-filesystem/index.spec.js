const fs = require('fs')
jest.mock('fs')

const emojiAdd = require('./')

describe('emojiAdd', () => {
  it('appends emoji to end of file', () => {
    const filePath = '/path/to/index.js'
    const emoji = '🐉'

    const output = emojiAdd({filePath, emoji})

    expect(output).toBe('ok')
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath)
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/path/to/index-emoji.js',
      'This is the file\n🐉'
    )
  })
})
