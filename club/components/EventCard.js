import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaBookmark } from 'react-icons/fa';
import Link from 'next/link';

const EventCard = ({ event }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-night-navy rounded-xl overflow-hidden shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors">
            <FaBookmark className="text-white" />
          </button>
        </div>
        {event.featured && (
          <div className="absolute top-3 left-3 bg-neon-pink px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold truncate">{event.title}</h3>
          <span className="bg-night-black px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-2">
          <FaCalendarAlt className="mr-2" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>{event.venue}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <FaClock className="mr-2" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-neon-blue font-semibold">
            {event.price === 'Free' ? 'Free Entry' : `$${event.price}`}
          </span>
          <Link href={`/events/${event.id}`}>
            <a className="bg-neon-pink text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors text-sm">
              Details
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard; 