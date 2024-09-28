import React from 'react'
import { FaHeart } from 'react-icons/fa'
import opgg from '../assets/opgg.jpeg'

const Footer = () => {
  return (
    <footer className='bg-gray-900 py-4 text-white'>
      <div className='container mx-auto'>
        <div className='flex justify-center space-x-14 sm:mb-6'>
          <section className='text-center'>
            <a
              href='https://www.op.gg/summoners/euw/razr708x54e3328-5451'
              target='_blank'
              rel='noopener noreferrer'
              className='max-w-xl w-60 inline-block px-4 py-2'
            >
              <img src={opgg} alt='OP.GG Profile' className='inline-block w-12 h-12 mr-2 rounded-2xl' />
            </a>
          </section>
        </div>

        {/* Copyright */}
        <div className='text-center sm:mt-6 mb-2'>
          <p className='text-gray-400'>© 2024 Best League Player. All rights reserved.</p>
        </div>

        {/* Made with love */}
        <div className='text-center text-gray-400 text-xs mt-4'>
          <p className='flex items-center justify-center'>
            Made with <FaHeart className='text-red-500 mx-1' /> by yak
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
