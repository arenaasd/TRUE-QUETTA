'use client'
import { useEffect, useState } from 'react';
import {
  Utensils, Bed, TreePine, Cake, MapPin, Star, ArrowRight, Search,
  Users, Award, Shield, Zap, Globe, Facebook, Instagram, Youtube, ArrowUp, Heart, Coffee,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';


export default function CompleteLandingPage() {
  // Typing animation state
  const words = ['Restaurants', 'Hotels', 'Parks', 'Bakeries', "Cafes"];
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);


  const BASE_IMAGE_URL = "https://tgqbqycxltdgbdyewxth.supabase.co/storage/v1/object/public";


  // Background images for hero section
  const heroBackgrounds = [
    `${BASE_IMAGE_URL}/images/restaurants/usmania/usmania.webp`,
    `${BASE_IMAGE_URL}/images/hotels/sarena/sarena-hotel.jpg`,
    `${BASE_IMAGE_URL}/images/parks/hazarchil/hazarchil.webp`,
    `${BASE_IMAGE_URL}/images/bakeries/dorado/dorado.webp`,
    `${BASE_IMAGE_URL}/images/cafes/beehive/beehive.webp`,
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Image slider state

  const categoryRef = useRef(null);

  const scrollToCategories = () => {
    if (categoryRef.current) {
      const y = categoryRef.current.getBoundingClientRect().top + window.scrollY - 70; // 70 = your header height
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };




  const categoryMap = {
    'Top Restaurants': 'restaurants',
    'Popular Hotels': 'hotels',
    'Famous Bakeries': 'bakeries',
    'Local Parks': 'parks'
  };

  useEffect(() => {
    const type = () => {
      const current = words[wordIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setCurrentWord(current.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      } else {
        if (charIndex < current.length) {
          setCurrentWord(current.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? 80 : 120);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);



  // Background image rotation effect
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(bgTimer);
  }, []);



  const categories = [
    {
      icon: Utensils,
      title: 'Top Restaurants',
      description: 'Discover the best dining experiences in Quetta',
      color: 'bg-orange-50 text-orange-600',
      hoverColor: 'group-hover:bg-orange-100 group-hover:text-orange-700',
      count: '17+'
    },
    {
      icon: Bed,
      title: 'Popular Hotels',
      description: 'Comfortable stays for every budget in Quetta',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'group-hover:bg-blue-100 group-hover:text-blue-700',
      count: '15+'
    },
    {
      icon: Cake,
      title: 'Famous Bakeries',
      description: 'Fresh baked goods and treats in Quetta',
      color: 'bg-pink-50 text-pink-600',
      hoverColor: 'group-hover:bg-pink-100 group-hover:text-pink-700',
      count: '16+'
    },
    {
      icon: TreePine,
      title: 'Local Parks',
      description: 'Natural beauty spots to relax with family in Quetta',
      color: 'bg-green-50 text-green-600',
      hoverColor: 'group-hover:bg-green-100 group-hover:text-green-700',
      count: '8+'
    }
  ];



  const features = [
    {
      icon: Shield,
      title: 'Verified Reviews',
      description: 'All reviews are verified from real visitors to ensure authenticity and reliability.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant notifications about new places, offers, and events happening in Quetta.'
    },
    {
      icon: Globe,
      title: 'Local Insights',
      description: 'Discover hidden gems and local favorites recommended by Quetta residents.'
    }
  ];

  const testimonials = [
    {
      name: 'F&S Adventures',
      role: 'Local Food Vlogger',
      image: '/reviews/vlogger.jpeg',
      rating: 5,
      text: 'This platform helped me discover amazing restaurants I never knew existed in Quetta. The recommendations are spot-on!'
    },
    {
      name: 'Fatima Ali',
      role: 'Tourism Officer',
      image: '/reviews/women.webp',
      rating: 5,
      text: 'As someone working in tourism, I recommend this site to all visitors. It showcases the best of what Quetta has to offer.'
    },
    {
      name: 'Liaqat Sasoli',
      role: 'Business Owner',
      image: '/reviews/local.jpg',
      rating: 5,
      text: 'Being listed here brought more customers to my restaurant. The platform truly supports local businesses.'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    explore: [
      { name: 'Top Restaurants', href: 'http://localhost:3000/category/restaurants' },
      { name: 'Best Hotels', href: 'http://localhost:3000/category/hotels' },
      { name: 'Popular Parks', href: 'http://localhost:3000/category/parks' },
      { name: 'Local Cafes', href: 'http://localhost:3000/category/cafes' },
      { name: 'Fresh Bakeries', href: 'http://localhost:3000/category/bakeries' }
    ]
  };
  // Social media links


  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: Youtube, href: '#', color: 'hover:text-red-400' }
  ];



  const stats = [
    { icon: MapPin, count: '60+', label: 'Places Listed' },
    { icon: Users, count: '1200+', label: 'Happy Users' },
    { icon: Star, count: '4.9', label: 'Average Rating' },
    { icon: Award, count: '100%', label: 'Verified Places' }
  ];



  return (
    <div className="w-full font-sans">
      <style jsx>{`
        :root {
          --teal: #0B5563;
          --bronze: #5C1C26;
        }
      `}</style>

      {/* 1. NEW HERO SECTION WITH ROTATING BACKGROUND IMAGES */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroBackgrounds.map((bg, index) => (
            <Image
              key={index}
              src={bg}
              quality={100}
              alt={`Hero Background ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className={`transition-opacity duration-1000 ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
              priority={index === 0} // preload first hero image
            />
          ))}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 sm:mb-8">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Discover Quetta's Best</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-black leading-tight mb-6 sm:mb-8">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2">
                Discover the Best
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl shadow-2xl lg:text-6xl mb-2" style={{ color: 'var(--teal)' }}>
                {currentWord}
                <span className="animate-pulse text-white">|</span>
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                in Quetta
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Your ultimate guide to discovering the finest dining, accommodation, and entertainment experiences in the beautiful city of Quetta.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16">
              <button
                onClick={scrollToCategories}
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg cursor-pointer bg-[var(--teal)] backdrop-blur-md hover:bg-[var(--bronze)]/80"
                style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors" />
                Start Exploring
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform group-hover:text-white" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-4xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-md mb-3 sm:mb-4">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.count}</h3>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={categoryRef} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6" style={{ color: 'var(--teal)' }}>
              Explore Categories
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Browse through our carefully curated categories to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${categoryMap[category.title]}`}
                className="group bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-[var(--bronze)] hover:shadow-xl hover:-translate-y-2 cursor-pointer no-underline"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${category.color} ${category.hoverColor}`}>
                    <category.icon className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 border border-gray-200 px-3 py-1 rounded-full group-hover:border-[var(--bronze)] group-hover:text-[var(--bronze)] transition-all duration-300">
                    {category.count}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--teal)] transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-600 mb-6 text-sm sm:text-base">{category.description}</p>

                <div className="flex items-center text-sm sm:text-base font-bold group-hover:text-[var(--bronze)] transition-colors" style={{ color: 'var(--teal)' }}>
                  Explore now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* 3. FEATURES SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6" style={{ color: 'var(--teal)' }}>
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the most accurate and up-to-date information about Quetta's best places
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-6 rounded-full bg-white border-2 border-gray-100 mb-6 sm:mb-8 group-hover:border-[var(--bronze)] transition-all duration-300 group-hover:scale-110 shadow-sm">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: 'var(--teal)' }} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6" style={{ color: 'var(--teal)' }}>
              What People Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from locals and visitors who have discovered amazing places through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[var(--bronze)] hover:shadow-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Image
                    width={80}
                    height={80}
                    quality={90}
                    priority
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. REDESIGNED FOOTER SECTION */}
      <div className="w-full relative">



        <footer className="bg-gray-900 text-white relative">

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--teal)' }}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">True Quetta</h3>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Your ultimate guide to discovering the finest dining, accommodation, and entertainment experiences in the beautiful city of Quetta.
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                    <a
                      href="mailto:arzunoteam@gmail.com"
                      className="text-sm hover:text-white transition-colors duration-300"
                    >
                      arzunoteam@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                    <span className="text-sm">Quetta, Balochistan, Pakistan</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-3 bg-gray-800 rounded-full transition-all duration-300 hover:bg-gray-700 hover:scale-110 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                  Quick Links
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/category/restaurants"
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 transform inline-block group"
                    >
                      <span className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 group-hover:text-orange-400 transition-colors" />
                        Top Restaurants
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/hotels"
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 transform inline-block group"
                    >
                      <span className="flex items-center gap-2">
                        <Bed className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                        Popular Hotels
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/bakeries"
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 transform inline-block group"
                    >
                      <span className="flex items-center gap-2">
                        <Cake className="w-4 h-4 group-hover:text-pink-400 transition-colors" />
                        Famous Bakeries
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/parks"
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 transform inline-block group"
                    >
                      <span className="flex items-center gap-2">
                        <TreePine className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                        Top Parks
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/cafes"
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 transform inline-block group"
                    >
                      <span className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 group-hover:text-[#fdff9b] transition-colors" />
                        Best Cafes
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Get Involved */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                  Get Involved
                </h4>

                {/* Suggest Place CTA */}
                <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700 hover:border-[var(--teal)] transition-all duration-300 group">
                  <h5 className="font-bold text-white mb-3 transition-colors">
                    Know a Great Place?
                  </h5>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Want to add your business or favorite spot? We’d love to hear from you! Share your recommendations and help others discover the best of Quetta.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-white group bg-[var(--teal)] hover:bg-[var(--bronze)]"
                  >
                    <MapPin className="w-4 h-4" />
                    Suggest a Place
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="text-center lg:text-left">
                  <p className="text-gray-400 text-sm mb-4">
                    Join our community of local explorers and food enthusiasts!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                {/* Copyright Text */}
                <p className="text-gray-200 text-sm font-medium text-center sm:text-left transition-all duration-300 hover:text-white hover:tracking-wide">
                  © 2025 True Quetta. All rights reserved.
                </p>

              </div>
              {/* Decorative Line */}
              <div className="mt-4 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[var(--teal)] to-[var(--bronze)]"></div>
            </div>
          </div>


          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-8 p-4 cursor-pointer text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg z-50 bg-[var(--teal)] backdrop-blur-md hover:bg-[var(--bronze)]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </footer>
      </div>
    </div>
  )
}