// pages/index.tsx
"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import Map from '../components/maps';

const Home: NextPage = () => {
  // Replace with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  // Sample coordinates for Karabük University (from the image)
  const centerCoordinates = {
    lat: 41.2056,
    lng: 32.6552
  };
  
  // Location for the orange marker
  const markerPosition = {
    lat: 41.2060,
    lng: 32.6560
  };

  return (
    <div>
      <Head>
        <title>Google Maps Component</title>
        <meta name="description" content="Google Maps integration with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px' 
      }}>
        <h1>Campus Map</h1>
        <Map 
          apiKey={GOOGLE_MAPS_API_KEY}
          center={centerCoordinates}
          markerPosition={markerPosition}
          searchPlaceholder="Search for your building or area"
        />
      </main>
    </div>
  );
};

export default Home;