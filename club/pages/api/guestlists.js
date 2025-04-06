// Sample guestlists data for the Toronto nightlife app
const guestlists = [
  {
    id: 1,
    title: "VIP Table @ Toybox",
    image: "/images/guestlist1.jpg",
    date: "May 19, 2023",
    venue: "Toybox Nightclub",
    perks: "Skip the line, Free entry before midnight",
    spots: 20,
    description: "Get on this exclusive guestlist for Toybox Nightclub. Includes VIP entry and the option to book bottle service at a discounted rate.",
    requirements: "Even ratio (equal number of guys and girls), Arrive before midnight, Dress code: Smart casual",
    contact: "guestlist@toybox.ca"
  },
  {
    id: 2,
    title: "Ladies Night @ Wildflower",
    image: "/images/guestlist2.jpg",
    date: "May 20, 2023",
    venue: "Wildflower",
    perks: "Free entry, Complimentary drink",
    spots: 50,
    description: "Special ladies night at Wildflower. Free entry for women and a complimentary welcome drink. Enjoy R&B and soul music in an upscale setting.",
    requirements: "Women only, Arrive before 11PM, Dress code: Elegant",
    contact: "events@wildflowerto.com"
  },
  {
    id: 3,
    title: "Industry Thursdays @ EFS",
    image: "/images/guestlist3.jpg",
    date: "May 25, 2023",
    venue: "EFS Social Club",
    perks: "Reduced cover, Priority entry",
    spots: 30,
    description: "Industry night for hospitality professionals. Show your paystub or work ID for reduced cover and priority entry.",
    requirements: "Hospitality industry proof, Arrive before 11:30PM, Dress code: Upscale",
    contact: "industry@efstoronto.com"
  },
  {
    id: 4,
    title: "Rebel Saturdays",
    image: "/images/guestlist4.jpg",
    date: "May 20, 2023",
    venue: "Rebel Nightclub",
    perks: "Discounted entry, Express line access",
    spots: 40,
    description: "Get on the guestlist for Saturday night at Toronto's largest nightclub. Features multiple rooms of music with top DJs.",
    requirements: "Even ratio preferred, Arrive before 11PM, Dress code: Fashionable",
    contact: "vip@rebeltoronto.com"
  },
  {
    id: 5,
    title: "House Music Lovers @ CODA",
    image: "/images/guestlist5.jpg",
    date: "May 21, 2023",
    venue: "CODA",
    perks: "Reduced cover, Free check coat",
    spots: 25,
    description: "Special guestlist for house music enthusiasts. Experience one of Toronto's best sound systems with international and local DJs.",
    requirements: "Arrive before midnight, Dress code: Casual",
    contact: "guest@codatoronto.com"
  },
  {
    id: 6,
    title: "Friday Social @ Lost And Found",
    image: "/images/guestlist6.jpg",
    date: "May 19, 2023",
    venue: "Lost And Found",
    perks: "Free entry, Reserved area",
    spots: 15,
    description: "Start your weekend right with Friday Social at Lost And Found. Join our guestlist for free entry and a reserved area for your group.",
    requirements: "Minimum group of 4, Arrive before 10:30PM, Dress code: Smart casual",
    contact: "fridays@lostandfoundto.com"
  }
];

export default function handler(req, res) {
  const { venue, date } = req.query;
  
  let filteredGuestlists = [...guestlists];
  
  // Filter by venue if provided
  if (venue) {
    filteredGuestlists = filteredGuestlists.filter(guestlist => 
      guestlist.venue.toLowerCase().includes(venue.toLowerCase())
    );
  }
  
  // Filter by date if provided
  if (date) {
    filteredGuestlists = filteredGuestlists.filter(guestlist => 
      guestlist.date === date
    );
  }
  
  res.status(200).json(filteredGuestlists);
} 