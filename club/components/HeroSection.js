import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaMusic } from 'react-icons/fa';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/toronto-nightlife.jpg" 
          alt="Toronto Nightlife" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-black/70 via-night-black/60 to-night-dark"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 font-display"
        >
          Toronto's Nightlife <span className="text-neon-pink neon-text">at Your Fingertips</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Discover the hottest clubs, bars, and events in the city tonight
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-full p-2 flex items-center mb-8"
        >
          <div className="flex-1 flex items-center">
            <FaSearch className="ml-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for venues, events, or DJs..." 
              className="w-full bg-transparent border-none outline-none px-4 py-2 text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="hidden md:flex items-center border-l border-gray-600">
            <button 
              className={`px-4 py-2 rounded-full ${searchFilter === 'all' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setSearchFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-full flex items-center ${searchFilter === 'venues' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setSearchFilter('venues')}
            >
              <FaMapMarkerAlt className="mr-2" /> Venues
            </button>
            <button 
              className={`px-4 py-2 rounded-full flex items-center ${searchFilter === 'events' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setSearchFilter('events')}
            >
              <FaCalendarAlt className="mr-2" /> Events
            </button>
            <button 
              className={`px-4 py-2 rounded-full flex items-center ${searchFilter === 'djs' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setSearchFilter('djs')}
            >
              <FaMusic className="mr-2" /> DJs
            </button>
          </div>
          
          <button className="bg-neon-pink text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
            Search
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-neon-blue">200+</p>
            <p className="text-gray-400">Venues</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-neon-pink">50+</p>
            <p className="text-gray-400">Events Tonight</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-neon-purple">1000+</p>
            <p className="text-gray-400">Happy Nightlifers</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection; 