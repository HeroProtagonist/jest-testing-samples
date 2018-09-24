require('isomorphic-fetch')

const fetchPosts = async () => {
  const response = await fetch('https://gateway.reddit.com/desktopapi/v1/frontpage')
  const json = await response.json()
  return json
}

module.exports = fetchPosts
