import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaMusic, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

const VenueCard = ({ venue }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-night-black rounded-xl overflow-hidden shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={venue.image} 
          alt={venue.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors">
            <FaHeart className="text-white" />
          </button>
        </div>
        {venue.trending && (
          <div className="absolute top-3 left-3 bg-neon-blue px-3 py-1 rounded-full text-xs font-semibold">
            Trending
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold truncate">{venue.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{venue.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-400 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span className="text-sm truncate">{venue.location}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <FaMusic className="mr-2" />
          <span className="text-sm">{venue.musicType}</span>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2 mb-4">
          <span className="bg-night-navy px-2 py-1 rounded text-xs">{venue.type}</span>
          {venue.tags && venue.tags.map((tag, index) => (
            <span key={index} className="bg-night-navy px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {venue.isOpen ? 'Open Now' : 'Opens at 10PM'}
          </span>
          <Link href={`/venues/${venue.id}`}>
            <a className="bg-neon-blue text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors text-sm">
              Details
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard; 