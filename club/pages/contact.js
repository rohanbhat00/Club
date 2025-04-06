import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser, FaPaperPlane, FaCheck } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    
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
        <title>Contact Us | TONight - Toronto Nightlife</title>
        <meta name="description" content="Get in touch with the TONight team - Toronto's premier nightlife discovery platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-night-navy rounded-xl p-8 text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold font-display mb-4">Message Sent!</h1>
              <p className="text-xl text-gray-300 mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              <Link href="/">
                <a className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                  Back to Homepage
                </a>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-display mb-3">Contact Us</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get in touch with our team for questions, feedback, or partnership opportunities</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-night-navy rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-neon-blue/20 p-3 rounded-full mr-4">
                        <FaPhone className="text-neon-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                        <p className="text-gray-400">(416) 555-1234</p>
                        <p className="text-gray-500 text-sm mt-1">Mon-Fri: 9am - 5pm</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-night-navy rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-neon-pink/20 p-3 rounded-full mr-4">
                        <FaEnvelope className="text-neon-pink" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                        <p className="text-gray-400">hello@tonight.to</p>
                        <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-night-navy rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-neon-purple/20 p-3 rounded-full mr-4">
                        <FaMapMarkerAlt className="text-neon-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                        <p className="text-gray-400">123 King Street West</p>
                        <p className="text-gray-400">Toronto, ON M5V 1J2</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-night-navy rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3">Connect With Us</h3>
                    <div className="flex space-x-3">
                      <a href="#" className="bg-night-black hover:bg-neon-blue/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-night-black hover:bg-neon-blue/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-night-black hover:bg-neon-blue/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="bg-night-navy rounded-xl p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-gray-300">Your Name *</label>
                          <div className="relative">
                            <input
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
                          <label className="block text-gray-300">Your Email *</label>
                          <div className="relative">
                            <input
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
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-gray-300">Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 text-white ${formErrors.subject ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="What's this about?"
                        />
                        {formErrors.subject && <p className="text-red-500 text-sm">{formErrors.subject}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-gray-300">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full bg-night-black rounded-lg px-4 py-3 text-white min-h-[150px] ${formErrors.message ? 'border border-red-500' : 'border border-gray-700'}`}
                          placeholder="How can we help you?"
                        ></textarea>
                        {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`bg-neon-pink text-white px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                          <FaPaperPlane className="ml-2" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
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