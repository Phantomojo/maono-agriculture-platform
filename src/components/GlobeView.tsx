import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

interface GlobeViewProps {
  isVisible: boolean;
  onClose: () => void;
}

const GlobeView: React.FC<GlobeViewProps> = ({ isVisible, onClose }) => {
  const globeRef = useRef<any>(null);
  const [globeData, setGlobeData] = useState<any>(null);
  const [displaySettings, setDisplaySettings] = useState({
    showPoints: true,
    showArcs: true,
    showLabels: true,
    autoRotate: true,
  });

  // Agricultural regions data
  const agriculturalRegions = [
    { lat: 1.2921, lng: 36.8219, size: 0.3, color: '#00ff88', name: 'Nairobi' },
    { lat: -0.4700, lng: 37.1300, size: 0.25, color: '#4CAF50', name: 'Karatina' },
    { lat: -0.8000, lng: 37.4000, size: 0.2, color: '#2E7D32', name: 'Mwea' },
    { lat: -0.0917, lng: 34.7680, size: 0.25, color: '#00ff88', name: 'Kisumu' },
    { lat: 39.9042, lng: 116.4074, size: 0.4, color: '#FF9800', name: 'Beijing' },
    { lat: 28.6139, lng: 77.2090, size: 0.4, color: '#FF9800', name: 'Delhi' },
    { lat: 52.5200, lng: 13.4050, size: 0.3, color: '#2196F3', name: 'Berlin' },
    { lat: 40.7128, lng: -74.0060, size: 0.3, color: '#9C27B0', name: 'New York' },
  ];

  const agriculturalConnections = [
    { startLat: 1.2921, startLng: 36.8219, endLat: -0.4700, endLng: 37.1300, color: '#00ff88' },
    { startLat: 1.2921, startLng: 36.8219, endLat: -0.8000, endLng: 37.4000, color: '#4CAF50' },
    { startLat: 1.2921, startLng: 36.8219, endLat: -0.0917, endLng: 34.7680, color: '#2E7D32' },
    { startLat: 1.2921, startLng: 36.8219, endLat: 39.9042, endLng: 116.4074, color: '#FF9800' },
    { startLat: 1.2921, startLng: 36.8219, endLat: 28.6139, endLng: 77.2090, color: '#FF9800' },
  ];

  useEffect(() => {
    if (isVisible && globeRef.current) {
      setGlobeData({
        pointsData: agriculturalRegions,
        arcsData: agriculturalConnections,
        labelsData: agriculturalRegions.map(region => ({
          lat: region.lat,
          lng: region.lng,
          text: region.name,
          size: 1.5,
          color: '#ffffff',
        })),
      });
    }
  }, [isVisible]);

  const toggleAutoRotate = () => {
    setDisplaySettings(prev => ({ ...prev, autoRotate: !prev.autoRotate }));
  };

  const togglePoints = () => {
    setDisplaySettings(prev => ({ ...prev, showPoints: !prev.showPoints }));
  };

  const toggleArcs = () => {
    setDisplaySettings(prev => ({ ...prev, showArcs: !prev.showArcs }));
  };

  const toggleLabels = () => {
    setDisplaySettings(prev => ({ ...prev, showLabels: !prev.showLabels }));
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 10000,
      }}>
        <h2 style={{ color: '#00ff88', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          🌍 MAONO Global Agricultural Network
        </h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={toggleAutoRotate}
            style={{
              padding: '8px 16px',
              backgroundColor: displaySettings.autoRotate ? '#00ff88' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {displaySettings.autoRotate ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Globe Container */}
      <div style={{ flex: 1, marginTop: '60px' }}>
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={displaySettings.showPoints ? globeData?.pointsData : []}
          pointColor="color"
          pointAltitude="size"
          pointRadius={0.5}
          pointsMerge={false}
          arcsData={displaySettings.showArcs ? globeData?.arcsData : []}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          labelsData={displaySettings.showLabels ? globeData?.labelsData : []}
          labelText="text"
          labelSize={1.5}
          labelDotRadius={0.3}
          labelColor="color"
          onPointClick={(point: any) => {
            console.log('Point clicked:', point);
          }}
          enablePointerInteraction={true}
        />
      </div>

      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '15px',
        borderRadius: '8px',
        color: 'white',
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#00ff88' }}>Controls</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={togglePoints}
            style={{
              padding: '6px 12px',
              backgroundColor: displaySettings.showPoints ? '#00ff88' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {displaySettings.showPoints ? '✅' : '❌'} Agricultural Regions
          </button>
          <button
            onClick={toggleArcs}
            style={{
              padding: '6px 12px',
              backgroundColor: displaySettings.showArcs ? '#00ff88' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {displaySettings.showArcs ? '✅' : '❌'} Trade Routes
          </button>
          <button
            onClick={toggleLabels}
            style={{
              padding: '6px 12px',
              backgroundColor: displaySettings.showLabels ? '#00ff88' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {displaySettings.showLabels ? '✅' : '❌'} Labels
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '15px',
        borderRadius: '8px',
        color: 'white',
        maxWidth: '300px',
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#00ff88' }}>Global Network</h4>
        <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>🌍 {agriculturalRegions.length}</strong> Agricultural Regions
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>🔗 {agriculturalConnections.length}</strong> Trade Connections
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>📊 Real-time</strong> Market Data
          </p>
          <p style={{ margin: '0', color: '#00ff88' }}>
            <strong>🚀 Interactive</strong> 3D Globe
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobeView;


