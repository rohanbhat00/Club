import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaMusic, FaPhone, FaEnvelope, FaUser, FaImage, FaCheck } from 'react-icons/fa';

export default function SubmitVenue() {
  const [formData, setFormData] = useState({
    venueName: '',
    address: '',
    venueType: '',
    musicType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    website: '',
    socialLinks: '',
    agreedToTerms: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const venueTypes = ['Nightclub', 'Lounge', 'Bar', 'Live Music Venue', 'Restaurant with Bar', 'Rooftop Bar', 'Other'];
  const musicTypes = ['Hip Hop', 'R&B', 'EDM', 'House', 'Techno', 'Top 40', 'Latin', 'Reggaeton', 'Multi-Genre', 'Other'];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.venueName.trim()) errors.venueName = "Venue name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.venueType) errors.venueType = "Please select a venue type";
    if (!formData.contactName.trim()) errors.contactName = "Contact name is required";
    if (!formData.contactEmail.trim()) errors.contactEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) errors.contactEmail = "Email is invalid";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.agreedToTerms) errors.agreedToTerms = "You must agree to the terms";
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Mock API call - in a real app, you would send data to your backend
      setTimeout(() => {
        console.log('Form data submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>Submit Your Venue | TONight - Toronto Nightlife</title>
        <meta name="description" content="Submit your venue to Toronto's premier nightlife discovery platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-night-navy rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold font-display mb-4">Thank You for Your Submission!</h1>
              <p className="text-xl text-gray-300 mb-6">We've received your venue information and our team will review it shortly.</p>
              <p className="text-gray-400 mb-8">You'll receive a confirmation email at {formData.contactEmail} with next steps.</p>
              <Link href="/">
                <a className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                  Back to Homepage
                </a>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold font-display mb-3">Submit Your Venue</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get your nightlife venue listed on Toronto's premier nightlife discovery platform</p>
              </div>
              
              <div className="bg-night-navy rounded-xl p-6 md:p-8 shadow-lg">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Venue Information */}
                    <div className="md:col-span-2">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <FaBuilding className="mr-2 text-neon-blue" /> Venue Information
                      </h2>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Venue Name *</label>
                      <input
                        type="text"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleChange}
                        className={`w-full bg-night-black rounded-lg px-4 py-3 text-white ${formErrors.venueName ? 'border border-red-500' : 'border border-gray-700'}`}
                        placeholder="e.g. Club XYZ"
                      />
                      {formErrors.venueName && <p className="text-red-500 text-sm">{formErrors.venueName}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Venue Type *</label>
                      <select
                        name="venueType"
                        value={formData.venueType}
                        onChange={handleChange}
                        className={`w-full bg-night-black rounded-lg px-4 py-3 text-white ${formErrors.venueType ? 'border border-red-500' : 'border border-gray-700'}`}
                      >
                        <option value="">Select Venue Type</option>
                        {venueTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {formErrors.venueType && <p className="text-red-500 text-sm">{formErrors.venueType}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Address *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white ${formErrors.address ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="Full venue address"
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Music Type</label>
                      <select
                        name="musicType"
                        value={formData.musicType}
                        onChange={handleChange}
                        className="w-full bg-night-black rounded-lg px-4 py-3 text-white border border-gray-700"
                      >
                        <option value="">Select Music Type</option>
                        {musicTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-gray-300">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`w-full bg-night-black rounded-lg px-4 py-3 text-white min-h-[100px] ${formErrors.description ? 'border border-red-500' : 'border border-gray-700'}`}
                        placeholder="Describe your venue, special features, capacity, etc."
                      ></textarea>
                      {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-night-black rounded-lg px-4 py-3 text-white border border-gray-700"
                        placeholder="https://www.yourvenue.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Social Media Links</label>
                      <input
                        type="text"
                        name="socialLinks"
                        value={formData.socialLinks}
                        onChange={handleChange}
                        className="w-full bg-night-black rounded-lg px-4 py-3 text-white border border-gray-700"
                        placeholder="Instagram, Twitter, Facebook, etc."
                      />
                    </div>
                    
                    {/* Contact Information */}
                    <div className="md:col-span-2 mt-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <FaUser className="mr-2 text-neon-blue" /> Contact Information
                      </h2>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Contact Name *</label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className={`w-full bg-night-black rounded-lg px-4 py-3 text-white ${formErrors.contactName ? 'border border-red-500' : 'border border-gray-700'}`}
                        placeholder="Your full name"
                      />
                      {formErrors.contactName && <p className="text-red-500 text-sm">{formErrors.contactName}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Email Address *</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white ${formErrors.contactEmail ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="you@example.com"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      {formErrors.contactEmail && <p className="text-red-500 text-sm">{formErrors.contactEmail}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          className="w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-white border border-gray-700"
                          placeholder="(123) 456-7890"
                        />
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300">Upload Images</label>
                      <div className="relative">
                        <div className="w-full bg-night-black rounded-lg px-4 py-3 pl-10 text-gray-400 border border-gray-700 cursor-pointer hover:bg-night-black/70 transition-colors">
                          <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          <span>Select venue images (Coming soon)</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Upload feature coming soon. We'll contact you for images after submission.</p>
                    </div>
                    
                    {/* Terms and Submission */}
                    <div className="md:col-span-2 mt-6">
                      <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name="agreedToTerms"
                            checked={formData.agreedToTerms}
                            onChange={handleChange}
                            className="w-4 h-4 bg-night-black border-gray-700 rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <label className={`text-sm ${formErrors.agreedToTerms ? 'text-red-400' : 'text-gray-400'}`}>
                            I agree to the <Link href="/terms"><a className="text-neon-blue hover:underline">Terms of Service</a></Link> and <Link href="/privacy"><a className="text-neon-blue hover:underline">Privacy Policy</a></Link>
                          </label>
                          {formErrors.agreedToTerms && <p className="text-red-500 text-sm mt-1">{formErrors.agreedToTerms}</p>}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`bg-neon-blue text-white px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Venue'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-8 text-center text-gray-400 text-sm">
                <p>Questions? Contact us at <a href="mailto:venues@tonight.to" className="text-neon-blue hover:underline">venues@tonight.to</a></p>
              </div>
            </>
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