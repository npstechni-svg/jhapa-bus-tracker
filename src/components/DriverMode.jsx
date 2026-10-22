import React, { useState, useEffect, useRef } from 'react';
import { ROUTE_PATH_COORDINATES } from '../data/mockData';

export default function DriverMode({ vehicles, onUpdateVehicleLocation }) {
  const [selectedVehId, setSelectedVehId] = useState(vehicles[0]?.id || '');
  const [isTripActive, setIsTripActive] = useState(false);
  const [useSimulatedGPS, setUseSimulatedGPS] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(32);
  const [gpsStatus, setGpsStatus] = useState('Standby');
  const [logs, setLogs] = useState([]);

  const simStepRef = useRef(0);
  const watchIdRef = useRef(null);
  const timerRef = useRef(null);

  const selectedVeh = vehicles.find((v) => v.id === selectedVehId);

  // Add system log
  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
  };

  // Start Trip
  const handleStartTrip = () => {
    setIsTripActive(true);
    setGpsStatus('Broadcasting Live GPS 🟢');
    addLog(`Trip started for ${selectedVeh?.vehicle_number || selectedVehId}`);

    if (useSimulatedGPS) {
      // Simulates real-time driving along the Gauriganj - Damak road
      timerRef.current = setInterval(() => {
        simStepRef.current = (simStepRef.current + 1) % ROUTE_PATH_COORDINATES.length;
        const [lat, lng] = ROUTE_PATH_COORDINATES[simStepRef.current];
        const randomSpeed = Math.floor(25 + Math.random() * 20);
        setCurrentSpeed(randomSpeed);

        onUpdateVehicleLocation(selectedVehId, {
          lat,
          lng,
          speed: randomSpeed,
          heading: 10,
          last_updated: Date.now()
        });

        addLog(`Sent Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (${randomSpeed} km/h)`);
      }, 4000);
    } else {
      // Real Phone GPS via browser Geolocation API
      if ('geolocation' in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude, speed } = pos.coords;
            const spd = speed ? Math.round(speed * 3.6) : 25;
            setCurrentSpeed(spd);
            onUpdateVehicleLocation(selectedVehId, {
              lat: latitude,
              lng: longitude,
              speed: spd,
              heading: 0,
              last_updated: Date.now()
            });
            addLog(`Real GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          },
          (err) => {
            setGpsStatus(`GPS Error: ${err.message}`);
            addLog(`Error: ${err.message}`);
          },
          { enableHighAccuracy: true, maximumAge: 3000 }
        );
      } else {
        alert('Geolocation is not supported on this device.');
      }
    }
  };

  // End Trip
  const handleEndTrip = () => {
    setIsTripActive(false);
    setGpsStatus('Trip Ended ⚪');
    if (timerRef.current) clearInterval(timerRef.current);
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    addLog('Trip stopped. Location broadcasting terminated.');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  return (
    <div className="driver-panel" style={{ overflowY: 'auto' }}>
      <div className="driver-banner">
        <h3>🚗 चालक ड्यासबोर्ड (Driver Transmitter)</h3>
        <p>गौरीगञ्ज–दमक रुट: मोबाइलबाट सिधै यात्रुलाई लाइभ लोकेसन पठाउनुहोस्।</p>
      </div>

      {/* Vehicle Selection */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#475569' }}>
          आफ्नो सवारी छान्नुहोस्:
        </label>
        <select
          className="driver-select"
          disabled={isTripActive}
          value={selectedVehId}
          onChange={(e) => setSelectedVehId(e.target.value)}
        >
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.vehicle_number} ({v.type.toUpperCase()}) - {v.driver_name}
            </option>
          ))}
        </select>
      </div>

      {/* GPS Mode Switcher */}
      <div style={{
        background: '#f8fafc',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <b style={{ fontSize: '13px' }}>Simulated Test GPS</b>
          <p style={{ fontSize: '11px', color: '#64748b' }}>गौरीगञ्ज–दमक सडकमा अटोमेटिक गुड्छ</p>
        </div>
        <input
          type="checkbox"
          disabled={isTripActive}
          checked={useSimulatedGPS}
          onChange={(e) => setUseSimulatedGPS(e.target.checked)}
          style={{ width: '18px', height: '18px' }}
        />
      </div>

      {/* Big Action Button */}
      {!isTripActive ? (
        <button className="trip-btn start" onClick={handleStartTrip}>
          ▶ यात्रा सुरु गर्नुहोस् (Start Trip)
        </button>
      ) : (
        <button className="trip-btn end" onClick={handleEndTrip}>
          ⏹ यात्रा बन्द गर्नुहोस् (End Trip)
        </button>
      )}

      {/* Live Status Indicators */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>वर्तमान स्थिति</span>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '12px' }}>{gpsStatus}</p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>गति (Speed)</span>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '13px', color: '#059669' }}>
            {isTripActive ? `${currentSpeed} km/h` : '0 km/h'}
          </p>
        </div>
      </div>

      {/* Real-time Broadcast Logs */}
      <div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>लाइभ प्रसारण लग:</span>
        <div style={{
          marginTop: '6px',
          background: '#0f172a',
          color: '#34d399',
          padding: '8px 10px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '11px',
          minHeight: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          {logs.length === 0 ? '> Ready to broadcast...' : logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}
