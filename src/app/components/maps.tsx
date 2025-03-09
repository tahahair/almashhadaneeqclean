// components/Map.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markerPosition?: {
    lat: number;
    lng: number;
  };
  searchPlaceholder?: string;
}

const Map: React.FC<MapProps> = ({
  apiKey,
  center,
  zoom = 15,
  markerPosition,
  searchPlaceholder = "Search for your building or area"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();
      
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        setMap(mapInstance);

        // Add marker if position is provided
        if (markerPosition) {
          new google.maps.Marker({
            position: markerPosition,
            map: mapInstance,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#FF5722',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 10
            }
          });
        }

        // Initialize search box
        if (searchInputRef.current) {
          const searchBoxInstance = new google.maps.places.SearchBox(searchInputRef.current);
          setSearchBox(searchBoxInstance);

          // Listen for the event fired when the user selects a prediction
          searchBoxInstance.addListener('places_changed', () => {
            const places = searchBoxInstance.getPlaces();
            if (places && places.length > 0) {
              const place = places[0];
              if (place.geometry && place.geometry.location) {
                mapInstance.setCenter(place.geometry.location);
                mapInstance.setZoom(17);
              }
            }
          });
        }
      }
    };

    initMap();
  }, [apiKey, center, zoom, markerPosition]);

  return (
    <div className="map-container" style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <div className="search-bar" style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 10, 
        width: '90%', 
        maxWidth: '500px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)', 
          padding: '0 16px' 
        }}>
          <div style={{ marginRight: '8px', color: '#5F6368' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder={searchPlaceholder}
            style={{ 
              flex: 1, 
              border: 'none', 
              outline: 'none', 
              padding: '12px 0', 
              fontSize: '16px' 
            }}
          />
          <button style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            padding: '8px', 
            color: '#5F6368' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <div className="map-controls" style={{ position: 'absolute', right: '10px', bottom: '100px', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button 
            className="control-button" 
            style={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginBottom: '8px',
              cursor: 'pointer'
            }}
            onClick={() => map?.setZoom((map.getZoom() || 15) + 1)}
          >
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>+</span>
          </button>
          <button 
            className="control-button" 
            style={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => map?.setZoom((map.getZoom() || 15) - 1)}
          >
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>−</span>
          </button>
        </div>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '10px', 
        left: '10px', 
        zIndex: 5, 
        color: '#70757a', 
        fontSize: '11px' 
      }}>
        <span>© Google {new Date().getFullYear()} | Terms | Report a map error</span>
      </div>
    </div>
  );
};

export default Map;