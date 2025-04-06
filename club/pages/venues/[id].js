import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaClock, FaInstagram, FaFacebook, FaTwitter, FaHeadphones, FaCalendarAlt, FaChevronLeft } from 'react-icons/fa';
import { MdMusicNote, MdNightlife, MdAccessTime } from 'react-icons/md';

// Dynamically import the Map component to prevent SSR issues
const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-night-navy rounded-lg flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

export default function VenueDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [venue, setVenue] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  
  // Fetch venue data
  useEffect(() => {
    if (!id) return;
    
    const fetchVenueDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch venue details
        const venueResponse = await fetch(`/api/venues/${id}`);
        
        if (!venueResponse.ok) {
          throw new Error('Venue not found');
        }
        
        const venueData = await venueResponse.json();
        setVenue(venueData);
        
        // Fetch events at this venue
        const eventsResponse = await fetch(`/api/events?venueId=${id}`);
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching venue details:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchVenueDetails();
  }, [id]);
  
  // Handle loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-night-dark">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-night-navy rounded-full"></div>
            <div className="mt-4 bg-night-navy h-8 w-64 rounded"></div>
            <div className="mt-2 bg-night-navy h-6 w-40 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-night-dark">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link href="/venues">
              <a className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                Back to Venues
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!venue) {
    return null;
  }
  
  // Format times for display
  const formatHours = (hours) => {
    if (!hours) return 'Hours not available';
    
    return hours.map(day => (
      <div key={day.day} className="flex items-center justify-between">
        <span className="text-gray-300 w-20">{day.day}</span>
        <span className="text-right">
          {day.open ? `${day.opening} - ${day.closing}` : 'Closed'}
        </span>
      </div>
    ));
  };
  
  // Build social media links
  const socialLinks = [];
  if (venue.socialMedia) {
    if (venue.socialMedia.instagram) {
      socialLinks.push({
        icon: <FaInstagram className="text-xl" />,
        url: `https://instagram.com/${venue.socialMedia.instagram}`,
        label: 'Instagram'
      });
    }
    if (venue.socialMedia.facebook) {
      socialLinks.push({
        icon: <FaFacebook className="text-xl" />,
        url: venue.socialMedia.facebook,
        label: 'Facebook'
      });
    }
    if (venue.socialMedia.twitter) {
      socialLinks.push({
        icon: <FaTwitter className="text-xl" />,
        url: `https://twitter.com/${venue.socialMedia.twitter}`,
        label: 'Twitter'
      });
    }
  }
  
  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>{venue.name} | TONight - Toronto Nightlife</title>
        <meta name="description" content={`Discover ${venue.name} in Toronto - ${venue.description?.substring(0, 100)}...`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div 
          className="w-full h-64 md:h-80 bg-cover bg-center relative" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(13, 15, 25, 0.4), rgba(13, 15, 25, 0.9)), url(${venue.images?.[0] || '/images/toronto-nightlife.jpg'})` 
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container mx-auto px-4 pb-6">
              <Link href="/venues">
                <a className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
                  <FaChevronLeft className="mr-2" />
                  <span>Back to venues</span>
                </a>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white">{venue.name}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                <div className="flex items-center text-gray-300">
                  <MdNightlife className="mr-2" />
                  <span>{venue.type}</span>
                </div>
                {venue.musicType && (
                  <div className="flex items-center text-gray-300">
                    <MdMusicNote className="mr-2" />
                    <span>{venue.musicType}</span>
                  </div>
                )}
                {venue.priceRange && (
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">$</span>
                    <span>{venue.priceRange}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <div className="bg-night-navy rounded-lg overflow-hidden">
                <div className="flex border-b border-gray-800">
                  <button 
                    className={`px-6 py-3 text-center flex-1 ${activeTab === 'about' ? 'bg-night-black font-semibold text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </button>
                  <button 
                    className={`px-6 py-3 text-center flex-1 ${activeTab === 'events' ? 'bg-night-black font-semibold text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('events')}
                  >
                    Upcoming Events
                  </button>
                  <button 
                    className={`px-6 py-3 text-center flex-1 ${activeTab === 'photos' ? 'bg-night-black font-semibold text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('photos')}
                  >
                    Photos
                  </button>
                </div>
                
                <div className="p-6">
                  {activeTab === 'about' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-4">About {venue.name}</h2>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {venue.description || `${venue.name} is one of Toronto's premier nightlife destinations. Come experience the vibrant atmosphere and enjoy a night out in the city.`}
                      </p>
                      
                      {venue.amenities && venue.amenities.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                            {venue.amenities.map(amenity => (
                              <div key={amenity} className="flex items-center">
                                <span className="w-2 h-2 bg-neon-blue rounded-full mr-2"></span>
                                <span className="text-gray-300">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {venue.musicTypes && venue.musicTypes.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Music</h3>
                          <div className="flex flex-wrap gap-2">
                            {venue.musicTypes.map(music => (
                              <span key={music} className="bg-night-black px-3 py-1 rounded-full text-sm flex items-center">
                                <FaHeadphones className="mr-2 text-neon-pink" />
                                {music}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {activeTab === 'events' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-4">Upcoming Events at {venue.name}</h2>
                      
                      {events.length > 0 ? (
                        <div className="space-y-4">
                          {events.map(event => (
                            <Link href={`/events/${event._id}`} key={event._id}>
                              <a className="block bg-night-black p-4 rounded-lg hover:bg-night-navy transition-colors">
                                <div className="flex items-start gap-4">
                                  <div className="bg-night-navy rounded-lg p-3 text-center min-w-[60px]">
                                    <div className="text-neon-pink font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                                    <div className="text-xl font-bold">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold text-lg">{event.name}</h3>
                                    <div className="flex items-center text-gray-400 text-sm mt-1">
                                      <MdAccessTime className="mr-1" />
                                      <span>{new Date(event.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    {event.ticketPrice && (
                                      <div className="mt-2 text-neon-blue">
                                        {typeof event.ticketPrice === 'number' ? `$${event.ticketPrice}` : event.ticketPrice}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">No upcoming events at this venue. Check back soon!</p>
                      )}
                      
                      <div className="mt-6 text-center">
                        <Link href="/events">
                          <a className="text-neon-blue hover:underline">View all events in Toronto</a>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'photos' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-4">Photos of {venue.name}</h2>
                      
                      {venue.images && venue.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {venue.images.map((image, index) => (
                            <div key={index} className="aspect-w-1 aspect-h-1">
                              <img 
                                src={image} 
                                alt={`${venue.name} - Photo ${index + 1}`}
                                className="object-cover w-full h-full rounded-lg" 
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-400">No photos available for this venue.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Map Section */}
              <div className="bg-night-navy rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold p-6 border-b border-gray-800">Location</h2>
                <div className="h-64">
                  <Map 
                    venues={[venue]} 
                    activeVenue={venue} 
                    setActiveVenue={() => {}}
                  />
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-night-navy rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Venue Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-neon-pink mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-gray-300">{venue.address}</p>
                      <p className="text-gray-300">Toronto, ON</p>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address + ' Toronto')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neon-blue text-sm hover:underline inline-block mt-1"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                  
                  {venue.phone && (
                    <div className="flex items-start">
                      <FaPhone className="text-neon-blue mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a href={`tel:${venue.phone}`} className="text-gray-300 hover:text-white">
                          {venue.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {venue.website && (
                    <div className="flex items-start">
                      <FaGlobe className="text-neon-purple mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold mb-1">Website</h3>
                        <a 
                          href={venue.website.startsWith('http') ? venue.website : `https://${venue.website}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white break-words"
                        >
                          {venue.website.replace(/(https?:\/\/)?(www\.)?/, '')}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {venue.hours && (
                    <div className="flex items-start">
                      <FaClock className="text-neon-green mt-1 mr-3" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Hours</h3>
                        <div className="space-y-1 text-sm text-gray-300">
                          {formatHours(venue.hours)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Social Media */}
              {socialLinks.length > 0 && (
                <div className="bg-night-navy rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Follow {venue.name}</h2>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-night-black hover:bg-night-dark p-3 rounded-lg transition-colors"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upcoming Events Quick View */}
              <div className="bg-night-navy rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <Link href="/events">
                    <a className="text-neon-blue text-sm hover:underline">View All</a>
                  </Link>
                </div>
                
                {events.length > 0 ? (
                  <div className="space-y-3">
                    {events.slice(0, 3).map(event => (
                      <Link href={`/events/${event._id}`} key={event._id}>
                        <a className="flex items-center p-3 bg-night-black rounded-lg hover:bg-opacity-70 transition-colors">
                          <div className="flex-shrink-0 mr-3 text-center">
                            <FaCalendarAlt className="text-neon-pink mx-auto mb-1" />
                            <div className="text-sm font-bold">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                            <div className="text-xs">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                          </div>
                          <div>
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(event.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No upcoming events scheduled.</p>
                )}
              </div>
              
              {/* Featured Promotion */}
              <div className="bg-gradient-to-r from-neon-blue/20 to-neon-pink/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Want VIP Treatment?</h2>
                <p className="text-gray-300 mb-4">Get exclusive access and skip the line with our premium guestlist!</p>
                <Link href="/guestlists">
                  <a className="bg-neon-pink text-white w-full py-3 rounded-full block text-center font-semibold hover:bg-opacity-80 transition-colors">
                    Join Guestlist
                  </a>
                </Link>
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