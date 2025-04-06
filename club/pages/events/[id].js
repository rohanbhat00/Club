import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt, FaChevronLeft, FaShare, FaInstagram, FaFacebook, FaTwitter, FaMusic } from 'react-icons/fa';
import { MdEvent, MdPeople } from 'react-icons/md';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [event, setEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch event data
  useEffect(() => {
    if (!id) return;
    
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch event details
        const eventResponse = await fetch(`/api/events/${id}`);
        
        if (!eventResponse.ok) {
          throw new Error('Event not found');
        }
        
        const eventData = await eventResponse.json();
        setEvent(eventData);
        
        // Fetch venue details if venueId exists
        if (eventData.venueId) {
          const venueResponse = await fetch(`/api/venues/${eventData.venueId}`);
          if (venueResponse.ok) {
            const venueData = await venueResponse.json();
            setVenue(venueData);
          }
        }
        
        // Fetch similar events (same genre or venue)
        const similarEventsResponse = await fetch(`/api/events?limit=3${eventData.genre ? `&genre=${eventData.genre}` : ''}${eventData.venueId ? `&venueId=${eventData.venueId}` : ''}`);
        const similarEventsData = await similarEventsResponse.json();
        
        // Filter out the current event
        const filteredSimilarEvents = similarEventsData.filter(e => e._id !== id);
        setSimilarEvents(filteredSimilarEvents.slice(0, 3));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchEventDetails();
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
            <Link href="/events">
              <a className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                Back to Events
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return null;
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>{event.name} | TONight - Toronto Nightlife</title>
        <meta name="description" content={`${event.name} - ${formatDate(event.date)} at ${venue ? venue.name : 'Toronto'}. ${event.description?.substring(0, 100)}...`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div 
          className="w-full h-64 md:h-80 bg-cover bg-center relative" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(13, 15, 25, 0.5), rgba(13, 15, 25, 0.9)), url(${event.image || venue?.images?.[0] || '/images/toronto-nightlife.jpg'})` 
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container mx-auto px-4 pb-6">
              <Link href="/events">
                <a className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
                  <FaChevronLeft className="mr-2" />
                  <span>Back to events</span>
                </a>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white">{event.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="mr-2 text-neon-pink" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaClock className="mr-2 text-neon-blue" />
                  <span>{formatTime(event.time)}</span>
                </div>
                {event.genre && (
                  <div className="flex items-center text-gray-300">
                    <FaMusic className="mr-2 text-neon-purple" />
                    <span>{event.genre}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Event Details */}
              <div className="bg-night-navy rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    {event.description || `Join us for ${event.name}, an unforgettable night in Toronto's vibrant nightlife scene. Experience amazing music, great vibes, and create memories that will last a lifetime.`}
                  </p>
                  
                  {event.artists && event.artists.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Featured Artists</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {event.artists.map((artist, index) => (
                          <div key={index} className="bg-night-black rounded-lg p-4 flex items-start">
                            <div className="w-12 h-12 bg-night-navy rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mr-3">
                              {artist.image ? (
                                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                              ) : (
                                <FaMusic className="text-2xl text-neon-pink" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{artist.name}</h4>
                              {artist.role && <p className="text-gray-400 text-sm">{artist.role}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Venue Information (if available) */}
              {venue && (
                <div className="bg-night-navy rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Venue</h2>
                    <Link href={`/venues/${venue._id}`}>
                      <a className="text-neon-blue hover:underline text-sm">View Venue Details</a>
                    </Link>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img 
                          src={venue.images?.[0] || '/images/toronto-nightlife.jpg'} 
                          alt={venue.name} 
                          className="object-cover w-full h-full" 
                        />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                      <p className="text-gray-400 mb-4">{venue.type}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-neon-pink mt-1 mr-3" />
                          <div>
                            <h4 className="font-medium">Address</h4>
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
                            <FaClock className="text-neon-blue mt-1 mr-3" />
                            <div>
                              <h4 className="font-medium">Contact</h4>
                              <p className="text-gray-300">{venue.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Share Section */}
              <div className="bg-night-navy rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Share This Event</h2>
                <div className="flex space-x-3">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-night-black hover:bg-blue-900 transition-colors p-3 rounded-lg"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${event.name} on ${formatDate(event.date)} at ${venue ? venue.name : 'Toronto'}!`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-night-black hover:bg-blue-600 transition-colors p-3 rounded-lg"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a 
                    href={`https://www.instagram.com/`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-night-black hover:bg-purple-900 transition-colors p-3 rounded-lg"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `${event.name} | TONight`,
                          text: `Check out ${event.name} on ${formatDate(event.date)} at ${venue ? venue.name : 'Toronto'}!`,
                          url: window.location.href,
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="bg-night-black hover:bg-night-navy transition-colors p-3 rounded-lg flex items-center"
                  >
                    <FaShare className="text-xl mr-2" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <div className="bg-night-navy rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Event Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-neon-pink mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold mb-1">Date & Time</h3>
                      <p className="text-gray-300">{formatDate(event.date)}</p>
                      <p className="text-gray-300">{formatTime(event.time)}</p>
                    </div>
                  </div>
                  
                  {venue && (
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-neon-blue mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-gray-300">{venue.name}</p>
                        <p className="text-gray-300 text-sm">{venue.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.ageRestriction && (
                    <div className="flex items-start">
                      <MdPeople className="text-neon-purple mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold mb-1">Age Restriction</h3>
                        <p className="text-gray-300">{event.ageRestriction}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.ticketPrice && (
                    <div className="flex items-start">
                      <FaTicketAlt className="text-neon-green mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold mb-1">Price</h3>
                        <p className="text-gray-300">
                          {typeof event.ticketPrice === 'number' ? `$${event.ticketPrice}` : event.ticketPrice}
                        </p>
                        {event.ticketUrl && (
                          <a 
                            href={event.ticketUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-neon-blue text-sm hover:underline"
                          >
                            Buy Tickets
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Ticket CTA */}
              <div className="bg-gradient-to-r from-neon-blue/30 to-neon-pink/30 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Secure Your Spot</h3>
                <p className="text-gray-300 mb-4">Don't miss out on this incredible event!</p>
                {event.ticketUrl ? (
                  <a 
                    href={event.ticketUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-neon-pink text-white w-full py-3 rounded-full block text-center font-semibold hover:bg-opacity-80 transition-colors"
                  >
                    Get Tickets
                  </a>
                ) : (
                  <a 
                    href={`/guestlists?event=${event._id}`} 
                    className="bg-neon-pink text-white w-full py-3 rounded-full block text-center font-semibold hover:bg-opacity-80 transition-colors"
                  >
                    Join Guestlist
                  </a>
                )}
              </div>
              
              {/* Similar Events */}
              {similarEvents.length > 0 && (
                <div className="bg-night-navy rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Similar Events</h2>
                    <Link href="/events">
                      <a className="text-neon-blue text-sm hover:underline">View All</a>
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {similarEvents.map(similarEvent => (
                      <Link href={`/events/${similarEvent._id}`} key={similarEvent._id}>
                        <a className="flex p-3 bg-night-black rounded-lg hover:bg-opacity-70 transition-colors">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                            <img 
                              src={similarEvent.image || '/images/toronto-nightlife.jpg'} 
                              alt={similarEvent.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{similarEvent.name}</h3>
                            <p className="text-sm text-gray-400">
                              {new Date(similarEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 
                              {' ' + new Date(similarEvent.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {similarEvent.genre && (
                              <p className="text-xs text-neon-purple mt-1">{similarEvent.genre}</p>
                            )}
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add to Calendar */}
              <div className="bg-night-navy rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Add to Calendar</h2>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=${encodeURIComponent(event.description || `Event at ${venue ? venue.name : 'Toronto'}`)}&location=${encodeURIComponent(venue ? `${venue.name}, ${venue.address}, Toronto` : 'Toronto')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-night-black hover:bg-night-dark p-3 rounded-lg text-center transition-colors"
                  >
                    Google
                  </a>
                  <a 
                    href={`https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(event.description || `Event at ${venue ? venue.name : 'Toronto'}`)}&location=${encodeURIComponent(venue ? `${venue.name}, ${venue.address}, Toronto` : 'Toronto')}&startdt=${new Date(event.date).toISOString()}&enddt=${new Date(new Date(event.date).getTime() + 3600000).toISOString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-night-black hover:bg-night-dark p-3 rounded-lg text-center transition-colors"
                  >
                    Outlook
                  </a>
                  <a 
                    href={`data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, '')}%0ADTEND:${new Date(new Date(event.date).getTime() + 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '')}%0ASUMMARY:${encodeURIComponent(event.name)}%0ADESCRIPTION:${encodeURIComponent(event.description || `Event at ${venue ? venue.name : 'Toronto'}`)}%0ALOCATION:${encodeURIComponent(venue ? `${venue.name}, ${venue.address}, Toronto` : 'Toronto')}%0AEND:VEVENT%0AEND:VCALENDAR`}
                    download={`${event.name.replace(/\s+/g, '-').toLowerCase()}.ics`}
                    className="bg-night-black hover:bg-night-dark p-3 rounded-lg text-center transition-colors"
                  >
                    Apple
                  </a>
                  <a 
                    href={`data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, '')}%0ADTEND:${new Date(new Date(event.date).getTime() + 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '')}%0ASUMMARY:${encodeURIComponent(event.name)}%0ADESCRIPTION:${encodeURIComponent(event.description || `Event at ${venue ? venue.name : 'Toronto'}`)}%0ALOCATION:${encodeURIComponent(venue ? `${venue.name}, ${venue.address}, Toronto` : 'Toronto')}%0AEND:VEVENT%0AEND:VCALENDAR`}
                    download={`${event.name.replace(/\s+/g, '-').toLowerCase()}.ics`}
                    className="bg-night-black hover:bg-night-dark p-3 rounded-lg text-center transition-colors"
                  >
                    iCal
                  </a>
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