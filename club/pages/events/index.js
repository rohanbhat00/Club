import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import EventCard from '../../components/EventCard';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaCalendarAlt, FaSortAmountDown } from 'react-icons/fa';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const eventCategories = ['All', 'DJ Night', 'EDM', 'R&B', 'Techno', 'Afro House', 'Hip Hop'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let results = [...events];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        event => 
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterCategory !== 'All') {
      results = results.filter(event => event.category === filterCategory);
    }
    
    // Apply sorting
    results = results.sort((a, b) => {
      if (sortBy === 'date') {
        // Simple string comparison for dates in format "Month DD, YYYY"
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'price') {
        return parseInt(a.price) - parseInt(b.price);
      }
      return 0;
    });
    
    setFilteredEvents(results);
  }, [searchQuery, filterCategory, sortBy, events]);

  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>Events | TONight - Toronto Nightlife</title>
        <meta name="description" content="Discover the best nightlife events in Toronto - club nights, DJ sets, parties and more!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-display mb-4 md:mb-0">Toronto Nightlife Events</h1>
            
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="bg-night-navy/80 rounded-full px-4 py-2 pl-10 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
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
                  <h3 className="text-white mb-2 font-semibold">Event Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventCategories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${filterCategory === category ? 'bg-neon-pink text-white' : 'bg-night-black text-gray-300'}`}
                        onClick={() => setFilterCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white mb-2 font-semibold">Sort By</h3>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${sortBy === 'date' ? 'bg-neon-pink text-white' : 'bg-night-black text-gray-300'}`}
                      onClick={() => setSortBy('date')}
                    >
                      <FaCalendarAlt className="mr-1" /> Date
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${sortBy === 'price' ? 'bg-neon-pink text-white' : 'bg-night-black text-gray-300'}`}
                      onClick={() => setSortBy('price')}
                    >
                      <FaSortAmountDown className="mr-1" /> Price
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-neon-pink">Loading events...</div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-night-navy/50 rounded-xl p-8 text-center">
              <h3 className="text-xl mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter to stay updated with the latest events</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-night-navy/50 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
              />
              <button className="bg-neon-pink text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
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