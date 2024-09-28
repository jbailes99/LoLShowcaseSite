import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MatchDataContext } from '../components/MatchDataContext'

function Navbar() {
  const { TARGET_CHAMPION_NAME } = useContext(MatchDataContext)
  return (
    <nav className='bg-gray-900 sm:p-6 p-3 relative shadow-xl'>
      <div className='container mx-auto flex items-center justify-center'>
        {/* Left-aligned username */}
        <div className='absolute left-12 hidden sm:block text-red-500 text-3xl font-bold lowercase'>
          <Link to='/'>best{TARGET_CHAMPION_NAME}.world</Link>
        </div>

        {/* Centered links */}
        <div className='flex justify-end sm:space-x-12 space-x-6 sm:text-xl text-md '>
          <Link to='/' className=' py-2 text-gray-300 hover:text-white transition duration-300 ease-in-out'>
            Home
          </Link>
          <Link to='/profile' className=' py-2 text-gray-300 hover:text-white transition duration-300 ease-in-out'>
            Recent Matches
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
