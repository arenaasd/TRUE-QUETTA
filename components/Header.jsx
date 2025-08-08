import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="fixed top-0 left-1/2 font-serif transform -translate-x-1/2 w-full z-51 
      backdrop-blur-sm  border-b border-gray-800  shadow-md 
      p-4 flex h-[70px] justify-between items-center transition-all duration-300 bg-white/30">
      <Link href={'/'}>
        <Image
          src={'/quetta-bg.png'}
          alt='True Quetta'
          width={90}
          height={50}
          quality={90}
          unoptimized
          className='cursor-pointer hover:scale-105 transition-all duration-300'
        />
      </Link>
      <Link href={'/contact'}>
        <button className="px-4 py-2 cursor-pointer rounded-3xl hover:scale-105 border border-[var(--bronze)] text-[var(--foreground)] hover:text-[var(--white)]  hover:bg-[var(--bronze)] transition-all duration-300">
          <span className="">Suggest a Place</span>
        </button>
      </Link>
    </div>
  )
}

export default Header