import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-night-black/90 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold font-display text-white">
            <span className="text-neon-pink">TO</span>Night
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/events">
            <a className="text-gray-300 hover:text-white transition-colors">Events</a>
          </Link>
          <Link href="/venues">
            <a className="text-gray-300 hover:text-white transition-colors">Venues</a>
          </Link>
          <Link href="/map">
            <a className="text-gray-300 hover:text-white transition-colors">Map</a>
          </Link>
          <Link href="/guestlists">
            <a className="text-gray-300 hover:text-white transition-colors">Guestlists</a>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <FaSearch />
          </button>
          <Link href="/login">
            <a className="bg-neon-pink text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors">
              Sign In
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-night-navy/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/events">
              <a className="text-gray-300 hover:text-white py-2 transition-colors">Events</a>
            </Link>
            <Link href="/venues">
              <a className="text-gray-300 hover:text-white py-2 transition-colors">Venues</a>
            </Link>
            <Link href="/map">
              <a className="text-gray-300 hover:text-white py-2 transition-colors">Map</a>
            </Link>
            <Link href="/guestlists">
              <a className="text-gray-300 hover:text-white py-2 transition-colors">Guestlists</a>
            </Link>
            <Link href="/login">
              <a className="bg-neon-pink text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors text-center">
                Sign In
              </a>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 