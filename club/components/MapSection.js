import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaList } from 'react-icons/fa';

// Import Map dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-night-navy/50 rounded-xl flex items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

const MapSection = ({ venues }) => {
  const [activeVenue, setActiveVenue] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

  return (
    <section className="py-16 bg-night-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-display">Explore Toronto Nightlife</h2>
          
          <div className="bg-night-navy p-1 rounded-full flex">
            <button 
              className={`px-4 py-2 rounded-full flex items-center ${viewMode === 'map' ? 'bg-neon-blue text-white' : 'text-gray-400'}`}
              onClick={() => setViewMode('map')}
            >
              <FaMapMarkerAlt className="mr-2" /> Map
            </button>
            <button 
              className={`px-4 py-2 rounded-full flex items-center ${viewMode === 'list' ? 'bg-neon-blue text-white' : 'text-gray-400'}`}
              onClick={() => setViewMode('list')}
            >
              <FaList className="mr-2" /> List
            </button>
          </div>
        </div>
        
        <div className="bg-night-navy rounded-xl overflow-hidden shadow-lg">
          {viewMode === 'map' ? (
            <div className="h-96">
              <Map venues={venues} activeVenue={activeVenue} setActiveVenue={setActiveVenue} />
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map((venue) => (
                <motion.div 
                  key={venue.id}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setActiveVenue(venue.id);
                    setViewMode('map');
                  }}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeVenue === venue.id ? 'bg-neon-blue/20 neon-border' : 'bg-night-black hover:bg-night-black/80'}`}
                >
                  <h3 className="font-bold text-lg">{venue.name}</h3>
                  <p className="text-gray-400 text-sm">{venue.location}</p>
                  <p className="text-xs text-neon-blue mt-1">{venue.musicType}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Can't find your favorite spot?</p>
          <a 
            href="/submit-venue" 
            className="inline-block bg-transparent border border-neon-pink text-neon-pink px-6 py-3 rounded-full hover:bg-neon-pink hover:text-white transition-colors"
          >
            Submit a Venue
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapSection; 