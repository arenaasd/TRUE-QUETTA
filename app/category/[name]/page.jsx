
export async function generateMetadata({ params, searchParams }) {
  const categoryName = params.name;
  const categoryTitle = Categories[categoryName] || capitalize(categoryName);
  const sortType = await searchParams?.sort || 'popular';

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

const BASE_IMAGE_URL = "https://tgqbqycxltdgbdyewxth.supabase.co/storage/v1/object/public";



import { notFound } from 'next/navigation';
import React from 'react';
import SortDropdown from './_components/SortDropdown';
import RandomLinks from './_components/Suggestions';
import PlaceCard from './_components/PlaceCard';

let Categories = {
  hotels: 'Top Hotels to Stay',
  restaurants: 'Top Restaurants to Dine',
  bakeries: 'Top Bakeries to Satisfy Your Sweet Tooth',
  cafes: 'Best Cafes to Relax',
  parks: 'Best Parks to Visit',
  malls: 'Best Shopping Malls to Explore',
  police: "Police Stations & Helplines",
  hospitals: 'Top Hospitals for Medical Care'
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
  const mallsData = (await import('@/data/categories/malls.json')).default;


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
            <PlaceCard
              key={index}
              place={place}
              categoryName={categoryName}
              BASE_IMAGE_URL={BASE_IMAGE_URL}
            />
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
        parks: parksData,
        malls: mallsData
      }} />
    </div>
  );
};

export default page;