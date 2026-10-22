import React, { useState } from 'react';
import { GAURIGANJ_DAMAK_STOPS } from '../data/mockData';

export default function PassengerView({ vehicles, selectedVehicle, onSelectVehicle, filterType, setFilterType }) {
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' | 'stops'

  // Filter vehicles
  const filteredVehicles = vehicles.filter((v) => {
    if (filterType === 'all') return true;
    return v.type === filterType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        padding: '8px 12px',
        gap: '8px',
        background: '#ffffff'
      }}>
        <button
          onClick={() => setActiveTab('vehicles')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'vehicles' ? '#10b981' : '#f1f5f9',
            color: activeTab === 'vehicles' ? '#ffffff' : '#475569'
          }}
        >
          सवारीहरू ({filteredVehicles.length})
        </button>
        <button
          onClick={() => setActiveTab('stops')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'stops' ? '#10b981' : '#f1f5f9',
            color: activeTab === 'stops' ? '#ffffff' : '#475569'
          }}
        >
          स्टपहरू ({GAURIGANJ_DAMAK_STOPS.length})
        </button>
      </div>

      {/* Tab 1: Vehicles List */}
      {activeTab === 'vehicles' && (
        <div className="vehicles-list" style={{ overflowY: 'auto', flex: 1 }}>
          {filteredVehicles.map((veh) => {
            const diffSec = Math.floor((Date.now() - veh.location.last_updated) / 1000);
            const isLive = diffSec <= 15;
            const isStale = diffSec > 15 && diffSec <= 90;
            const typeEmoji = veh.type === 'bus' ? '🚌' : veh.type === 'auto' ? '🛺' : '🔋';
            const isSelected = selectedVehicle?.id === veh.id;

            return (
              <div
                key={veh.id}
                className={`vehicle-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectVehicle(veh)}
              >
                <div className="veh-info">
                  <div className="veh-icon-box">
                    {typeEmoji}
                  </div>
                  <div className="veh-details">
                    <h4>{veh.vehicle_number}</h4>
                    <p>{veh.route_ne}</p>
                    <p style={{ color: '#059669', fontWeight: 600 }}>{veh.location.speed} km/h</p>
                  </div>
                </div>

                <div className="veh-status-badge">
                  {isLive ? (
                    <span className="badge badge-live">
                      <span className="pulse-dot pulse"></span>
                      लाइभ
                    </span>
                  ) : isStale ? (
                    <span className="badge badge-stale">
                      <span className="pulse-dot"></span>
                      {diffSec}s अघि
                    </span>
                  ) : (
                    <span className="badge badge-offline">
                      अफलाइन
                    </span>
                  )}
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                    {veh.type.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Stops List */}
      {activeTab === 'stops' && (
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {GAURIGANJ_DAMAK_STOPS.map((stop) => (
            <div
              key={stop.id}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '12px'
              }}>
                {stop.order}
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 700 }}>{stop.name_ne}</h5>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{stop.name_en} • {stop.landmark}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
