import React, { createContext, useState, useEffect } from 'react'

export const MatchDataContext = createContext()

export const MatchDataProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [accountId, setAccountId] = useState(null)
  const [accountRank, setAccountRank] = useState({}) // Initialize as an empty object
  const [matches, setMatches] = useState([])
  const [averageKDA, setAverageKDA] = useState(0)
  const [totalAssistPings, setTotalAssistPings] = useState(0)
  const [totalAllInPings, setTotalAllInPings] = useState(0)

  const [lastDravenWin, setLastDravenWin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingProgressBar, setLoadingProgressBar] = useState(true)
  const [filtered, setFiltered] = useState(0)
  const [error, setError] = useState(null)
  const [error429, setError429] = useState(null)

  const [totalSkillshotsDodged, setTotalSkillShotsDodged] = useState(0)
  const [averageKillParticipation, setAverageKillParticipation] = useState(0) // New state for average KP

  //set game name, tagline, and target champion to track

  const GAME_NAME = 'DAGESTAN WARRIOR'
  const TAG_LINE = 'NA1'
  const TARGET_CHAMPION_NAME = 'Vayne'
  const region = 'na'

  //create .env and set to your port on backend (localhost:5000 or something) or backend hosting URI
  // like this " REACT_APP_BACKEND_SERVER_URI = http://localhost:5000" in .env file
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER_URI

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/account/${GAME_NAME}/${TAG_LINE}`)
        const data = await response.json()
        if (response.status === 429) {
          setError429(429) // Set the error to 429 for "Too Many Requests"
          console.log('ERROR:', error429)
        }
        setAccount(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAccountDetails()
  }, [])

  useEffect(() => {
    const fetchAccountId = async () => {
      if (account?.puuid) {
        try {
          const response = await fetch(`${backendUrl}/api/poop/id/${account.puuid}`)
          const data = await response.json()
          console.log('accpimt id', data)
          setAccountId(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchAccountId()
  }, [account])

  useEffect(() => {
    const fetchAccountRank = async () => {
      try {
        if (accountId?.id) {
          console.log('Fetching rank for accountId:', accountId.id)
          const response = await fetch(`${backendUrl}/api/league/${accountId.id}`)
          const data = await response.json()
          console.log('Rank data:', data)

          setAccountRank(data[0]) // Set the first rank data
          setLoadingProgressBar(false)
        }
      } catch (error) {
        console.error('Error fetching account rank:', error)
      }
    }

    fetchAccountRank() // Call the function here, outside its own definition
  }, [accountId]) // This effect now depends on `accountId`

  // Separate useEffect to log accountRank after it's been updated
  const filteredMatches = 0
  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (account?.puuid) {
        try {
          console.log('Fetching match history...')

          const matchResponse = await fetch(`${backendUrl}/api/matches/${account.puuid}`)
          const matchData = await matchResponse.json()

          console.log('Fetched match list:', matchData)

          const matchDetailsPromises = matchData.map(async matchId => {
            console.log(`Fetching details for match ID: ${matchId}`)
            const detailResponse = await fetch(`${backendUrl}/api/match/${matchId}`)
            return await detailResponse.json()
          })

          const matchesDetails = await Promise.all(matchDetailsPromises)

          console.log('Fetched match details:', matchesDetails)

          const filteredMatches = matchesDetails.filter(match =>
            match.info.participants.some(
              participant => participant.puuid === account.puuid && participant.championName === TARGET_CHAMPION_NAME
            )
          )

          setFiltered(filteredMatches)

          console.log('filtered matches for the champ:', filteredMatches)

          const sortedMatches = filteredMatches.sort((a, b) => b.info.gameStartTimestamp - a.info.gameStartTimestamp)
          const lastWin = sortedMatches.find(match => {
            const participant = match.info.participants.find(p => p.puuid === account.puuid)
            const team = match.info.teams.find(team => team.teamId === participant.teamId)
            return team?.win // Find the first match that was a win
          })

          // Calculate average K/D/A
          const totalStats = filteredMatches.reduce(
            (acc, match) => {
              const participant = match.info.participants.find(p => p.puuid === account.puuid)
              const team = match.info.teams.find(team => team.teamId === participant.teamId)

              if (participant) {
                acc.totalKills += participant.kills
                acc.totalDeaths += participant.deaths
                acc.totalAssists += participant.assists
                acc.totalKP += participant.challenges?.killParticipation || 0
                acc.totalAssistPings += participant.assistMePings
                acc.totalAllIn += participant.onMyWayPings

                // skillshot counter
                const skillShotsDodged = participant.challenges?.skillshotsDodged || 0
                acc.totalSkillShotsDodged += skillShotsDodged // Sum skillshotsDodged

                acc.matchCount += 1
              }
              return acc
            },
            {
              totalKills: 0,
              totalDeaths: 0,
              totalAssists: 0,
              totalSkillShotsDodged: 0, // Initialize this to 0
              totalKP: 0,
              totalAllIn: 0,
              totalAssistPings: 0,
              matchCount: 0,
            }
          )

          const avgKDA =
            totalStats.matchCount > 0 ? (totalStats.totalKills + totalStats.totalAssists) / totalStats.totalDeaths : 0

          const avgKillParticipation =
            totalStats.matchCount > 0
              ? (totalStats.totalKP / totalStats.matchCount) * 100 // Convert to percentage and round to the nearest whole number
              : 0

          console.log('avg KDA:', avgKDA)
          console.log('avgkp:', avgKillParticipation)

          setMatches(filteredMatches)
          setAverageKDA(avgKDA.toFixed(2))
          setLastDravenWin(lastWin || null)
          setTotalSkillShotsDodged(totalStats.totalSkillShotsDodged) // Set the total skillshots dodged
          setAverageKillParticipation(avgKillParticipation.toFixed(2)) // Set average KP
          setTotalAssistPings(totalStats.totalAssistPings)
          setTotalAllInPings(totalStats.totalAllIn)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching match history:', error)
          setError('Failed to fetch match history')
        }
      }
    }

    fetchMatchHistory()
  }, [account])

  return (
    <MatchDataContext.Provider
      value={{
        GAME_NAME,
        filtered,
        region,
        TAG_LINE,
        TARGET_CHAMPION_NAME,
        error429,
        account,
        matches,
        lastDravenWin,
        averageKDA,
        totalSkillshotsDodged,
        loading,
        loadingProgressBar,
        error,
        averageKillParticipation,
        totalAssistPings,
        totalAllInPings,
        accountRank,
      }}
    >
      {children}
    </MatchDataContext.Provider>
  )
}
