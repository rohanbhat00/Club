import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheck } from 'react-icons/fa';

const GuestlistCard = ({ guestlist }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-night-black rounded-xl overflow-hidden shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={guestlist.image} 
          alt={guestlist.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-neon-purple px-3 py-1 rounded-full text-xs font-semibold">
          {guestlist.spots} Spots
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3">{guestlist.title}</h3>
        
        <div className="flex items-center text-gray-400 mb-2">
          <FaCalendarAlt className="mr-2" />
          <span>{guestlist.date}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>{guestlist.venue}</span>
        </div>
        
        <div className="space-y-3 mb-4">
          {guestlist.perks.split(',').map((perk, index) => (
            <div key={index} className="flex items-start">
              <FaCheck className="text-neon-purple mt-1 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-300">{perk.trim()}</span>
            </div>
          ))}
        </div>
        
        <button className="w-full bg-neon-purple text-white py-2 rounded-full hover:bg-opacity-80 transition-colors">
          Join Guestlist
        </button>
      </div>
    </motion.div>
  );
};

export default GuestlistCard; 