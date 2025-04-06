// Sample events data for the Toronto nightlife app
const events = [
  {
    id: 1,
    title: "Saturday Night Live DJ",
    image: "/images/event1.jpg",
    date: "May 15, 2023",
    venue: "Club XYZ",
    time: "10:00 PM - 3:00 AM",
    price: "20",
    category: "DJ Night",
    featured: true,
    description: "Join us for an unforgettable night with our resident DJ spinning the hottest tracks in town. Expect a mix of EDM, Top 40, and Hip-Hop.",
    location: {
      address: "123 King St W, Toronto, ON",
      lat: 43.6472,
      lng: -79.3742
    }
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
    featured: false,
    description: "The best R&B night in Toronto featuring classic and modern R&B, Hip-Hop, and Soul. Smooth vibes and great drinks all night long.",
    location: {
      address: "627 King St W, Toronto, ON",
      lat: 43.6444,
      lng: -79.4017
    }
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
    featured: false,
    description: "Underground techno party at a secret warehouse location. Lineup to be announced. Location will be revealed on the day of the event.",
    location: {
      address: "Secret Location, Toronto, ON",
      lat: 43.6487,
      lng: -79.3823
    }
  },
  {
    id: 4,
    title: "DJ Tiesto Live",
    image: "/images/dj1.jpg",
    date: "May 25, 2023",
    venue: "Rebel Nightclub",
    time: "10:00 PM - 3:00 AM",
    price: "45",
    category: "EDM",
    featured: true,
    description: "World-renowned DJ Tiesto comes to Toronto for one night only! Expect an incredible night of EDM hits and epic visuals.",
    location: {
      address: "11 Polson St, Toronto, ON",
      lat: 43.6426,
      lng: -79.3551
    }
  },
  {
    id: 5,
    title: "Black Coffee",
    image: "/images/dj2.jpg",
    date: "June 2, 2023",
    venue: "CODA",
    time: "11:00 PM - 4:00 AM",
    price: "35",
    category: "Afro House",
    featured: false,
    description: "South African DJ Black Coffee brings his unique blend of Afro house and deep house to Toronto for a special night at CODA.",
    location: {
      address: "794 Bathurst St, Toronto, ON",
      lat: 43.6658,
      lng: -79.4125
    }
  },
  {
    id: 6,
    title: "Charlotte de Witte",
    image: "/images/dj3.jpg",
    date: "June 10, 2023",
    venue: "Warehouse District",
    time: "11:00 PM - 6:00 AM",
    price: "40",
    category: "Techno",
    featured: false,
    description: "Belgian techno star Charlotte de Witte delivers a hard-hitting techno set at this special warehouse event.",
    location: {
      address: "Warehouse District, Toronto, ON",
      lat: 43.6387,
      lng: -79.4293
    }
  }
];

export default function handler(req, res) {
  const { category, featured } = req.query;
  
  let filteredEvents = [...events];
  
  // Filter by category if provided
  if (category) {
    filteredEvents = filteredEvents.filter(event => 
      event.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter featured events if requested
  if (featured === 'true') {
    filteredEvents = filteredEvents.filter(event => event.featured);
  }
  
  res.status(200).json(filteredEvents);
} 