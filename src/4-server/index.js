require('isomorphic-fetch')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome home')
})

app.get('/trivia/:amount', async (req, res) => {
  const { amount } = req.params

  if (!amount || isNaN(+amount)) {
    return res.send('Invalid amount - please enter a number')
  }

  const data = await fetch(`https://opentdb.com/api.php?amount=${amount}`)
  const json = await data.json()

  return res.send(json)
})

module.exports = app
