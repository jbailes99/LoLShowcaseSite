const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
require('dotenv').config() // Load environment variables from .env file

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

const apiKey = process.env.API_KEY // Use environment variable

app.get('/api/account/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params

  try {
    const response = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: `Failed to fetch account details` })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.get('/api/matches/:puuid', async (req, res) => {
  const { puuid } = req.params
  try {
    const response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch match IDs' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})
app.get('/api/account/id/:puuid', async (req, res) => {
  const { puuid } = req.params
  try {
    const response = await fetch(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch accountId' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.get('/api/match/:matchId', async (req, res) => {
  const { matchId } = req.params
  try {
    const response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}
      `
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch match' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.get('/api/league/:summonerId', async (req, res) => {
  const { summonerId } = req.params
  try {
    const response = await fetch(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}

      `
    )
    if (response.ok) {
      const data = await response.json()
      res.json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch league stats' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
