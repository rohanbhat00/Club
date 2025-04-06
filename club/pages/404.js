import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHome, FaSearch } from 'react-icons/fa';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-night-dark flex flex-col">
      <Head>
        <title>Page Not Found | TONight - Toronto Nightlife</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex-grow flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
              className="text-9xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink"
            >
              404
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-400 text-lg mb-8">
              Sorry, we couldn't find the page you're looking for. The night is still young, though!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Link href="/">
              <a className="bg-night-navy rounded-xl p-6 hover:bg-night-navy/80 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center">
                <div className="bg-neon-blue/20 rounded-full p-3 mb-3">
                  <FaHome className="text-neon-blue text-xl" />
                </div>
                <span className="font-medium">Go Home</span>
              </a>
            </Link>
            
            <Link href="/venues">
              <a className="bg-night-navy rounded-xl p-6 hover:bg-night-navy/80 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center">
                <div className="bg-neon-pink/20 rounded-full p-3 mb-3">
                  <FaSearch className="text-neon-pink text-xl" />
                </div>
                <span className="font-medium">Explore Venues</span>
              </a>
            </Link>
            
            <Link href="/events">
              <a className="bg-night-navy rounded-xl p-6 hover:bg-night-navy/80 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center">
                <div className="bg-neon-purple/20 rounded-full p-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium">Find Events</span>
              </a>
            </Link>
          </div>
          
          <button 
            onClick={() => window.history.back()} 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </main>
      
      <footer className="bg-night-black py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TONight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 