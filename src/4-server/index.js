require('isomorphic-fetch')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome Home')
})

app.get('/trivia/:amount', async (req, res) => {
  const { amount } = req.params

  if (!amount || isNaN(+amount)) {
    return res.send('Invalid amount - please enter a number')
  }

  let data
  let json

  try {
    data = await fetch(`https://opentdb.com/api.php?amount=${amount}`)
    json = await data.json()
  } catch (e) {
    return res.send(e)
  }

  return res.send(json)
})

module.exports = app
