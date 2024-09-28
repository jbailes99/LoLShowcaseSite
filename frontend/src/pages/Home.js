import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
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
    TARGET_CHAMPION_NAME,
    GAME_NAME,
    TAG_LINE,
    account,
    lastDravenWin,
    loading,
    error,
    averageKDA,
    totalSkillshotsDodged,
    averageKillParticipation,
    totalAssistPings,
    totalAllInPings,
    accountRank,
  } = useContext(MatchDataContext)

  //set goal rank
  //challenger is default
  const goalRank = 'CHALLENGER'

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

  const imageUrl = tierImages[accountRank?.tier] || ''

  const ranks = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'CHALLENGER']

  // Define LP thresholds for each division
  const divisionLP = 100
  const rankLPThresholds = {}

  ranks.forEach((rank, index) => {
    rankLPThresholds[rank] = index * 4 * divisionLP
  })

  const totalLPForProgress = rankLPThresholds[goalRank] - rankLPThresholds['IRON']
  console.log(totalLPForProgress)

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
      : NaN
    console.log(currentRankLP)

    const currentProgressLP = currentRankLP - rankLPThresholds['IRON']
    const progressPercentage = Math.min((currentProgressLP / totalLPForProgress) * 100, 100)
    console.log(progressPercentage)
  }

  return (
    <div className='sm:m-8 m-4 sm:rounded-xl rounded-xl sm:p-0 p-4 justify-center text-center  bg-gray-900 text-white'>
      <header className='text-center sm:py-8 '>
        <h1 className=' text-4xl sm:hidden block font-bold mb-8 text-yellow-600'>best{TARGET_CHAMPION_NAME}.world</h1>

        <h1 className='sm:text-5xl text-3xl  font-bold mb-4 text-red-500'>{account?.gameName}</h1>
        <p className='sm:text-2xl text-2xl mb-2'>u are visiting the best {TARGET_CHAMPION_NAME} player in the world</p>

        {/* <p className='sm:text-5xl text-4xl mb-2 font-bold text-red-500'>razr708x54e3328</p> */}
      </header>
      <div className='flex flex-row justify-center space-x-2 sm:space-x-3 md:space-x-6 lg:space-x-12  xl:space-x-24'>
        <img
          className='sm:w-[40%] w-[90%]  mr-4 rounded-2xl'
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${TARGET_CHAMPION_NAME}_2.jpg`}
          alt='Draven Gladiator'
        />
        <img
          className='w-[40%] sm:block hidden  rounded-2xl'
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${TARGET_CHAMPION_NAME}_1.jpg`}
          alt='Champion Splash'
        />
      </div>
      {error429 === 429 ? (
        <div className='p-12 text-2xl text-red-200 font-semibold'>
          the api is working double time rn. slow down bro. try again in a few sec
        </div>
      ) : (
        <div className='flex flex-col items-center p-6 rounded-lg'>
          {accountRank.tier ? (
            <div className='flex space-x-24 sm:mb-0 mb-4'>
              <div>
                <div className='flex flex-col sm:flex-row items-center'>
                  <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>CURRENT RANK:</h1>
                  <img src={tierImages[accountRank.tier]} alt={`${accountRank.tier} Tier`} className='h-16 w-16' />
                  <p className=''>
                    {accountRank.tier} {accountRank.rank} {accountRank.leaguePoints} LP
                  </p>
                </div>
              </div>

              <div>
                <div className='flex flex-col sm:flex-row items-center'>
                  <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>GOAL RANK:</h1>
                  <img src={tierImages[goalRank]} alt='Challenger Tier' className='ml-2 h-16 w-16' />
                  <p className='ml-2 text-xl'>{goalRank}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex space-x-24 sm:mb-0 mb-4'>
              <div>
                <div className='flex flex-col sm:flex-row items-center'>
                  <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>CURRENT RANK:</h1>
                  <p className=' ml-2'> UNRANKED</p>
                </div>
              </div>

              <div>
                <div className='flex flex-col sm:flex-row items-center'>
                  <h1 className='text-xl font-semibold sm:mr-0 mb-0 sm:mb-0'>GOAL RANK:</h1>
                  <p className='ml-2'>{goalRank}</p>
                </div>
              </div>
            </div>
          )}

          <div className='relative w-full bg-gray-700 h-4 rounded-full mt-4 mb-4'>
            <div
              className='bg-green-500 h-full rounded-full'
              style={{ width: `${accountRank ? progressPercentage : 0}%` }}
            ></div>
            <div
              className='absolute top-[-24px] right-0 text-white font-semibold'
              style={{ right: `${100 - (accountRank ? progressPercentage : 0)}%`, transform: 'translateX(50%)' }}
            >
              {accountRank ? Math.round(progressPercentage) : 0}%
            </div>
          </div>

          <div className='max-w-2xl w-full'>
            <h2 className='text-2xl font-semibold text-white mb-2 text-center'>Last {TARGET_CHAMPION_NAME} win:</h2>
            <div className='bg-white p-4 rounded-lg shadow-md w-full'>
              {/* Check for loading state */}
              {loading ? (
                <div className='text-center text-lg font-semibold text-gray-800'>Loading...</div>
              ) : lastDravenWin ? (
                <>
                  <h2 className='sm:text-2xl text-xl font-semibold text-green-500 mb-2 text-center flex items-center justify-center'>
                    <FaCheck className='text-green-500 mr-4' />
                    {getTimeAgo(lastDravenWin.info.gameStartTimestamp)}
                  </h2>
                  <div className='flex items-center space-x-4'>
                    <img
                      className='h-24 w-24 rounded-full border-4 border-yellow-400'
                      src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${TARGET_CHAMPION_NAME}.png`}
                      alt='Draven'
                    />
                    <div className='flex-1'>
                      {lastDravenWin.info.participants && (
                        <div className='mt-4'>
                          {lastDravenWin.info.participants.map(participant => {
                            if (participant.puuid === account.puuid && participant.championName === 'Draven') {
                              return (
                                <p key={participant.puuid} className='text-2xl mb-2 font-medium text-gray-800'>
                                  {participant.kills}/{participant.deaths}/{participant.assists}
                                </p>
                              )
                            }
                            return null
                          })}
                        </div>
                      )}
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
                      <p className='text-sm font-semibold sm:text-right sm:mt-0 mt-4 text-gray-800 mb-2'>
                        {new Date(lastDravenWin.info.gameStartTimestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className='flex flex-col text-center mt-2 justify-center'>
                  <h1 className='text-red-500 font-semibold text-2xl'>No recent wins found.. awkward</h1>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-center text-center items-center mt-4'>
            <h1 className='text-2xl font-semibold text-white mb-2'>Recent stats</h1>
          </div>
          <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full md:w-3/4'>
            <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Avg KDA</h2>
              {!averageKDA ? (
                <div className='flex justify-center'>
                  <Bars color='dark-gray-900' height={18} width={18} />
                </div>
              ) : (
                <p className='text-3xl text-gray-800 text-center'>{averageKDA}</p>
              )}
            </div>

            <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Skillshots Dodged:</h2>
              {!totalSkillshotsDodged ? (
                <div className='flex justify-center'>
                  <Bars color='dark-gray-900' height={18} width={18} />
                </div>
              ) : (
                <p className='text-3xl text-gray-800 text-center'>{totalSkillshotsDodged}</p>
              )}
            </div>

            <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Average KP:</h2>
              {!averageKillParticipation ? (
                <div className='flex justify-center'>
                  <Bars color='dark-gray-900' height={18} width={18} />
                </div>
              ) : (
                <p className='text-3xl text-gray-800 text-center'>{Math.round(averageKillParticipation)}%</p>
              )}
            </div>

            <div className='bg-white max-w-xl w-full md:w-80 p-4 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>ALL IN SPAM PINGS:</h2>
              {!totalAllInPings ? (
                <div className='flex justify-center'>
                  <Bars color='dark-gray-900' height={18} width={18} />
                </div>
              ) : (
                <p className='text-3xl text-gray-800 text-center'>{totalAllInPings}</p>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  )
}

export default Home
