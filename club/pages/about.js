import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>About | TONight - Toronto Nightlife</title>
        <meta name="description" content="Learn about TONight - Toronto's premier nightlife discovery platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">About <span className="text-neon-pink">TO</span>Night</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Toronto's premier nightlife discovery platform, connecting party-goers with the city's best venues and events</p>
          </div>
          
          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-night-navy p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                TONight was born from a simple idea: make it easier for people to discover and experience Toronto's vibrant nightlife scene.
              </p>
              <p className="text-gray-300 mb-4">
                We believe that a great night out shouldn't start with endless Google searches and text messages. Our platform brings together all the information you need about clubs, bars, events, and exclusive guestlists in one beautiful, user-friendly interface.
              </p>
              <p className="text-gray-300">
                Whether you're a Toronto native or just visiting for the weekend, TONight helps you find the perfect spot for your night out.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-night-black p-6 rounded-xl">
                <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-neon-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">For Nightlife Enthusiasts</h3>
                <p className="text-gray-400">Discover new venues, find events matching your taste, and get on exclusive guestlists</p>
              </div>
              
              <div className="bg-night-black p-6 rounded-xl">
                <div className="w-12 h-12 bg-neon-pink/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-neon-pink" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">For Venue Owners</h3>
                <p className="text-gray-400">Increase visibility, promote events, and connect with a targeted audience of nightlife lovers</p>
              </div>
              
              <div className="bg-night-black p-6 rounded-xl">
                <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-neon-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">For Promoters</h3>
                <p className="text-gray-400">Create and manage guestlists, track attendance, and boost your event promotion</p>
              </div>
              
              <div className="bg-night-black p-6 rounded-xl">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">For DJs & Artists</h3>
                <p className="text-gray-400">Showcase your events, connect with fans, and grow your following in Toronto's nightlife scene</p>
              </div>
            </motion.div>
          </div>
          
          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We're a team of nightlife enthusiasts, tech lovers, and Toronto locals passionate about creating the best nightlife discovery experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-night-navy rounded-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-b from-neon-pink/20 to-night-navy flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">Alex Johnson</h3>
                  <p className="text-neon-pink mb-3">Founder & CEO</p>
                  <p className="text-gray-400 text-sm">Former nightclub manager with a passion for technology and connecting people.</p>
                </div>
              </div>
              
              <div className="bg-night-navy rounded-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-b from-neon-blue/20 to-night-navy flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">Maya Rodriguez</h3>
                  <p className="text-neon-blue mb-3">Head of Product</p>
                  <p className="text-gray-400 text-sm">UX designer and nightlife enthusiast focused on creating seamless user experiences.</p>
                </div>
              </div>
              
              <div className="bg-night-navy rounded-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-b from-neon-purple/20 to-night-navy flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">David Kim</h3>
                  <p className="text-neon-purple mb-3">Head of Partnerships</p>
                  <p className="text-gray-400 text-sm">Veteran event promoter with deep connections in Toronto's nightlife industry.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-night-navy to-night-black rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-gray-300 mb-6">
                  Have questions about TONight? Want to partner with us? We'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-night-black p-3 rounded-full mr-4">
                      <FaEnvelope className="text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-gray-400">hello@tonight.to</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-night-black p-3 rounded-full mr-4">
                      <FaPhone className="text-neon-pink" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-gray-400">(416) 555-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-night-black p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Visit Us</h3>
                      <p className="text-gray-400">123 King Street West<br />Toronto, ON M5V 1J2</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/contact">
                    <a className="inline-block bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                      Contact Us
                    </a>
                  </Link>
                </div>
              </div>
              
              <div className="bg-night-black p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4 mb-6">
                  <a href="#" className="bg-night-navy p-3 rounded-full hover:bg-neon-pink/20 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-night-navy p-3 rounded-full hover:bg-neon-pink/20 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-night-navy p-3 rounded-full hover:bg-neon-pink/20 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
                
                <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-night-navy rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink border border-gray-700"
                  />
                  <button className="w-full bg-neon-pink text-white px-4 py-3 rounded-lg hover:bg-opacity-80 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
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