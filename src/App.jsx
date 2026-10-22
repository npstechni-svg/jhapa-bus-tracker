import React, { useState } from 'react';
import Map from './components/Map';
import PassengerView from './components/PassengerView';
import DriverMode from './components/DriverMode';
import AdminPanel from './components/AdminPanel';
import { INITIAL_VEHICLES } from './data/mockData';

export default function App() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'bus' | 'auto' | 'safari'
  const [appMode, setAppMode] = useState('passenger'); // 'passenger' | 'driver' | 'admin'
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(true);

  // Update vehicle coordinates (called by Driver mode or live sync)
  const handleUpdateVehicleLocation = (vehId, newLocation) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehId ? { ...v, location: newLocation } : v))
    );
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">🚌</div>
          <div className="brand-info">
            <h1>झापा यातायात लाइभ</h1>
            <span>गौरीगञ्ज – दमक रुट</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="mode-toggle">
            <button
              className={`mode-btn ${appMode === 'passenger' ? 'active' : ''}`}
              onClick={() => setAppMode('passenger')}
            >
              यात्रु (User)
            </button>
            <button
              className={`mode-btn ${appMode === 'driver' ? 'active' : ''}`}
              onClick={() => setAppMode('driver')}
            >
              चालक (Driver)
            </button>
            <button
              className={`mode-btn ${appMode === 'admin' ? 'active' : ''}`}
              onClick={() => setAppMode('admin')}
            >
              एडमिन
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="main-layout">
        {/* Desktop Sidebar */}
        <aside className="desktop-sidebar">
          {appMode === 'passenger' && (
            <PassengerView
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          )}

          {appMode === 'driver' && (
            <DriverMode
              vehicles={vehicles}
              onUpdateVehicleLocation={handleUpdateVehicleLocation}
            />
          )}

          {appMode === 'admin' && (
            <AdminPanel vehicles={vehicles} />
          )}
        </aside>

        {/* Map Area */}
        <main className="map-container">
          {/* Floating Filter Pills on Top of Map */}
          {appMode === 'passenger' && (
            <div className="filter-overlay">
              <button
                className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                सबै ({vehicles.length})
              </button>
              <button
                className={`filter-pill ${filterType === 'bus' ? 'active' : ''}`}
                onClick={() => setFilterType('bus')}
              >
                🚌 बस ({vehicles.filter((v) => v.type === 'bus').length})
              </button>
              <button
                className={`filter-pill ${filterType === 'auto' ? 'active' : ''}`}
                onClick={() => setFilterType('auto')}
              >
                🛺 अटो ({vehicles.filter((v) => v.type === 'auto').length})
              </button>
              <button
                className={`filter-pill ${filterType === 'safari' ? 'active' : ''}`}
                onClick={() => setFilterType('safari')}
              >
                🔋 सिटी सफारी ({vehicles.filter((v) => v.type === 'safari').length})
              </button>
            </div>
          )}

          <Map
            vehicles={vehicles.filter((v) => filterType === 'all' || v.type === filterType)}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
          />
        </main>

        {/* Mobile Expandable Drawer */}
        <div className="mobile-drawer" style={{ transform: mobileDrawerOpen ? 'translateY(0)' : 'translateY(80%)' }}>
          <div className="drawer-handle" onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)} />
          {appMode === 'passenger' && (
            <PassengerView
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          )}

          {appMode === 'driver' && (
            <DriverMode
              vehicles={vehicles}
              onUpdateVehicleLocation={handleUpdateVehicleLocation}
            />
          )}

          {appMode === 'admin' && (
            <AdminPanel vehicles={vehicles} />
          )}
        </div>
      </div>
    </div>
  );
}
