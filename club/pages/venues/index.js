import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import VenueCard from '../../components/VenueCard';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const venueTypes = ['All', 'Nightclub', 'Lounge', 'Bar'];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('/api/venues');
        const data = await response.json();
        setVenues(data);
        setFilteredVenues(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venues:', error);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    let results = [...venues];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        venue => 
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.musicType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'All') {
      results = results.filter(venue => venue.type === filterType);
    }
    
    // Apply sorting
    results = results.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    
    setFilteredVenues(results);
  }, [searchQuery, filterType, sortBy, venues]);

  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>Venues | TONight - Toronto Nightlife</title>
        <meta name="description" content="Discover the best nightlife venues in Toronto - clubs, bars, lounges and more!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-display mb-4 md:mb-0">Explore Toronto Venues</h1>
            
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search venues..."
                  className="bg-night-navy/80 rounded-full px-4 py-2 pl-10 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <button 
                className="bg-night-navy/80 text-white p-3 rounded-full hover:bg-night-navy"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
              </button>
            </div>
          </div>
          
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-night-navy/80 rounded-xl p-4 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-white mb-2 font-semibold">Venue Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {venueTypes.map((type) => (
                      <button
                        key={type}
                        className={`px-3 py-1 rounded-full text-sm ${filterType === type ? 'bg-neon-blue text-white' : 'bg-night-black text-gray-300'}`}
                        onClick={() => setFilterType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white mb-2 font-semibold">Sort By</h3>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${sortBy === 'rating' ? 'bg-neon-blue text-white' : 'bg-night-black text-gray-300'}`}
                      onClick={() => setSortBy('rating')}
                    >
                      <FaSortAmountDown className="mr-1" /> Rating
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${sortBy === 'name' ? 'bg-neon-blue text-white' : 'bg-night-black text-gray-300'}`}
                      onClick={() => setSortBy('name')}
                    >
                      <FaSortAmountDown className="mr-1" /> Name
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-neon-blue">Loading venues...</div>
            </div>
          ) : filteredVenues.length === 0 ? (
            <div className="bg-night-navy/50 rounded-xl p-8 text-center">
              <h3 className="text-xl mb-2">No venues found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-night-black py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TONight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 