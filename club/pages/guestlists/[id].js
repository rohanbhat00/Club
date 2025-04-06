import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaChevronLeft, FaUser, FaUsers, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

export default function GuestlistDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [guestlist, setGuestlist] = useState(null);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: '',
    agreedToTerms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Fetch guestlist data
  useEffect(() => {
    if (!id) return;
    
    const fetchGuestlistDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch guestlist details
        const guestlistResponse = await fetch(`/api/guestlists/${id}`);
        
        if (!guestlistResponse.ok) {
          throw new Error('Guestlist not found');
        }
        
        const guestlistData = await guestlistResponse.json();
        setGuestlist(guestlistData);
        
        // Fetch venue details if venueId exists
        if (guestlistData.venueId) {
          const venueResponse = await fetch(`/api/venues/${guestlistData.venueId}`);
          if (venueResponse.ok) {
            const venueData = await venueResponse.json();
            setVenue(venueData);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guestlist details:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchGuestlistDetails();
  }, [id]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (formData.guests < 1) errors.guests = "Number of guests must be at least 1";
    if (!formData.agreedToTerms) errors.agreedToTerms = "You must agree to the terms and conditions";
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // In a real implementation, you would submit this data to your API
        // const response = await fetch(`/api/guestlists/${id}/join`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     ...formData,
        //     guestlistId: id
        //   }),
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to join guestlist');
        // }
        
        // Mock API call for development
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form data submitted:', { ...formData, guestlistId: id });
        
        setIsSubmitted(true);
        setIsSubmitting(false);
        
        // In a real app, you might redirect or show a success message
      } catch (err) {
        console.error('Submission error:', err);
        setFormErrors({ submit: err.message || 'Failed to submit request. Please try again.' });
        setIsSubmitting(false);
      }
    }
  };
  
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
            <Link href="/guestlists">
              <a className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                Back to Guestlists
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!guestlist) {
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
        <title>{guestlist.name} | TONight - Toronto Nightlife</title>
        <meta name="description" content={`Join the exclusive guestlist for ${guestlist.name} at ${venue ? venue.name : 'a hot venue'} in Toronto.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div 
          className="w-full h-64 md:h-80 bg-cover bg-center relative" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(13, 15, 25, 0.6), rgba(13, 15, 25, 0.9)), url(${guestlist.image || venue?.images?.[0] || '/images/toronto-nightlife.jpg'})` 
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container mx-auto px-4 pb-6">
              <Link href="/guestlists">
                <a className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
                  <FaChevronLeft className="mr-2" />
                  <span>Back to guestlists</span>
                </a>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white">{guestlist.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="mr-2 text-neon-pink" />
                  <span>{formatDate(guestlist.date)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaClock className="mr-2 text-neon-blue" />
                  <span>{formatTime(guestlist.startTime)} - {formatTime(guestlist.endTime)}</span>
                </div>
                {venue && (
                  <div className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="mr-2 text-neon-purple" />
                    <span>{venue.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto bg-night-navy rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold mb-4">You're on the list!</h2>
              <p className="text-xl text-gray-300 mb-6">
                Thank you for joining our guestlist. We've sent a confirmation to your email.
              </p>
              <div className="bg-night-black rounded-lg p-6 max-w-md mx-auto mb-8">
                <h3 className="text-xl font-semibold mb-3">Guestlist Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Guests:</span>
                    <span className="font-medium">{formData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-medium">{formatDate(guestlist.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="font-medium">{formatTime(guestlist.startTime)} - {formatTime(guestlist.endTime)}</span>
                  </div>
                  {venue && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Venue:</span>
                      <span className="font-medium">{venue.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Arrive on time and mention that you're on the TONight guestlist at the door. Please bring valid ID.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/">
                  <a className="bg-night-black hover:bg-night-navy text-white px-6 py-3 rounded-full transition-colors">
                    Back to Home
                  </a>
                </Link>
                <Link href="/guestlists">
                  <a className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                    Explore More Guestlists
                  </a>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Guestlist Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-night-navy rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-4">About This Guestlist</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {guestlist.description || `Join us for an exclusive night at ${venue ? venue.name : 'one of Toronto\'s hottest venues'}. Skip the line and enjoy ${guestlist.benefits || 'special perks'} when you join our guestlist.`}
                  </p>
                  
                  {guestlist.benefits && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {typeof guestlist.benefits === 'string' 
                          ? guestlist.benefits.split(',').map((benefit, index) => (
                              <li key={index}>{benefit.trim()}</li>
                            ))
                          : Array.isArray(guestlist.benefits) 
                            ? guestlist.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))
                            : <li>{guestlist.benefits}</li>
                        }
                      </ul>
                    </div>
                  )}
                  
                  {guestlist.restrictions && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Restrictions & Requirements</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {typeof guestlist.restrictions === 'string' 
                          ? guestlist.restrictions.split(',').map((restriction, index) => (
                              <li key={index}>{restriction.trim()}</li>
                            ))
                          : Array.isArray(guestlist.restrictions) 
                            ? guestlist.restrictions.map((restriction, index) => (
                                <li key={index}>{restriction}</li>
                              ))
                            : <li>{guestlist.restrictions}</li>
                        }
                      </ul>
                    </div>
                  )}
                </div>
                
                {venue && (
                  <div className="bg-night-navy rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Venue Details</h2>
                      <Link href={`/venues/${venue._id}`}>
                        <a className="text-neon-blue hover:underline text-sm">View Venue Page</a>
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
                              <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-neon-blue text-sm hover:underline inline-block mt-1"
                              >
                                Get Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-night-navy rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-4">Important Information</h2>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-neon-blue/20 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                      <p>Arrive by {formatTime(guestlist.arrivalDeadline || guestlist.startTime)} to guarantee entry with guestlist benefits.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-neon-blue/20 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                      <p>Mention you're on the TONight guestlist at the door.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-neon-blue/20 rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                      <p>Valid ID is required. {guestlist.ageRestriction || 'Must be 19+ to enter.'}</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-neon-blue/20 rounded-full flex items-center justify-center mr-3 mt-0.5">4</span>
                      <p>Dress code: {guestlist.dressCode || (venue?.dressCode || 'Smart casual. No athletic wear or sneakers.')}</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-neon-blue/20 rounded-full flex items-center justify-center mr-3 mt-0.5">5</span>
                      <p>Final entry is subject to capacity and venue discretion.</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Signup Form */}
              <div className="lg:col-span-1">
                <div className="bg-night-navy rounded-xl p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Join This Guestlist</h2>
                  
                  {formErrors.submit && (
                    <div className="bg-red-900/40 border border-red-500 text-red-100 p-4 rounded-lg mb-6">
                      {formErrors.submit}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-gray-300">Your Name *</label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white ${formErrors.name ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="John Doe"
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-300">Email Address *</label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white ${formErrors.email ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="you@example.com"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-gray-300">Phone Number *</label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white ${formErrors.phone ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="(416) 555-1234"
                        />
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="guests" className="block text-gray-300">Number of Guests (including you) *</label>
                      <div className="relative">
                        <input
                          id="guests"
                          type="number"
                          name="guests"
                          min="1"
                          max={guestlist.maxGuests || 5}
                          value={formData.guests}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white ${formErrors.guests ? 'border border-red-500' : 'border border-gray-700'}`}
                        />
                        <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      {formErrors.guests && <p className="text-red-500 text-sm">{formErrors.guests}</p>}
                      <p className="text-gray-500 text-sm">Maximum {guestlist.maxGuests || 5} guests per reservation</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="specialRequests" className="block text-gray-300">Special Requests</label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="w-full bg-night-black rounded-lg px-4 py-3 text-white border border-gray-700 min-h-[80px]"
                        placeholder="Birthday celebration, table preference, etc."
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <input
                          id="agreedToTerms"
                          type="checkbox"
                          name="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleChange}
                          className={`mt-0.5 ${formErrors.agreedToTerms ? 'border-red-500' : ''}`}
                        />
                        <label htmlFor="agreedToTerms" className="ml-2 text-gray-300 text-sm">
                          I agree to the <Link href="/terms"><a className="text-neon-blue hover:underline">Terms and Conditions</a></Link> and acknowledge the <Link href="/privacy"><a className="text-neon-blue hover:underline">Privacy Policy</a></Link>.
                        </label>
                      </div>
                      {formErrors.agreedToTerms && <p className="text-red-500 text-sm">{formErrors.agreedToTerms}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-neon-pink text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-colors mt-6 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Processing...' : 'Join Guestlist'}
                    </button>
                  </form>
                  
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    By joining this guestlist, you will receive a confirmation email with all the details.
                  </p>
                </div>
              </div>
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