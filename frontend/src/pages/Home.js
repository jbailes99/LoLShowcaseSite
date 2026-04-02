import React, { useContext, useState, useEffect } from 'react'
import { MatchDataContext } from '../components/MatchDataContext'
import { Bars } from 'react-loader-spinner'
import { FaCheck } from 'react-icons/fa'
import Bronze from '../assets/Rank=Bronze.png'
import Silver from '../assets/Rank=Silver.png'
import Gold from '../assets/Rank=Gold.png'
import Platinum from '../assets/Rank=Platinum.png'
import Diamond from '../assets/Rank=Diamond.png'
import Iron from '../assets/Rank=Iron.png'
import Challenger from '../assets/Rank=Challenger.png'
import Emerald from '../assets/Rank=Emerald.png'

const Home = () => {
  const {
    error429,
    filtered,
    TARGET_CHAMPION_NAME,
    loadingProgressBar,
    account,
    lastDravenWin,
    loading,
    averageKDA,
    totalSkillshotsDodged,
    averageKillParticipation,
    totalAssistPings,
    totalAllInPings,
    accountRank,
  } = useContext(MatchDataContext)

  // goal rank
  const goalRank = 'CHALLENGER'

  const [animatedProgress, setAnimatedProgress] = useState(0)

  const tierImages = {
    BRONZE: Bronze,
    SILVER: Silver,
    GOLD: Gold,
    PLATINUM: Platinum,
    EMERALD: Emerald,
    DIAMOND: Diamond,
    IRON: Iron,
    CHALLENGER: Challenger,
  }

  const ranks = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'CHALLENGER']
  const divisionLP = 100
  const rankLPThresholds = {}
  ranks.forEach((rank, index) => {
    rankLPThresholds[rank] = index * 4 * divisionLP
  })
  const totalLPForProgress = rankLPThresholds[goalRank] - rankLPThresholds['IRON']

  const romanToNumeric = {
    I: 4,
    II: 3,
    III: 2,
    IV: 1,
  }

  let progressPercentage = 0
  if (accountRank) {
    const currentRankNumeric = romanToNumeric[accountRank.rank] || 0
    const currentRankLP = rankLPThresholds[accountRank.tier]
      ? rankLPThresholds[accountRank.tier] + currentRankNumeric * divisionLP + accountRank.leaguePoints
      : 0
    const currentProgressLP = currentRankLP - rankLPThresholds['IRON']
    progressPercentage = Math.min((currentProgressLP / totalLPForProgress) * 100, 100)
  }

  // animate bar
  useEffect(() => {
    if (accountRank) {
      let current = 0
      const target = progressPercentage
      const interval = setInterval(() => {
        current += 1
        if (current >= target) {
          current = target
          clearInterval(interval)
        }
        setAnimatedProgress(current)
      }, 10) // 10ms per step for smooth fill
      return () => clearInterval(interval)
    } else {
      setAnimatedProgress(0)
    }
  }, [accountRank, progressPercentage])

  function getTimeAgo(gameStartTimestamp) {
    const currentTime = Date.now()
    const timeDifference = currentTime - gameStartTimestamp

    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60))
    const daysAgo = Math.floor(hoursAgo / 24)
    const remainingHours = hoursAgo % 24

    if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`
    } else {
      return `${daysAgo} days and ${remainingHours} hours ago`
    }
  }

  return (
    <div className='sm:m-8 m-4 sm:rounded-xl rounded-xl sm:p-0 p-4 justify-center text-center bg-gray-900 text-white'>
      <header className='text-center sm:py-8'>
        <h1 className='text-4xl sm:hidden block font-bold mb-8 text-yellow-600'>{TARGET_CHAMPION_NAME} god</h1>
        <h1 className='sm:text-5xl text-3xl font-bold mb-4 text-red-500'>{account?.gameName}</h1>
        <p className='sm:text-2xl text-2xl mb-2'>u are visiting the best {TARGET_CHAMPION_NAME} player in the world</p>
      </header>

      <div className='flex flex-row justify-center space-x-2 sm:space-x-3 md:space-x-6 lg:space-x-12 xl:space-x-24'>
        <img
          className='sm:w-[40%] w-[90%] mr-4 rounded-2xl'
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${TARGET_CHAMPION_NAME}_2.jpg`}
          alt='pic1 of champion'
        />
        <img
          className='w-[40%] sm:block hidden rounded-2xl'
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${TARGET_CHAMPION_NAME}_1.jpg`}
          alt='Champion Splash'
        />
      </div>

      {error429 === 429 ? (
        <div className='p-12 text-2xl text-red-200 font-semibold'>
          the api is working double time rn. slow down bro. try again in a few sec
        </div>
      ) : loading ? (
        <div className='p-4'>
          <div className='flex justify-center mt-4 mb-4 items-center mx-auto'>
            <Bars color='white' height={32} width={32} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center p-6 rounded-lg'>
          {/* rank info */}
          {accountRank ? (
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between w-2/3 px-4 sm:px-8 mb-4'>
              <div className='flex flex-col sm:flex-row items-center'>
                <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>CURRENT RANK:</h1>
                <img src={tierImages[accountRank.tier]} alt={`${accountRank.tier} Tier`} className='h-16 w-16' />
                <p>
                  {accountRank.tier} {accountRank.rank} {accountRank.leaguePoints} LP
                </p>
              </div>

              <div className='flex flex-col sm:flex-row items-center'>
                <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>GOAL RANK:</h1>
                <img src={tierImages[goalRank]} alt='Challenger Tier' className='ml-2 h-16 w-16' />
                <p className='ml-2 text-xl'>{goalRank}</p>
              </div>
            </div>
          ) : (
            <div className='flex space-x-24 sm:mb-0 mb-4'>
              <div className='flex flex-col sm:flex-row items-center'>
                <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>CURRENT RANK:</h1>
                <p className='ml-2'>UNRANKED</p>
              </div>
              <div className='flex flex-col sm:flex-row items-center'>
                <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>GOAL RANK:</h1>
                <p className='ml-2'>{goalRank}</p>
              </div>
            </div>
          )}

          {/* Epic Animated Progress Bar with Number */}
          <div className='relative w-full bg-gray-700 h-4 rounded-full mt-4 mb-4 overflow-visible'>
            {/* Progress Fill */}
            <div
              className='h-full rounded-full'
              style={{
                width: `${animatedProgress}%`,
                background: 'linear-gradient(90deg, #facc15, #10b981, #3b82f6)',
                boxShadow: '0 0 10px #10b981, 0 0 20px #3b82f6',
                transition: 'width 0.1s ease-out',
              }}
            ></div>

            {/* Floating Percentage Number */}
            <div
              className='absolute -top-6 font-bold text-white text-sm'
              style={{
                left: `${animatedProgress}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {animatedProgress.toFixed(1)}%
            </div>
          </div>

          {/* latest win */}
          <div className='max-w-2xl w-full'>
            <h2 className='text-2xl font-semibold text-white mb-2 text-center'>Last {TARGET_CHAMPION_NAME} win:</h2>
            <div className='bg-white p-4 rounded-lg shadow-md w-full'>
              {loading ? (
                <div className='text-center text-lg font-semibold text-gray-800'>Loading...</div>
              ) : lastDravenWin ? (
                <div className='relative flex flex-col sm:flex-row items-center justify-center'>
                  <div className='md:absolute md:left-4 md:top-1/2 md:transform md:-translate-y-1/2 mb-4 sm:mb-0 flex justify-center md:justify-start'>
                    <img
                      className='h-24 w-24 rounded-full border-4 border-yellow-400'
                      src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${TARGET_CHAMPION_NAME}.png`}
                      alt={TARGET_CHAMPION_NAME}
                    />
                  </div>

                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-3xl font-semibold mb-2 text-green-500 flex items-center justify-center'>
                      <FaCheck className='text-green-500 mr-2' />
                      {getTimeAgo(lastDravenWin.info.gameStartTimestamp)}
                    </h2>

                    {lastDravenWin.info.participants &&
                      lastDravenWin.info.participants.map(participant => {
                        if (participant.puuid === account.puuid && participant.championName === TARGET_CHAMPION_NAME) {
                          return (
                            <p key={participant.puuid} className='text-2xl font-medium text-gray-800'>
                              {participant.kills}/{participant.deaths}/{participant.assists}
                            </p>
                          )
                        }
                        return null
                      })}

                    <p className='text-lg font-medium text-gray-600'>
                      Duration: {Math.floor(lastDravenWin.info.gameDuration / 60)} minutes
                    </p>
                    <p
                      className={`text-2xl font-medium ${
                        lastDravenWin.info.teams.some(team => team.win) ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {lastDravenWin.info.teams.some(team => team.win) ? 'Victory' : 'Defeat'}
                    </p>
                    <p className='text-sm font-semibold mt-2 text-gray-800'>
                      {new Date(lastDravenWin.info.gameStartTimestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col text-center mt-2 justify-center'>
                  <h1 className='text-red-500 font-semibold text-2xl'>No recent wins found.. awkward</h1>
                </div>
              )}
            </div>
          </div>

          {/* recent stats */}
          {filtered.length > 0 ? (
            <>
              <div className='flex justify-center text-center items-center mt-4'>
                <h1 className='text-2xl font-semibold text-white mb-2'>Recent stats</h1>
              </div>
              <div className='flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-8 w-full max-w-5xl mx-auto'>
                {[
                  { title: 'Avg KDA', value: averageKDA },
                  { title: 'Skillshots Dodged', value: totalSkillshotsDodged },
                  {
                    title: 'Average KP',
                    value: averageKillParticipation ? Math.round(averageKillParticipation) + '%' : null,
                  },
                  { title: 'ALL IN SPAM PINGS', value: totalAllInPings },
                ].map(({ title, value }, index) => (
                  <div
                    key={index}
                    className='bg-white flex-1 p-4 rounded-lg shadow-md flex flex-col items-center justify-center'
                  >
                    <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>{title}:</h2>
                    {!value ? (
                      <div className='flex justify-center'>
                        <Bars color='dark-gray-900' height={18} width={18} />
                      </div>
                    ) : (
                      <p className='text-3xl text-gray-800 text-center'>{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='mt-12 text-2xl text-red-300 font-semibold'>
              no recent matches found for this champ.. try again bro
            </div>
          )}

          {/* <div className='flex- flex justify-center text-center items-center mt-4'>
            <h1 className='text-2xl flex-col font-semibold text-white mb-2'>Am I tilted?</h1>

            <h1 className='text-2xl flex-colfont-semibold text-white mb-2'>hey</h1>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default Home
