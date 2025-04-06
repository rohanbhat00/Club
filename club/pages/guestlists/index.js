import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import GuestlistCard from '../../components/GuestlistCard';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Guestlists() {
  const [guestlists, setGuestlists] = useState([]);
  const [filteredGuestlists, setFilteredGuestlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Current week dates for the filter
  const getDates = () => {
    const dates = [];
    const now = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      
      const options = { month: 'short', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      
      dates.push({
        value: formattedDate,
        label: formattedDate,
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    
    return dates;
  };

  const dates = getDates();

  useEffect(() => {
    const fetchGuestlists = async () => {
      try {
        const response = await fetch('/api/guestlists');
        const data = await response.json();
        setGuestlists(data);
        setFilteredGuestlists(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching guestlists:', error);
        setLoading(false);
      }
    };

    fetchGuestlists();
  }, []);

  useEffect(() => {
    let results = [...guestlists];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        guestlist => 
          guestlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guestlist.venue.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply date filter
    if (selectedDate) {
      results = results.filter(guestlist => 
        guestlist.date.includes(selectedDate)
      );
    }
    
    setFilteredGuestlists(results);
  }, [searchQuery, selectedDate, guestlists]);

  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>Exclusive Guestlists | TONight - Toronto Nightlife</title>
        <meta name="description" content="Get on the most exclusive guestlists for Toronto's hottest nightlife venues" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-3">Exclusive Guestlists</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Skip the line, get discounted entry, and enjoy VIP perks at Toronto's top nightlife venues</p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by venue or event..."
                  className="w-full bg-night-navy/80 rounded-full px-6 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Date Filter */}
              <div className="overflow-x-auto py-2">
                <div className="flex space-x-2 min-w-max">
                  <button
                    className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg ${selectedDate === '' ? 'bg-neon-purple text-white' : 'bg-night-navy/50 text-gray-300'}`}
                    onClick={() => setSelectedDate('')}
                  >
                    <FaCalendarAlt className="mb-1" />
                    <span className="text-xs">All Dates</span>
                  </button>
                  
                  {dates.map((date) => (
                    <button
                      key={date.value}
                      className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg ${selectedDate === date.value ? 'bg-neon-purple text-white' : 'bg-night-navy/50 text-gray-300'}`}
                      onClick={() => setSelectedDate(date.value)}
                    >
                      <span className="text-xs">{date.day}</span>
                      <span className="text-sm font-semibold">{date.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-neon-purple">Loading guestlists...</div>
            </div>
          ) : filteredGuestlists.length === 0 ? (
            <div className="bg-night-navy/50 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <h3 className="text-xl mb-2">No guestlists found</h3>
              <p className="text-gray-400">Try adjusting your search or check back later for new guestlists</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuestlists.map((guestlist) => (
                <GuestlistCard key={guestlist.id} guestlist={guestlist} />
              ))}
            </div>
          )}
          
          <div className="bg-night-navy rounded-xl p-8 mt-16 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-3">Are you a venue owner or promoter?</h2>
                <p className="text-gray-400 mb-3">List your events and guestlists on TONight to reach thousands of Toronto's most active nightlife enthusiasts.</p>
                <Link href="/submit-venue">
                  <a className="inline-block bg-neon-purple text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                    Partner With Us
                  </a>
                </Link>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-night-black p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <FaMapMarkerAlt className="text-neon-purple" />
                    <span className="font-semibold">200+ Venues</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <FaCalendarAlt className="text-neon-purple" />
                    <span className="font-semibold">50+ Weekly Events</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="font-semibold">10,000+ Users</span>
                  </div>
                </div>
              </div>
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