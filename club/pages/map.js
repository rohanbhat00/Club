import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaList, FaMapMarkerAlt } from 'react-icons/fa';

// Import Map dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-night-navy/50 flex items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [activeVenue, setActiveVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showSidebar, setShowSidebar] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'grid'

  const venueTypes = ['All', 'Nightclub', 'Lounge', 'Bar'];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('/api/venues');
        const data = await response.json();
        
        // Transform data for the map component
        const mappedVenues = data.map(venue => ({
          id: venue.id,
          name: venue.name,
          lat: venue.coordinates.lat,
          lng: venue.coordinates.lng,
          location: venue.location,
          musicType: venue.musicType,
          type: venue.type,
          image: venue.image,
          rating: venue.rating,
          isOpen: venue.isOpen
        }));
        
        setVenues(mappedVenues);
        setFilteredVenues(mappedVenues);
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
    
    setFilteredVenues(results);
  }, [searchQuery, filterType, venues]);

  return (
    <div className="min-h-screen bg-night-dark flex flex-col">
      <Head>
        <title>Nightlife Map | TONight - Toronto Nightlife</title>
        <meta name="description" content="Interactive map of Toronto's best nightlife venues - find clubs, bars, and lounges near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="flex-1 pt-16 flex flex-col">
        <div className="py-4 px-4 bg-night-black border-b border-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold font-display">Toronto Nightlife Map</h1>
            
            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          {showSidebar && (
            <motion.div 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-full md:w-96 bg-night-black overflow-y-auto"
            >
              <div className="p-4">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search venues..."
                      className="w-full bg-night-navy/50 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {venueTypes.map((type) => (
                      <button
                        key={type}
                        className={`px-3 py-1 rounded-full text-sm ${filterType === type ? 'bg-neon-blue text-white' : 'bg-night-navy/50 text-gray-300'}`}
                        onClick={() => setFilterType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4 flex border-b border-gray-800 pb-2">
                  <button
                    className={`flex items-center px-3 py-1 ${view === 'list' ? 'text-neon-blue' : 'text-gray-400'}`}
                    onClick={() => setView('list')}
                  >
                    <FaList className="mr-1" /> List
                  </button>
                  <button
                    className={`flex items-center px-3 py-1 ${view === 'grid' ? 'text-neon-blue' : 'text-gray-400'}`}
                    onClick={() => setView('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg> Grid
                  </button>
                  <div className="ml-auto text-gray-400 text-sm">
                    {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-pulse text-neon-blue">Loading venues...</div>
                  </div>
                ) : filteredVenues.length === 0 ? (
                  <div className="bg-night-navy/50 rounded-xl p-4 text-center">
                    <h3 className="text-lg mb-2">No venues found</h3>
                    <p className="text-gray-400 text-sm">Try adjusting your search filters</p>
                  </div>
                ) : view === 'list' ? (
                  <div className="space-y-3">
                    {filteredVenues.map((venue) => (
                      <motion.div 
                        key={venue.id}
                        whileHover={{ y: -2 }}
                        onClick={() => setActiveVenue(venue.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${activeVenue === venue.id ? 'bg-neon-blue/20 border border-neon-blue/50' : 'bg-night-navy/50 hover:bg-night-navy/70'}`}
                      >
                        <div className="flex">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-3">
                            <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{venue.name}</h3>
                            <div className="flex items-center text-gray-400 text-xs">
                              <FaMapMarkerAlt className="mr-1" />
                              <span>{venue.location}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="bg-night-black px-2 py-0.5 rounded text-xs">{venue.type}</span>
                              <span className="text-xs text-gray-400">
                                {venue.isOpen ? 'Open Now' : 'Closed'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredVenues.map((venue) => (
                      <motion.div 
                        key={venue.id}
                        whileHover={{ y: -2 }}
                        onClick={() => setActiveVenue(venue.id)}
                        className={`rounded-lg cursor-pointer transition-all overflow-hidden ${activeVenue === venue.id ? 'ring-2 ring-neon-blue' : ''}`}
                      >
                        <div className="relative h-24">
                          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <h3 className="font-bold text-white text-sm leading-tight">{venue.name}</h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Map */}
          <div className="flex-1 relative">
            <div className="absolute inset-0">
              <Map venues={filteredVenues} activeVenue={activeVenue} setActiveVenue={setActiveVenue} />
            </div>
            
            {/* Toggle Sidebar Button (Mobile Only) */}
            {!showSidebar && (
              <button 
                className="absolute top-4 left-4 bg-night-black p-3 rounded-full shadow-lg md:hidden z-10"
                onClick={() => setShowSidebar(true)}
              >
                <FaList className="text-neon-blue" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 