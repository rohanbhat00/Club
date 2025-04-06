# TONight - Toronto Nightlife Discovery

A modern, responsive web application for discovering Toronto's vibrant nightlife scene. Find the best clubs, bars, events, and exclusive guestlists.

![TONight Screenshot](public/images/screenshot.jpg)

## Features

- **Discover Events**: Browse featured events, trending venues, and upcoming DJ nights
- **Interactive Map**: Explore Toronto's nightlife venues on an interactive map
- **Guestlists**: Access exclusive guestlists and skip-the-line perks
- **Mobile-First Design**: Fully responsive design that works beautifully on all devices
- **Dark Mode UI**: Sleek, dark-themed design with neon accents perfect for nightlife

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Map Integration**: React Leaflet
- **Authentication**: NextAuth.js
- **Database**: MongoDB (planned)
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nightlife-toronto.git
cd nightlife-toronto
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nightlife-toronto/
├── components/          # React components
├── pages/               # Next.js pages
├── public/              # Static assets
│   └── images/          # Image assets
├── styles/              # Global styles
└── tailwind.config.js   # Tailwind configuration
```

## Planned Features

- User authentication with Google/Apple sign-in
- Venue owners can submit and manage their venues/events
- Users can save favorite venues and events
- Event RSVP functionality
- Venue reviews and ratings
- Mobile app (React Native)

## Customization

The application is designed to be easily customizable:

- City-specific data can be swapped out
- Color scheme can be adjusted in `tailwind.config.js`
- API endpoints can be configured to connect to different data sources

## License

MIT License

## Acknowledgements

- Inspired by [NightlifePlus](https://www.nightlifeplus.app)
- UI design best practices from various modern nightlife websites 