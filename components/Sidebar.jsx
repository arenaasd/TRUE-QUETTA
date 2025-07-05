'use client'
import Link from 'next/link'
import { ChefHat, Cake, Building2, TreePine, ChevronLeft, Coffee } from 'lucide-react'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  const pathname = usePathname()

  // Auto-close sidebar on route change
  useEffect(() => {
    if (isOpen) setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    // Only disable scroll on mobile devices
    const isMobile = window.innerWidth < 768
    
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])


  return (
    <div
      className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] bg-white/25 backdrop-blur-sm border-r border-gray-800/30 shadow-lg transition-all duration-300 z-40 font-serif
        ${isOpen ? 'w-[280px]  ' : 'w-[70px]'}`}
    >
      <div className={`flex items-center justify-between h-[60px] px-4 border-b border-gray-700/20 ${!isOpen ? 'justify-center px-0' : ''}`}>
        <div className={`font-semibold text-[var(--foreground)] transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          Discover
        </div>
        <button
          onClick={toggleSidebar}
          className={`pr-0 hover:bg-white/20 cursor-pointer transition-all duration-300 rounded-md ${!isOpen ? 'mx-auto pr-14' : ''}`}
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft
            className={`w-5 h-5 text-[var(--foreground)] transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <nav className="pt-6 px-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/category/restaurants"
              className={`flex items-center py-3 text-[var(--foreground)] hover:bg-[var(--bronze)] hover:text-white transition-all duration-300 group rounded-lg
                ${isOpen ? 'px-4 justify-start' : 'pl-4 justify-center w-full'}`}>
              <ChefHat className="w-6 h-6 flex-shrink-0" />
              <span className={`ml-4 font-medium transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                Top Restaurants
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/category/bakeries"
              className={`flex items-center py-3 text-[var(--foreground)] hover:bg-[var(--bronze)] hover:text-white transition-all duration-300 group rounded-lg
                ${isOpen ? 'px-4 justify-start' : 'pl-4 justify-center w-full'}`}
            >
              <Cake className="w-6 h-6 flex-shrink-0" />
              <span className={`ml-4 font-medium transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                Top Bakeries
              </span>
            </Link>
          </li>

            <li>
            <Link
              href="/category/cafes"
              className={`flex items-center py-3 text-[var(--foreground)] hover:bg-[var(--bronze)] hover:text-white transition-all duration-300 group rounded-lg
                ${isOpen ? 'px-4 justify-start' : 'pl-4 justify-center w-full'}`}
            >
              <Coffee className="w-6 h-6 flex-shrink-0" />
              <span className={`ml-4 font-medium transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                Top Cafes
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/category/hotels"
              className={`flex items-center py-3 text-[var(--foreground)] hover:bg-[var(--bronze)] hover:text-white transition-all duration-300 group rounded-lg
                ${isOpen ? 'px-4 justify-start' : 'pl-4 justify-center w-full'}`}
            >
              <Building2 className="w-6 h-6 flex-shrink-0" />
              <span className={`ml-4 font-medium transition-all duration-300 whitesome-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                Top Hotels
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/category/parks"
              className={`flex items-center py-3 text-[var(--foreground)] hover:bg-[var(--bronze)] hover:text-white transition-all duration-300 group rounded-lg
                ${isOpen ? 'px-4 justify-start' : 'pl-4 justify-center w-full'}`}>

              <TreePine className="w-6 h-6 flex-shrink-0" />
              <span className={`ml-4 font-medium transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                Best Parks
              </span>
            </Link>
          </li>
        </ul>
        <span className={`ml-4 text-xs text-center text-[var(--foreground)]/50 py-3 transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
          More Coming Soon!
        </span>
      </nav>

      <div className={`absolute bottom-6 left-0 right-0 px-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-xs text-[var(--foreground)]/50 text-center py-3 border-t border-gray-700/20">
          True Quetta
        </div>
      </div>
    </div>
  )
}

export default Sidebar