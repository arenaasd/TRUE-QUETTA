"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Categories = {
  hotels: 'Top Hotels to Stay',
  restaurants: 'Top Restaurants to Dine',
  bakeries: 'Top Bakeries to Satisfy Your Sweet Tooth',
  cafes: 'Best Cafes to Relax',
  parks: 'Best Parks to Visit',
  malls: 'Top Shopping Malls to Explore',
  hospitals: 'Hospital For Emergency',
  police: 'Police Stations to Contact'
};

const taglines = {
  cafes: "☕ Love Coffee or Tea? Check out top cafes in Quetta!",
  restaurants: "🍽 Hungry? Explore top restaurants in Quetta!",
  hotels: "🏨 Need stay? Find best hotels in Quetta!",
  bakeries: "🧁 Sweet tooth? Explore bakeries in Quetta!",
  parks: "🌳 Relax outdoors? Visit parks in Quetta!",
  malls: "🛍️ Find the best brands & deals at Quetta’s top malls!",
  hospitals: "🏥 Need care? Find trusted hospitals in Quetta!",
  police: "👮‍♂️ Stay safe! Locate police stations in Quetta!"
};

const accentColors = {
  cafes: "from-[#D2691E] via-[#CD853F] to-[#8B4513]",
  restaurants: "from-[#CD853F] via-[#DEB887] to-[#A0522D]",
  hotels: "from-[#8B4513] via-[#A0522D] to-[#5C4033]",
  bakeries: "from-[#FFA07A] via-[#F4A460] to-[#CD5C5C]",
  parks: "from-[#228B22] via-[#32CD32] to-[#006400]",
  malls: "from-[#800080] via-[#9932CC] to-[#8A2BE2]",
  hospitals: "from-[#DC143C] via-[#FF6F61] to-[#FFB6C1]",
  police: "from-[#1E3A8A] via-[#3B82F6] to-[#60A5FA]"
};

const cardBackgrounds = {
  cafes: "from-white via-slate-50 to-white",
  restaurants: "from-white via-slate-50 to-white",
  hotels: "from-white via-slate-50 to-white",
  bakeries: "from-white via-slate-50 to-white",
  parks: "from-white via-slate-50 to-white",
  malls: "from-white via-slate-50 to-white",
  hospitals: "from-red-50 via-white to-red-100",
  police: "from-blue-50 via-white to-blue-100"
};

const icons = {
  cafes: "☕",
  restaurants: "🍽",
  hotels: "🏨",
  bakeries: "🧁",
  parks: "🌳",
  malls: "🛍️",
  hospitals: "🏥",
  police: "👮‍♂️"
};

const RandomLinks = ({ currentCategory, allPlaces }) => {
  const router = useRouter();
  const otherCategories = Object.keys(Categories).filter(cat => cat !== currentCategory);
  const shuffled = [...otherCategories].sort(() => 0.5 - Math.random());
  const picks = shuffled.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16 py-10 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="text-center mb-14 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-96 h-96 bg-gradient-to-br from-[var(--bronze)] to-[var(--teal)] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-[var(--bronze)] to-[var(--teal)] rounded-full"></div>
            <span className="text-2xl">✨</span>
            <div className="w-12 h-1 bg-gradient-to-r from-[var(--teal)] to-[var(--bronze)] rounded-full"></div>
          </div>

          <h2
            className="font-black uppercase tracking-wide text-[var(--teal)] mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '0.1em' }}
          >
            More places you might love in Quetta
          </h2>

          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            Discover amazing destinations beyond your current selection
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {picks.map((category, i) => {
          const places = (allPlaces?.[category] || [])
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

          return (
            <div
              key={i}
              className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 h-full"
              onClick={() => router.push(`/category/${category}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(`/category/${category}`);
                }
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[category]} opacity-90 rounded-3xl p-0.5`}>
                <div className={`w-full h-full bg-gradient-to-br ${cardBackgrounds[category]} rounded-3xl`}></div>
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{icons[category]}</span>
                  </div>

                  <h3 className="text-xl font-black text-[var(--teal)] mb-4 leading-tight group-hover:text-[var(--bronze)] transition-colors duration-300">
                    {taglines[category]}
                  </h3>

                  <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                    Discover {Categories[category].toLowerCase()} in Quetta.
                  </p>

                  <div className="space-y-3">
                    {places.map((place, idx) => (
                      <Link
                        href={`/category/${category}/${encodeURIComponent(place.name.toLowerCase().replace(/\s+/g, '-'))}`}
                        key={idx}
                        className="flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300 group/place"
                      >
                        <div className="w-2 h-2 bg-[var(--bronze)] rounded-full group-hover/place:scale-150 transition-transform"></div>
                        <span className="text-sm font-bold text-[var(--teal)] truncate flex-1">
                          {place.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[var(--teal)] opacity-0 group-hover/place:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-1 bg-gradient-to-r from-[var(--bronze)] to-[var(--teal)] rounded-full group-hover:w-12 transition-all duration-500"></div>
                    <span className="text-xs font-bold text-[var(--teal)] opacity-70 group-hover:opacity-100 transition-opacity">
                      EXPLORE
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-[var(--teal)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[var(--bronze)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--teal)]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RandomLinks;