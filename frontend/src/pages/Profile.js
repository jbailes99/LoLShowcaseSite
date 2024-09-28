import React, { useState, useEffect, useContext } from 'react'
import MatchCard from '../components/cards'
import { Bars } from 'react-loader-spinner'
import { MatchDataContext } from '../components/MatchDataContext'

const Profile = () => {
  const { account, TARGET_CHAMPION_NAME, lastDravenWin, loading, error, matches } = useContext(MatchDataContext)

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
    <div className='m-8 rounded-xl  container mx-auto p-4 bg-gray-900 text-white'>
      <div className='App'>
        {matches === undefined ? (
          <p>Loading...</p>
        ) : matches.length === 0 ? (
          <div className=''>
            <h2 className='text-4xl mt-4 font-bold text-white'>{TARGET_CHAMPION_NAME} Match History</h2>
            <div className='flex flex-col items-center justify-center h-screen'>
              <Bars color='#2d3748' height={80} width={80} />
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center p-6 rounded-lg'>
            <h2 className='text-3xl font-semibold text-white mb-4'>Recent {TARGET_CHAMPION_NAME} Games</h2>
            {matches.map(match => {
              const participant = match.info.participants.find(participant => participant.puuid === account.puuid)
              const team = match.info.teams.find(team => team.teamId === participant?.teamId)

              return (
                <div
                  key={match.metadata.matchId}
                  className='bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mb-4 mx-auto'
                >
                  <div className='flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6'>
                    <img
                      className='h-24 w-24 rounded-full border-4 border-yellow-400 my-auto '
                      src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${TARGET_CHAMPION_NAME}.png`}
                      alt='Draven'
                    />
                    <div className='flex-1'>
                      {participant && (
                        <>
                          <p className='text-sm font-medium text-gray-800'>
                            Skillshots Dodged: {participant.challenges.skillshotsDodged}
                          </p>
                          <p className='text-sm font-medium text-gray-800'>
                            KP: {Math.round(participant.challenges.killParticipation * 100)}%
                          </p>
                        </>
                      )}
                      <div className='mt-4'>
                        {participant && (
                          <p className='text-2xl mb-2 font-medium text-gray-800'>
                            {participant.kills}/{participant.deaths}/{participant.assists}
                          </p>
                        )}
                        <p className='text-lg font-medium text-gray-600'>
                          {Math.floor(match.info.gameDuration / 60)} minutes
                        </p>
                      </div>
                    </div>
                    <div className='flex-col flex items-center justify-center md:justify-end'>
                      <p className={`text-2xl font-medium ${team?.win ? 'text-green-500' : 'text-red-500'}`}>
                        {team?.win ? 'Victory' : 'Defeat'}
                      </p>
                      <p className='text-sm font-semibold text-right text-gray-800 mb-2 sm:mt-16 mt-0'>
                        {new Date(match.info.gameStartTimestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export default Profile
