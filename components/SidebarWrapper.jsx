'use client'
import Sidebar from "@/components/Sidebar"
import { useState, useEffect } from "react"

export default function SidebarWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className={`pt-[70px] transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-[70px]'}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </>
  )
}
