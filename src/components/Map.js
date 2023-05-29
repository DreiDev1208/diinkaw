import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJlaWRldjAyMTciLCJhIjoiY2xpMmcyODlnMGxzYzNpbHBtb3JsN291eiJ9.ditI90sKmAK4WVBDKDZpqg';

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          // Initialize map
          mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 12,
          });

          // User marker
          userMarkerRef.current = new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        },
        error => {
          console.log('Error getting user location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    // Function to re-center the map on the user's location
    const recenterMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            mapRef.current.flyTo({ center: [longitude, latitude], zoom: 12 });
            userMarkerRef.current.setLngLat([longitude, latitude]);
          },
          error => {
            console.log('Error getting user location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    // Recenter button
    const recenterButton = document.createElement('button');
    recenterButton.className = 'recenter-button';
    recenterButton.innerHTML = '<svg class="recenter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 7.5c-1.8 0-3.5.7-4.8 2-1.5 1.5-2.2 3.6-1.8 5.7l-.3-.1c-2.2-.6-4.2-1.8-5.7-3.3s-2.7-3.5-3.3-5.7l-.1-.3c2.1.4 4.2-.3 5.7-1.8C8.8 2 10.5.5 12 .5S15.2 2 16.8 3.6c1.5 1.5 2.2 3.6 1.8 5.7l.3.1c2.2.6 4.2 1.8 5.7 3.3s2.7 3.5 3.3 5.7l.1.3c-2.1-.4-4.2.3-5.7 1.8-1.5 1.5-3.6 2.2-5.7 1.8s-3.5-2.2-3.3-5.7l.1-.3c-1.4-2.2-.1-5.1 2.2-6.6C8.5 7.2 10.2 7.5 12 7.5zm0-5C5.9 2.5.5 8 1 14.5 1.5 21 7 26.4 13.5 26h.5c6.6 0 12-5.4 12-12S20.6 2.5 14 2.5h-1zm6 12h-4v4h-2v-4H6v-2h4V6h2v4h4v2z"/></svg>';

    recenterButton.addEventListener('click', recenterMap);

    mapContainerRef.current.appendChild(recenterButton);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
