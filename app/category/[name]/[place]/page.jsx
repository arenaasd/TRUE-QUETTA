export async function generateMetadata({ params }) {
  const categoryName = params.name;
  const placeSlug = decodeURIComponent(params.place);

  const filePath = path.join(process.cwd(), 'data', 'categories', `${categoryName}.json`);
  let fileContent, places, place;

  try {
    fileContent = await fs.readFile(filePath, 'utf-8');
    places = JSON.parse(fileContent);
    place = places.find(p => slugify(p.name) === placeSlug);
  } catch (error) {
    return {
      title: "Not Found | True Quetta",
      description: "Page not found on True Quetta.",
    };
  }

  if (!place) {
    return {
      title: "Not Found | True Quetta",
      description: "Page not found on True Quetta.",
    };
  }

  return {
    title: `${place.name} - ${categoryName.replace('-', ' ')} in Quetta | True Quetta`,
    description: `${place.description || `Discover ${place.name} in Quetta with reviews, ratings, and images.`}`,
    keywords: `${place.name}, ${categoryName} in Quetta, best ${categoryName}, ${place.name} reviews`,
    openGraph: {
      title: `${place.name} - ${categoryName.replace('-', ' ')} in Quetta`,
      description: `${place.description || `Find out more about ${place.name} in Quetta.`}`,
      url: `https://truequetta.com/category/${categoryName}/${placeSlug}`,
      images: [
        {
          url: `https://truequetta.com${place.image}`,
          width: 1200,
          height: 630,
          alt: `${place.name} in Quetta`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${place.name} - ${categoryName.replace('-', ' ')} in Quetta`,
      description: `${place.description || `Learn about ${place.name} in Quetta.`}`,
      images: [`https://truequetta.com${place.image}`]
    },
    alternates: {
      canonical: `https://truequetta.com/category/${categoryName}/${placeSlug}`,
    },
  };
}

const slugify = str => str.toLowerCase().replace(/\s+/g, '-');

const BASE_IMAGE_URL = "https://tgqbqycxltdgbdyewxth.supabase.co/storage/v1/object/public";


import path from 'path';
import { promises as fs } from 'fs';
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Phone, Mail, Globe, MapPin, CheckCircle, Building2, ArrowRight } from 'lucide-react'
import Link from 'next/link';

export const dynamic = 'force-dynamic';



const page = async ({ params }) => {
  const categoryName = params.name
  const placeSlug = decodeURIComponent(params.place)

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Step 1: Load JSON file
  const filePath = path.join(process.cwd(), 'data', 'categories', `${categoryName}.json`)

  let fileContent
  try {
    fileContent = await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    return notFound()
  }

  let places
  try {
    places = JSON.parse(fileContent)
  } catch (error) {
    return notFound()
  }

  // Step 2: Find the matching place using slug
  const place = places.find(p => slugify(p.name) === placeSlug)

  if (!place) return notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 mt-4 md:mt-16 p-2 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-8 sm:mb-12">
          {/* Main Image */}
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg sm:rounded-2xl lg:rounded-3xl shadow-2xl">
            <Image
              src={`${BASE_IMAGE_URL}${place.image}` || "/placeholder.png"}
              alt={`${place.name} - ${categoryName} in Quetta`} fill
              priority
              unoptimized
              quality={100}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Rating Badge */}
            {place.rating && (
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-semibold text-gray-800">{place.rating}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-[var(--bronze)] backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <span className="text-xs sm:text-sm text-white font-medium capitalize">
                  {categoryName.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--teal)] mb-4">
              {place.name}
            </h1>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* About Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-6">
                About This Place
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg font-light max-w-3xl mx-auto">
                {place.description}
              </p>
            </div>
          </div>

          {/* Features Section */}
          {place.features && place.features.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-2">
                  Features & Amenities
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-light">
                  Everything you need for a comfortable experience
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {place.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50/50 rounded-lg sm:rounded-xl border border-[var(--bronze)] transition-all hover:scale-105 cursor-pointer duration-200 hover:bg-[var(--bronze)]"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--teal)]/10 group-hover:bg-white/10 transition-all">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--teal)] group-hover:text-white transition-all" />
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base font-medium text-[var(--foreground)] group-hover:text-white transition-all">
                      {feature}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* Contact Section */}
          {place.contact && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-6 text-center">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
                {place.contact.phone && (
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded-lg sm:rounded-xl border border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-800 font-medium">{place.contact.phone}</p>
                    </div>
                  </div>
                )}

                {place.contact.email && (
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded-lg sm:rounded-xl border border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email</p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-800 font-medium break-all">{place.contact.email}</p>
                    </div>
                  </div>
                )}

                {place.contact.website && (
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded-lg sm:rounded-xl border border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Website</p>
                      <a href={place.contact.website} target="_blank" rel="noopener noreferrer"
                        className="text-xs sm:text-sm lg:text-base text-teal-600 hover:text-teal-700 font-medium break-all">
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {place.contact.address && (
                  <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded-lg sm:rounded-xl border border-gray-100 sm:col-span-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Address</p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-800 font-medium leading-relaxed">{place.contact.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {place.contact.socialMedia && (
                <div className="mt-6 sm:mt-8 text-center">
                  <p className="text-sm text-gray-500 mb-4">Follow us on social media</p>
                  <div className="flex justify-center space-x-4">
                    {place.contact.socialMedia.facebook && (
                      <a
                        href={place.contact.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 hover:scale-105 shadow-md transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.404.595 24 1.326 24h11.497v-9.294H9.692v-3.622h3.131V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.674V1.326C24 .595 23.405 0 22.675 0z" />
                        </svg>
                      </a>
                    )}

                    {place.contact.socialMedia.twitter && (
                      <a
                        href={place.contact.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 shadow-md transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M20.944 3H17.8l-4.375 5.99L8.457 3H2.25l6.877 9.244L2.25 21h3.142l4.816-6.59 5.212 6.59h6.53l-7.09-9.17L20.944 3zm-4.111 16h-1.74l-2.943-3.717-4.027 3.717H6.607l5.728-5.278L16.833 19z" />
                        </svg>
                      </a>
                    )}

                    {place.contact.socialMedia.instagram && (
                      <a
                        href={place.contact.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:opacity-90 hover:scale-105 shadow-md transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0h-9z" />
                          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6.5.5a1.5 1.5 0 1 1-3.001.001A1.5 1.5 0 0 1 18.5 5.5z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Branches Section */}
          {place.branches && place.branches.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm  rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-2">
                  Our Branches
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-light">
                  {place.branches.length} {place.branches.length === 1 ? 'location' : 'locations'} to serve you better
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {place.branches.map((branch, index) => (
                  <div
                    key={index}
                    className="group bg-gray-50/50  cursor-pointer rounded-xl sm:rounded-2xl border border-[var(--bronze)] overflow-hidden hover:shadow-lg  transition-all duration-300"
                  >
                    {branch.image && (
                      <div className="relative h-32 sm:h-40 overflow-hidden">
                        <Image
                          src={`${BASE_IMAGE_URL}${branch.image}`}
                          alt={branch.name}
                          fill
                          unoptimized
                          quality={90}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start space-x-2 mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[var(--bronze)]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--bronze)]" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-[var(--teal)] leading-tight">
                          {branch.name}
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {branch.address}
                          </p>
                        </div>

                        {branch.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-gray-600 font-medium">
                              {branch.phone}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {place.gallery?.length >= 1 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-2">
                  Place Images
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-light">
                  {place.gallery.length} {place.gallery.length === 1 ? 'image' : 'images'} showcasing this place
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {place.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="group cursor-pointer relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Image
                      src={`${BASE_IMAGE_URL}${img}`}
                      alt={`${place.name} image ${i + 1}`}
                      fill
                      unoptimized
                      quality={90}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Image indicator */}
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                        {i + 1} of {place.gallery.length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 sm:h-12" />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]" />
      </div>

      {places.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 mt-16 py-10 bg-gradient-to-br from-slate-50 via-white to-slate-100">
          {/* Header */}
          <div className="text-center mb-14 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="w-80 h-80 bg-gradient-to-br from-[var(--bronze)] to-[var(--teal)] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-10 h-1 bg-gradient-to-r from-[var(--bronze)] to-[var(--teal)] rounded-full"></div>
                <span className="text-xl">✨</span>
                <div className="w-10 h-1 bg-gradient-to-r from-[var(--teal)] to-[var(--bronze)] rounded-full"></div>
              </div>

              <h2
                className="font-black uppercase tracking-wide text-[var(--teal)] mb-3"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '0.1em' }}
              >
                More {categoryName.replace('-', ' ')} in Quetta
              </h2>

              <p className="text-gray-600 text-lg font-medium max-w-xl mx-auto">
                Discover more amazing spots like this
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => {
              // Random 2 places for this card
              const picks = places
                .filter(p => slugify(p.name) !== placeSlug)
                .sort(() => 0.5 - Math.random())
                .slice(0, 2);

              return (
                <div key={i} className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 h-full">
                  {/* Gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--bronze)] via-[var(--teal)] to-[var(--bronze)] opacity-90 rounded-3xl p-0.5">
                    <div className="w-full h-full bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl"></div>
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[220px]">
                    <div>
                      <h3 className="text-xl font-black text-[var(--teal)] mb-4 leading-tight group-hover:text-[var(--bronze)] transition-colors duration-300">
                        Top picks for you
                      </h3>

                      <div className="space-y-3">
                        {picks.map((p, idx) => (
                          <Link
                            key={idx}
                            href={`/category/${categoryName}/${slugify(p.name)}`}
                            className="flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300 group/place"
                          >
                            <div className="w-2 h-2 bg-[var(--bronze)] rounded-full group-hover/place:scale-150 transition-transform"></div>
                            <span className="text-sm font-bold text-[var(--teal)] truncate flex-1">
                              {p.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-1 bg-gradient-to-r from-[var(--bronze)] to-[var(--teal)] rounded-full group-hover:w-12 transition-all duration-500"></div>
                          <span className="text-xs font-bold text-[var(--teal)] opacity-70 group-hover:opacity-100 transition-opacity">
                            EXPLORE
                          </span>
                        </div>
                        <div className="w-8 h-8 bg-[var(--teal)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <span className="text-white text-sm"><ArrowRight size={18} /></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[var(--bronze)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Decorative lights */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--teal)]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default page