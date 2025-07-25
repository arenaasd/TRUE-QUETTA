'use client'
import Link from 'next/link'
import { 
  Cake, Building2, TreePine, ShoppingBag, Utensils, 
  ChevronLeft, Coffee, Grid3X3, ChevronDown, ShieldCheck, 
  ChevronRight, ChevronUp, BookOpen, GraduationCap, FileText, 
  Award, School, Library 
} from 'lucide-react'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleEducation = () => setIsEducationOpen(!isEducationOpen);

  const toggleSubCategory = (index) => {
    setExpandedSubCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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

  const categories = [
    { href: "/category/restaurants", icon: Utensils, label: "Top Restaurants" },
    { href: "/category/bakeries", icon: Cake, label: "Top Bakeries" },
    { href: "/category/cafes", icon: Coffee, label: "Top Cafes" },
    { href: "/category/hotels", icon: Building2, label: "Top Hotels" },
    { href: "/category/parks", icon: TreePine, label: "Best Parks" },
    { href: "/category/malls", icon: ShoppingBag, label: "Best Shopping Malls" },
    {
      label: "Help & Safety",
      icon: ShieldCheck,
      children: [
        { href: "/category/police", label: "Police" },
        { href: "/category/hospitals", label: "Hospitals" },
      ],
    },
  ];

  const educationLinks = [
    { href: "/education/past-papers", icon: FileText, label: "Past Papers" },
    { href: "/education/results", icon: Award, label: "Results" },
    { href: "/education/schools", icon: School, label: "Schools" },
    { href: "/education/colleges", icon: Library, label: "Colleges" },
  ];

  return (
    <div
      className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] bg-white/25 backdrop-blur-sm border-r border-gray-800/30 shadow-lg transition-all duration-300 z-40 font-serif
        ${isOpen ? 'w-[280px]' : 'w-[70px]'}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between h-[60px] px-4 border-b border-gray-700/20 ${!isOpen ? 'justify-center px-0' : ''}`}>
        <div className={`font-bold text-lg text-[var(--foreground)] transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          Discover
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-2 hover:bg-white/20 cursor-pointer transition-all duration-300 rounded-lg ${!isOpen ? 'mr-15' : ''}`}
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft
            className={`w-5 h-5 text-[var(--foreground)] transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="pt-4 px-3 h-[calc(100%-110px)] overflow-y-auto">
        <div className="space-y-1">
          {/* Marketplace Dropdown */}
          <div className="relative">
            <button
              onClick={toggleCategory}
              className={`flex items-center w-full py-2.5 text-[var(--foreground)] group duration-150 transition-all ease-in hover:bg-white/10 rounded-lg
                ${isOpen ? 'px-3 justify-between' : 'pl-3 justify-center'}`}
            >
              <div className="flex items-center">
                <Grid3X3 className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 font-medium text-sm transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  Marketplace
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isCategoryOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Marketplace Items */}
            <div className={`overflow-hidden transition-all duration-300 ${isCategoryOpen && isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-1 pb-1 space-y-0.5">
                {categories.map((category, i) => {
                  if (category.children) {
                    return (
                      <div key={i}>
                        <button
                          onClick={() => toggleSubCategory(i)}
                          className="flex items-center w-full py-2 pl-5 pr-2 text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-white/10 transition-all duration-300 rounded-lg group"
                        >
                          <div className="flex items-center gap-4">
                            <category.icon className="w-4 h-4" />
                            <span className="font-bold text-xs">{category.label}</span>
                            {expandedSubCategories[i] ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </div>
                        </button>

                        {/* Sub-category items */}
                        <div className={`overflow-hidden transition-all duration-300 ${expandedSubCategories[i] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="space-y-0.5">
                            {category.children.map((sub, j) => (
                              <Link
                                key={j}
                                href={sub.href}
                                className="flex items-center font-semibold py-2 ml-6 pl-6 pr-3 text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-white/10 transition-all duration-300 rounded-lg border-l-2 border-transparent hover:border-[var(--bronze)] text-xs"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="flex items-center py-2 ml-3 pl-3 pr-3 text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-white/10 transition-all duration-300 rounded-lg border-l-2 border-transparent hover:border-[var(--bronze)] group"
                    >
                      <category.icon className="w-4 h-4 flex-shrink-0 mr-2" />
                      <span className="font-semibold text-xs">
                        {category.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education Dropdown */}
          <div className="relative mt-4">
            <button
              onClick={toggleEducation}
              className={`flex items-center w-full py-2.5 text-[var(--foreground)] group duration-150 transition-all ease-in hover:bg-white/10 rounded-lg
                ${isOpen ? 'px-3 justify-between' : 'pl-3 justify-center'}`}
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 font-medium text-sm transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  Education
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isEducationOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Education Items */}
            <div className={`overflow-hidden transition-all duration-300 ${isEducationOpen && isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-1 pb-1 space-y-0.5">
                {educationLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center py-2 ml-3 pl-3 pr-3 text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-white/10 transition-all duration-300 rounded-lg border-l-2 border-transparent hover:border-[var(--bronze)] group"
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0 mr-2" />
                    <span className="font-semibold text-xs">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className={`mt-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center">
              <div className="px-2.5 py-1 bg-gradient-to-r from-[var(--bronze)]/20 to-[var(--bronze)]/30 rounded-full border border-[var(--bronze)]/40">
                <span className="text-xs font-medium text-[var(--foreground)]/70">
                  More Coming Soon!
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-6 left-0 right-0 px-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center py-3 border-t border-gray-700/20">
          <div className="text-sm font-semibold text-[var(--foreground)]/80 mb-1">
            True Quetta
          </div>
          <div className="text-xs text-[var(--foreground)]/50">
            Discover the best of Quetta
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar