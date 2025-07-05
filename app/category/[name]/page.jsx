
export async function generateMetadata({ params, searchParams }) {
  const categoryName = params.name;
  const categoryTitle = Categories[categoryName] || capitalize(categoryName);
  const sortType = searchParams?.sort || 'popular';

  // Customize description based on sort type for uniqueness
  const sortDescriptions = {
    popular: `Explore the most popular ${categoryName} in Quetta, ranked by ratings and reviews.`,
    newest: `Discover the newest ${categoryName} in Quetta, freshly added to True Quetta.`,
    oldest: `Browse classic ${categoryName} in Quetta, trusted by locals for years.`,
  };



  return {
    title: `${categoryTitle} in Quetta | True Quetta`,
    description: sortDescriptions[sortType] || `Discover the best ${categoryName} in Quetta with detailed reviews, ratings, and information.`,
    keywords: `${categoryName} in Quetta, best ${categoryName}, Quetta ${categoryName}, top places in Quetta, local guide`,
    openGraph: {
      title: `${categoryTitle} in Quetta`,
      description: sortDescriptions[sortType] || `Find the top ${categoryName} in Quetta with True Quetta.`,
      url: `https://truequetta.com/category/${categoryName}${sortType !== 'popular' ? `?sort=${sortType}` : ''}`,
      images: [
        {
          url: `https://truequetta.com/images/${categoryName}-preview.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryTitle} in Quetta`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryTitle} in Quetta`,
      type: 'website',
      description: sortDescriptions[sortType] || `Discover the best ${categoryName} in Quetta...`,
      images: [`https://truequetta.com/images/${categoryName}-preview.jpg`]
    },
    alternates: {
      canonical: `https://truequetta.com/category/${categoryName}`,
    },
  };
}

function capitalize(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}




import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import SortDropdown from './_components/SortDropdown';
import Link from 'next/link';
import RandomLinks from './_components/Suggestions';

let Categories = {
  hotels: 'Top Hotels to Stay',
  restaurants: 'Top Restaurants to Dine',
  bakeries: 'Top Bakeries to Satisfy Your Sweet Tooth',
  cafes: 'Best Cafes to Relax',
  parks: 'Best Parks to Visit',
};

const page = async ({ params, searchParams }) => {
  let categoryName = params.name;

  const sortType = await searchParams?.sort || 'popular';

  function sortPlaces(data, type) {
    if (type === 'newest') {
      return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === 'oldest') {
      return [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      return [...data].sort((a, b) => b.rating - a.rating);
    }
  }

  function getSortDescription(type, category) {
    return {
      popular: `Explore the most famous ${category} in Quetta, ranked by ratings and reviews.`,
      newest: `Discover the newest ${category} in Quetta, freshly added to True Quetta.`,
      oldest: `Browse classic ${category} in Quetta, trusted by locals for years.`,
    }[type] || `Discover the best ${category} in Quetta.`;
  }



  let categoryData;
  try {
    const data = await import(`@/data/categories/${categoryName}.json`);
    categoryData = sortPlaces(data.default, sortType);
  } catch (error) {
    notFound();
  }

  if (!categoryData || !Categories[categoryName]) {
    notFound();
  }

  const cafesData = (await import('@/data/categories/cafes.json')).default;
  const hotelsData = (await import('@/data/categories/hotels.json')).default;
  const restaurantsData = (await import('@/data/categories/restaurants.json')).default;
  const bakeriesData = (await import('@/data/categories/bakeries.json')).default;
  const parksData = (await import('@/data/categories/parks.json')).default;


  return (
    <div className="min-h-screen mt-14 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="py-2 md:py-4 lg:py-6">
        <div className="grid place-content-center px-4" style={{ gridTemplateAreas: 'overlap' }}>
          <div
            className="text-xl text-center md:text-2xl lg:text-3xl font-black uppercase tracking-wider"
            style={{
              gridArea: 'overlap',
              backgroundImage: 'repeating-linear-gradient(105deg, var(--bronze) 0%, #8B4513 5%, var(--bronze) 12%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transform: 'scaleY(1.05)',
              transformOrigin: 'top',
              WebkitTextStroke: 'clamp(0.5px, 0.15vw, 1px)', // Responsive stroke
              fontSize: 'clamp(1rem, 4vw, 1.5rem)', // Responsive font size
            }}
          >
            {Categories[categoryName]}
          </div>
          <div
            className="text-xl text-center md:text-2xl lg:text-3xl font-black uppercase tracking-wider"
            style={{
              gridArea: 'overlap',
              backgroundImage: 'repeating-linear-gradient(5deg, var(--bronze) 0%, #A0522D 23%, var(--bronze) 31%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: '#0B5563',
              transform: 'scale(1)',
              WebkitTextStroke: 'clamp(0.5px, 0.15vw, 1px)', // Responsive stroke
              fontSize: 'clamp(1rem, 4vw, 1.5rem)', // Responsive font size
            }}
          >
            {Categories[categoryName]}
            <p className="mt-2 text-center text-xs md:text-sm text-[var(--bronze)] max-w-xl mx-auto">
              {getSortDescription(sortType, categoryName)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-4 md:mb-6">
        <SortDropdown />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
          {categoryData.map((place, index) => (
            <Link
              href={`/category/${categoryName}/${encodeURIComponent(
                place.name.toLowerCase().replace(/\s+/g, '-')
              )}`}
              key={index}
            >
              <div
                key={index}
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
                    src={place.image}
                    alt={place.name}
                    width={400}
                    height={150}
                    className="w-full h-32 md:h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
          ))}
        </div>

        <div className="text-center mt-8 md:mt-16 py-4 md:py-8">
          <div className="inline-flex items-center space-x-2 md:space-x-4 px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-md border border-slate-200">
            <div className="w-2 h-2 bg-[var(--teal)] rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium text-sm md:text-base">
              Showing {categoryData.length} amazing places
            </span>
            <div className="w-2 h-2 bg-[var(--bronze)] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      <RandomLinks currentCategory={categoryName} allPlaces={{
        cafes: cafesData,
        hotels: hotelsData,
        restaurants: restaurantsData,
        bakeries: bakeriesData,
        parks: parksData
      }} />
    </div>
  );
};

export default page;