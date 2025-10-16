import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-violet-700 justify-around h-[55px] items-center'>
        <div className='text-white text-sm md:text-xl'>
            iTask
        </div>
      <ul className='flex md:gap-16 gap-3 list-none text-xl items-center'>
        <li className='text-white text-sm md:text-xl hover:font-bold cursor-pointer'>Home</li>
        <li className='text-white text-sm md:text-xl hover:font-bold cursor-pointer'>Contact Us</li>
        <li className='text-white text-sm md:text-xl hover:font-bold cursor-pointer'>About</li>
      </ul>
    </nav>
  )
}

export default Navbar
