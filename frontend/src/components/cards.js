import React from 'react'

export default function MatchCard({ match, participant, team }) {
  return (
    <div className='overflow-hidden rounded-lg bg-white shadow mb-4'>
      {' '}
      {/* Added margin-bottom for spacing between cards */}
      {/* Card header */}
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Match ID: {match.matchId}</h3>
      </div>
      {/* Card body */}
      <div className='bg-gray-50 px-4 py-5 sm:p-6'>
        <p>Game Start: {new Date(match.info.gameStartTimestamp).toLocaleString()}</p>
        <p>Game End: {new Date(match.info.gameEndTimestamp).toLocaleString()}</p>
        <p>Game Duration: {Math.floor(match.info.gameDuration / 60)} minutes</p>
        <p>
          Your Score: {participant?.kills}/{participant?.deaths}/{participant?.assists}
        </p>
        <p>Result: {team?.win ? 'Victory' : 'Defeat'}</p>
        <p>Played {match.info.gameStartTimestamp}</p>
      </div>
    </div>
  )
}
