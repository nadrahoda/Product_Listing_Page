import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { IoMdMenu } from 'react-icons/io'
import { useRouter } from 'next/router';

const Navbar = ({search, setSearch}:any) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const router = useRouter();

  return (
    <nav className='text-orange-500 border-b-4'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='text-xl font-medium italic'>
          <Link href='/'>Products</Link>
        </div>
        <input
            type='text'
            placeholder='Search products...'
            className='md:w-1/3 p-2 pl-3 border border-gray-300 rounded-full border-orange-500 outline-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        <div className='hidden md:flex space-x-6'>
          <Link href='' className={router.pathname === '' ? 'font-bold' : 'hover:font-bold'}>
            Home
          </Link>
          <Link href='' className={router.pathname === '' ? 'font-bold' : 'hover:font-bold'}>
            About
          </Link>
          <Link href='/' className={router.pathname === '/' ? 'font-bold' : 'hover:font-bold'}>
            Product
          </Link>
          <Link href='' className={router.pathname === '' ? 'font-bold' : 'hover:font-bold'}>
            Contact
          </Link>
          <Link href='' className={router.pathname === '' ? 'font-bold' : 'hover:font-bold'}>
            Services
          </Link>
        </div>
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            <IoMdMenu size={20} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link href="" className='block px-3 py-2 rounded-md text-base font-medium'>
              Home
            </Link>
            <Link href="" className='block px-3 py-2 rounded-md text-base font-medium'>
              About
            </Link>
            <Link href='/' className='block px-3 py-2 rounded-md text-base font-medium'>
              Product
            </Link>
            <Link href="" className='block px-3 py-2 rounded-md text-base font-medium'>
              Contact
            </Link>
            <Link href="" className= 'block px-3 py-2 rounded-md text-base font-medium'>
              Services
            </Link>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar
