import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import VenueCard from '../components/VenueCard';
import GuestlistCard from '../components/GuestlistCard';
import MapSection from '../components/MapSection';
import { motion } from 'framer-motion';
import { FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  // Sample data - in a real app, this would come from an API or database
  const featuredEvents = [
    {
      id: 1,
      title: "Saturday Night Live DJ",
      image: "/images/event1.jpg",
      date: "May 15, 2023",
      venue: "Club XYZ",
      time: "10:00 PM - 3:00 AM",
      price: "20",
      category: "DJ Night",
      featured: true
    },
    {
      id: 2,
      title: "R&B Thursdays",
      image: "/images/event2.jpg",
      date: "May 18, 2023",
      venue: "Lavelle",
      time: "9:00 PM - 2:00 AM",
      price: "15",
      category: "R&B",
      featured: false
    },
    {
      id: 3,
      title: "Techno Warehouse Party",
      image: "/images/event3.jpg",
      date: "May 20, 2023",
      venue: "Secret Location",
      time: "11:00 PM - 6:00 AM",
      price: "30",
      category: "Techno",
      featured: false
    }
  ];

  const trendingVenues = [
    {
      id: 1,
      name: "Rebel Nightclub",
      image: "/images/venue1.jpg",
      location: "11 Polson St, Toronto",
      type: "Nightclub",
      rating: 4.5,
      musicType: "EDM, Hip Hop"
    },
    {
      id: 2,
      name: "EFS Social Club",
      image: "/images/venue2.jpg",
      location: "647 King St W, Toronto",
      type: "Lounge",
      rating: 4.3,
      musicType: "Top 40, Hip Hop, R&B"
    },
    {
      id: 3,
      name: "CODA",
      image: "/images/venue3.jpg",
      location: "794 Bathurst St, Toronto",
      type: "Nightclub",
      rating: 4.7,
      musicType: "Techno, House"
    }
  ];
  
  const upcomingDJs = [
    {
      id: 1,
      title: "DJ Tiesto Live",
      image: "/images/dj1.jpg",
      date: "May 25, 2023",
      venue: "Rebel Nightclub",
      time: "10:00 PM - 3:00 AM",
      price: "45",
      category: "EDM",
      featured: true
    },
    {
      id: 2,
      title: "Black Coffee",
      image: "/images/dj2.jpg",
      date: "June 2, 2023",
      venue: "CODA",
      time: "11:00 PM - 4:00 AM",
      price: "35",
      category: "Afro House",
      featured: false
    },
    {
      id: 3,
      title: "Charlotte de Witte",
      image: "/images/dj3.jpg",
      date: "June 10, 2023",
      venue: "Warehouse District",
      time: "11:00 PM - 6:00 AM",
      price: "40",
      category: "Techno",
      featured: false
    }
  ];

  const guestlists = [
    {
      id: 1,
      title: "VIP Table @ Toybox",
      image: "/images/guestlist1.jpg",
      date: "May 19, 2023",
      venue: "Toybox Nightclub",
      perks: "Skip the line, Free entry before midnight",
      spots: 20
    },
    {
      id: 2,
      title: "Ladies Night @ Wildflower",
      image: "/images/guestlist2.jpg",
      date: "May 20, 2023",
      venue: "Wildflower",
      perks: "Free entry, Complimentary drink",
      spots: 50
    },
    {
      id: 3,
      title: "Industry Thursdays @ EFS",
      image: "/images/guestlist3.jpg",
      date: "May 25, 2023",
      venue: "EFS Social Club",
      perks: "Reduced cover, Priority entry",
      spots: 30
    }
  ];

  const mapVenues = trendingVenues.map(venue => ({
    id: venue.id,
    name: venue.name,
    lat: venue.id === 1 ? 43.6426 : venue.id === 2 ? 43.6444 : 43.6658,
    lng: venue.id === 1 ? -79.3551 : venue.id === 2 ? -79.3973 : -79.4125,
    location: venue.location,
    musicType: venue.musicType
  }));

  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>TONight | Toronto's Nightlife at Your Fingertips</title>
        <meta name="description" content="Discover the best nightlife in Toronto - clubs, bars, events, and more!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <HeroSection />

      {/* Featured Events Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-display">Featured Events</h2>
          <Link href="/events">
            <a className="text-neon-pink flex items-center hover:underline">
              View All <FaAngleRight className="ml-1" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      
      {/* Trending Venues Section */}
      <section className="py-16 bg-night-navy">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-display">Trending Clubs & Bars</h2>
            <Link href="/venues">
              <a className="text-neon-blue flex items-center hover:underline">
                View All <FaAngleRight className="ml-1" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming DJ Nights Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-display">Upcoming DJ Nights</h2>
          <Link href="/events?category=dj">
            <a className="text-neon-pink flex items-center hover:underline">
              View All <FaAngleRight className="ml-1" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingDJs.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      
      {/* Exclusive Guestlists Section */}
      <section className="py-16 bg-night-navy">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-display">Exclusive Guestlists</h2>
            <Link href="/guestlists">
              <a className="text-neon-blue flex items-center hover:underline">
                View All <FaAngleRight className="ml-1" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guestlists.map((guestlist) => (
              <GuestlistCard key={guestlist.id} guestlist={guestlist} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection venues={mapVenues} />
      
      {/* Newsletter Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-gradient-to-r from-night-navy to-night-black rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Stay in the Loop</h2>
            <p className="text-gray-300 mb-8">Subscribe to our newsletter and never miss out on the hottest events in Toronto</p>
            
            <form className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white placeholder-gray-400 border-none outline-none"
              />
              <button className="bg-neon-pink text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-night-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-display">
                <span className="text-neon-pink">TO</span>Night
              </h3>
              <p className="text-gray-400 mb-4">Discover the best nightlife experiences in Toronto.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/events"><a className="text-gray-400 hover:text-white transition-colors">Events</a></Link></li>
                <li><Link href="/venues"><a className="text-gray-400 hover:text-white transition-colors">Venues</a></Link></li>
                <li><Link href="/map"><a className="text-gray-400 hover:text-white transition-colors">Map</a></Link></li>
                <li><Link href="/guestlists"><a className="text-gray-400 hover:text-white transition-colors">Guestlists</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Information</h3>
              <ul className="space-y-2">
                <li><Link href="/about"><a className="text-gray-400 hover:text-white transition-colors">About Us</a></Link></li>
                <li><Link href="/contact"><a className="text-gray-400 hover:text-white transition-colors">Contact</a></Link></li>
                <li><Link href="/submit-venue"><a className="text-gray-400 hover:text-white transition-colors">Submit a Venue</a></Link></li>
                <li><Link href="/faq"><a className="text-gray-400 hover:text-white transition-colors">FAQ</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms"><a className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></Link></li>
                <li><Link href="/privacy"><a className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></Link></li>
                <li><Link href="/cookies"><a className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TONight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 