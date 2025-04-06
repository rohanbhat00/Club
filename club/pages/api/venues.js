// Sample venues data for the Toronto nightlife app
const venues = [
  {
    id: 1,
    name: "Rebel Nightclub",
    image: "/images/venue1.jpg",
    location: "11 Polson St, Toronto",
    type: "Nightclub",
    rating: 4.5,
    musicType: "EDM, Hip Hop",
    description: "Toronto's premier nightclub located on the waterfront. 45,000 sq ft of space featuring state-of-the-art sound and lighting systems.",
    isOpen: true,
    trending: true,
    tags: ["Dance Floor", "VIP Tables", "Waterfront"],
    hours: {
      friday: "10:00 PM - 3:00 AM",
      saturday: "10:00 PM - 3:00 AM",
      sunday: "Closed"
    },
    coordinates: {
      lat: 43.6426,
      lng: -79.3551
    }
  },
  {
    id: 2,
    name: "EFS Social Club",
    image: "/images/venue2.jpg",
    location: "647 King St W, Toronto",
    type: "Lounge",
    rating: 4.3,
    musicType: "Top 40, Hip Hop, R&B",
    description: "Upscale nightclub in King West featuring a rooftop patio, VIP service, and some of Toronto's best DJs.",
    isOpen: true,
    trending: true,
    tags: ["Rooftop", "VIP Service", "Central"],
    hours: {
      friday: "10:00 PM - 2:30 AM",
      saturday: "10:00 PM - 2:30 AM",
      sunday: "Closed"
    },
    coordinates: {
      lat: 43.6444,
      lng: -79.3973
    }
  },
  {
    id: 3,
    name: "CODA",
    image: "/images/venue3.jpg",
    location: "794 Bathurst St, Toronto",
    type: "Nightclub",
    rating: 4.7,
    musicType: "Techno, House",
    description: "Underground club dedicated to house and techno. Known for its amazing sound system and late-night hours.",
    isOpen: false,
    trending: true,
    tags: ["Underground", "Late Night", "Techno"],
    hours: {
      friday: "10:00 PM - 5:00 AM",
      saturday: "10:00 PM - 5:00 AM",
      sunday: "10:00 PM - 5:00 AM"
    },
    coordinates: {
      lat: 43.6658,
      lng: -79.4125
    }
  },
  {
    id: 4,
    name: "Toybox Nightclub",
    image: "/images/venue4.jpg",
    location: "473 Adelaide St W, Toronto",
    type: "Nightclub",
    rating: 4.1,
    musicType: "Hip Hop, Top 40",
    description: "Playful nightclub with creative decor, featuring top DJs and bottle service in a high-energy environment.",
    isOpen: false,
    trending: false,
    tags: ["Bottle Service", "Unique Decor", "Entertainment District"],
    hours: {
      friday: "10:30 PM - 2:30 AM",
      saturday: "10:30 PM - 2:30 AM",
      sunday: "Closed"
    },
    coordinates: {
      lat: 43.6474,
      lng: -79.3954
    }
  },
  {
    id: 5,
    name: "Wildflower",
    image: "/images/venue5.jpg",
    location: "550 Wellington St W, Toronto",
    type: "Lounge",
    rating: 4.4,
    musicType: "R&B, Soul, Hip Hop",
    description: "Sophisticated nightlife destination within the 1 Hotel Toronto, featuring craft cocktails and upscale atmosphere.",
    isOpen: true,
    trending: false,
    tags: ["Cocktails", "Upscale", "Hotel"],
    hours: {
      friday: "9:00 PM - 2:00 AM",
      saturday: "9:00 PM - 2:00 AM",
      sunday: "9:00 PM - 12:00 AM"
    },
    coordinates: {
      lat: 43.6437,
      lng: -79.4018
    }
  },
  {
    id: 6,
    name: "Lost And Found",
    image: "/images/venue6.jpg",
    location: "577 King St W, Toronto",
    type: "Bar",
    rating: 4.2,
    musicType: "Hip Hop, R&B, House",
    description: "Eclectic bar with an energetic atmosphere, popular for after-work drinks that evolve into a vibrant nightlife scene.",
    isOpen: true,
    trending: false,
    tags: ["King West", "Patio", "Industry Night"],
    hours: {
      friday: "5:00 PM - 2:00 AM",
      saturday: "5:00 PM - 2:00 AM",
      sunday: "Closed"
    },
    coordinates: {
      lat: 43.6446,
      lng: -79.4000
    }
  }
];

export default function handler(req, res) {
  const { type, trending } = req.query;
  
  let filteredVenues = [...venues];
  
  // Filter by venue type if provided
  if (type) {
    filteredVenues = filteredVenues.filter(venue => 
      venue.type.toLowerCase() === type.toLowerCase()
    );
  }
  
  // Filter trending venues if requested
  if (trending === 'true') {
    filteredVenues = filteredVenues.filter(venue => venue.trending);
  }
  
  res.status(200).json(filteredVenues);
} 