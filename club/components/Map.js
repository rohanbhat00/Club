import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Map = ({ venues, activeVenue, setActiveVenue }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    // Skip if window is not defined (SSR) or Google Maps API not loaded yet
    if (typeof window === 'undefined' || !window.google || !window.google.maps) {
      return;
    }

    if (!mapLoaded && mapRef.current) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.6532, lng: -79.3832 }, // Toronto center coordinates
        zoom: 13,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#242f3e" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#746855" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#242f3e" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#17263c" }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{ "color": "#283d6a" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#38414e" }]
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      });

      const infoWindowInstance = new window.google.maps.InfoWindow();
      
      setMap(mapInstance);
      setInfoWindow(infoWindowInstance);
      setMapLoaded(true);
    }
  }, [mapLoaded]);

  // Add markers when venues or map changes
  useEffect(() => {
    if (!map || !venues || venues.length === 0) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const bounds = new window.google.maps.LatLngBounds();
    const newMarkers = venues.map(venue => {
      if (!venue.location || !venue.location.coordinates) return null;

      const [lng, lat] = venue.location.coordinates;
      
      // Skip if coordinates are invalid
      if (!lat || !lng) return null;
      
      const position = { lat, lng };
      bounds.extend(position);
      
      const isActive = activeVenue && activeVenue._id === venue._id;
      
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: venue.name,
        icon: {
          url: isActive ? '/images/marker-active.png' : '/images/marker.png',
          scaledSize: new window.google.maps.Size(isActive ? 44 : 32, isActive ? 44 : 32),
          anchor: new window.google.maps.Point(isActive ? 22 : 16, isActive ? 44 : 32),
        },
        animation: isActive ? window.google.maps.Animation.BOUNCE : null,
        zIndex: isActive ? 999 : 1
      });

      marker.addListener('click', () => {
        setActiveVenue(venue);
        
        // Create info window content
        const content = `
          <div class="bg-night-navy p-3 rounded-lg shadow-lg max-w-[250px]">
            <h3 class="font-bold text-white text-lg">${venue.name}</h3>
            <p class="text-gray-300 text-sm mb-2">${venue.type}</p>
            <p class="text-gray-400 text-xs">${venue.address}</p>
          </div>
        `;
        
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      return marker;
    }).filter(Boolean); // Remove null markers
    
    setMarkers(newMarkers);
    
    // Adjust bounds only if we have valid venues
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
      
      // Zoom out a bit to give context
      const listener = window.google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        if (map.getZoom() > 16) map.setZoom(16);
      });
    }
  }, [venues, map, activeVenue]);

  // Update marker appearance when active venue changes
  useEffect(() => {
    if (!map || !markers.length || !venues.length) return;

    markers.forEach((marker, index) => {
      const venue = venues[index];
      const isActive = activeVenue && venue._id === activeVenue._id;
      
      marker.setIcon({
        url: isActive ? '/images/marker-active.png' : '/images/marker.png',
        scaledSize: new window.google.maps.Size(isActive ? 44 : 32, isActive ? 44 : 32),
        anchor: new window.google.maps.Point(isActive ? 22 : 16, isActive ? 44 : 32),
      });
      
      marker.setAnimation(isActive ? window.google.maps.Animation.BOUNCE : null);
      marker.setZIndex(isActive ? 999 : 1);
      
      if (isActive) {
        map.panTo(marker.getPosition());
      }
    });
  }, [activeVenue, markers, venues, map]);

  return (
    <div className="w-full h-full relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-dark">
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-neon-pink text-4xl animate-bounce" />
            <p className="mt-4 text-white">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map; 