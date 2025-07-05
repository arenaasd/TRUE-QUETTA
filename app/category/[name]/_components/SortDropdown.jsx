'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const SortDropdown = () => {

    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

     const handleChange = (e) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', value)
        router.push(`${pathName}?${params.toString()}`)
    }

    const currentSort = searchParams.get('sort') || 'popular'

    return (
        <div className="flex justify-end items-center space-x-4">
            <div className="relative">
                <select
                onChange={handleChange}
                value={currentSort}
                 className="appearance-none cursor-pointer bg-white border-2 border-[var(--bronze)] rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none  focus:border-[var(--teal)]">
                    <option value="popular">Popular</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[var(--bronze)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SortDropdown