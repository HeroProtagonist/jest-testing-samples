const {
  readFileSync,
  writeFileSync,
} = require('fs')

const emojiAdd = ({ filePath, emoji }) => {
  const contents = readFileSync(filePath)
  const [ name, ext ] = filePath.split('.')

  newContents = `${contents}\n${emoji}`
  writeFileSync(`${name}-emoji.${ext}`, newContents)
  return 'ok'
}

module.exports = emojiAdd
