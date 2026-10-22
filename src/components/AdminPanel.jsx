import React from 'react';
import { GAURIGANJ_DAMAK_STOPS } from '../data/mockData';

export default function AdminPanel({ vehicles }) {
  const activeCount = vehicles.filter((v) => {
    const diff = (Date.now() - v.location.last_updated) / 1000;
    return diff <= 90;
  }).length;

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
      <div style={{
        background: '#0f172a',
        color: 'white',
        padding: '16px',
        borderRadius: '12px'
      }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>🛠️ प्रशासनिक ड्यासबोर्ड (Admin)</h3>
        <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94a3b8' }}>झापा सार्वजनिक यातायात व्यवस्थापन प्यानल</p>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
          <span style={{ fontSize: '10px', color: '#047857', fontWeight: 700 }}>लाइभ सवारी</span>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#065f46' }}>{activeCount}</h2>
        </div>
        <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
          <span style={{ fontSize: '10px', color: '#1d4ed8', fontWeight: 700 }}>कुल सवारी</span>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#1e40af' }}>{vehicles.length}</h2>
        </div>
        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>कुल स्टप</span>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#334155' }}>{GAURIGANJ_DAMAK_STOPS.length}</h2>
        </div>
      </div>

      {/* Registered Fleet List */}
      <div>
        <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>दर्ता भएका सवारी तथा चालकहरू:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {vehicles.map((v) => (
            <div
              key={v.id}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <b style={{ fontSize: '13px' }}>{v.vehicle_number}</b>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                  चालक: {v.driver_name} ({v.driver_phone})
                </p>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px',
                background: '#f1f5f9'
              }}>
                {v.type.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
