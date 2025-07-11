'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PlaceCard = ({ place, categoryName, BASE_IMAGE_URL }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <Link
            href={`/category/${categoryName}/${encodeURIComponent(
                place.name.toLowerCase().replace(/\s+/g, '-')
            )}`}
        >
            <div
                className="group cursor-pointer relative bg-white hover:scale-[1.02] transition-all duration-300 rounded-2xl shadow-lg border-2 border-[var(--bronze)] overflow-hidden"
            >
                {place.isAdvertised && (
                    <div className="absolute top-0 right-0 z-20">
                        <div className="relative">
                            <div
                                className="w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-gradient-to-r from-yellow-400 to-yellow-500"
                                style={{ borderTopColor: '#FFD700' }}
                            ></div>
                            <div className="absolute -top-10 -right-1 w-12 h-12 flex items-center justify-center">
                                <span className="text-[var(--bronze)] text-xs font-bold transform rotate-45 origin-center">
                                    AD
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative overflow-hidden">
                    <Image
                        src={`${BASE_IMAGE_URL}${place.image}` || "/placeholder.jpg"}
                        alt={place.name}
                        width={400}
                        priority
                        height={150}
                        onLoadingComplete={() => setLoaded(true)}
                        quality={80}
                        className="w-full h-32 md:h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!loaded && (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-[var(--bronze)] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                    <div className="space-y-1 md:space-y-2">
                        <h2 className="text-base md:text-lg font-bold text-[var(--teal)] line-clamp-1">
                            {place.name}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {place.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-xs md:text-sm font-semibold text-[var(--bronze)]">
                                {place.rating}
                            </span>
                        </div>
                        <div className="w-2 h-2 bg-[var(--teal)] rounded-full opacity-60"></div>
                    </div>
                </div>

                <div className="absolute inset-0 border-2 border-[var(--teal)] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </Link>
    )
}

export default PlaceCard