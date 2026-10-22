import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ROUTE_PATH_COORDINATES, GAURIGANJ_DAMAK_STOPS } from '../data/mockData';

// Fix Leaflet default icon paths if needed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map({ vehicles, selectedVehicle, onSelectVehicle, userLocation }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const routePolylineRef = useRef(null);
  const userMarkerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      // Center between Gauriganj and Damak
      const map = L.map(mapRef.current, {
        center: [26.5670, 87.7020],
        zoom: 11,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap Tiles (100% Free, Zero Billing)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors | Jhapa Transit'
      }).addTo(map);

      // Draw Gauriganj to Damak Route Line
      routePolylineRef.current = L.polyline(ROUTE_PATH_COORDINATES, {
        color: '#059669',
        weight: 5,
        opacity: 0.85,
        dashArray: '2, 6',
        lineCap: 'round'
      }).addTo(map);

      // Add Stop Markers along the route
      GAURIGANJ_DAMAK_STOPS.forEach((stop) => {
        const stopIcon = L.divIcon({
          className: 'custom-stop-marker',
          html: `
            <div style="
              width: 14px;
              height: 14px;
              background: #ffffff;
              border: 3px solid #059669;
              border-radius: 50%;
              box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            "></div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: system-ui; padding: 4px;">
            <b style="font-size: 14px; color: #0f172a;">${stop.name_ne}</b><br/>
            <span style="font-size: 12px; color: #64748b;">${stop.name_en}</span><br/>
            <span style="font-size: 11px; color: #059669;">Stop #${stop.order} • ${stop.landmark}</span>
          </div>
        `);
      });

      mapInstance.current = map;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update Vehicle Markers
  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;

    // Remove old markers that are no longer in list
    Object.keys(markersRef.current).forEach((id) => {
      if (!vehicles.find((v) => v.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add or update current vehicles
    vehicles.forEach((veh) => {
      const { lat, lng, speed, last_updated } = veh.location;
      const diffSec = Math.floor((Date.now() - last_updated) / 1000);
      
      const isLive = diffSec <= 15;
      const isStale = diffSec > 15 && diffSec <= 90;

      const typeEmoji = veh.type === 'bus' ? '🚌' : veh.type === 'auto' ? '🛺' : '🔋';
      const badgeColor = isLive ? '#10b981' : isStale ? '#f59e0b' : '#94a3b8';

      const customIcon = L.divIcon({
        className: 'custom-veh-marker',
        html: `
          <div style="
            position: relative;
            width: 44px;
            height: 44px;
            background: #ffffff;
            border-radius: 50%;
            border: 2px solid ${badgeColor};
            box-shadow: 0 3px 10px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
          ">
            ${typeEmoji}
            ${isLive ? `<span style="
              position: absolute;
              top: -2px;
              right: -2px;
              width: 12px;
              height: 12px;
              background: #10b981;
              border: 2px solid white;
              border-radius: 50%;
            "></span>` : ''}
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      if (markersRef.current[veh.id]) {
        // Move smoothly
        markersRef.current[veh.id].setLatLng([lat, lng]);
        markersRef.current[veh.id].setIcon(customIcon);
      } else {
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        marker.on('click', () => onSelectVehicle(veh));
        markersRef.current[veh.id] = marker;
      }

      // Update popup content
      const statusText = isLive 
        ? `<span style="color:#10b981; font-weight:bold;">🟢 Live (${diffSec}s ago)</span>`
        : isStale 
        ? `<span style="color:#f59e0b; font-weight:bold;">🟡 Stale (${diffSec}s ago)</span>`
        : `<span style="color:#94a3b8; font-weight:bold;">⚪ Offline</span>`;

      markersRef.current[veh.id].bindPopup(`
        <div style="font-family: system-ui; min-width: 160px; padding: 2px;">
          <h4 style="margin:0; font-size:14px; font-weight:800;">${veh.vehicle_number} (${typeEmoji})</h4>
          <p style="margin:2px 0 6px; font-size:12px; color:#64748b;">${veh.route_ne}</p>
          <div style="font-size:11px; margin-bottom:4px;">${statusText}</div>
          <div style="font-size:11px; color:#334155;">Speed: <b>${speed} km/h</b></div>
          <div style="font-size:11px; color:#334155;">Driver: <b>${veh.driver_name}</b></div>
        </div>
      `);
    });
  }, [vehicles, onSelectVehicle]);

  // Focus map when a vehicle is clicked
  useEffect(() => {
    if (selectedVehicle && mapInstance.current) {
      mapInstance.current.flyTo(
        [selectedVehicle.location.lat, selectedVehicle.location.lng],
        14,
        { duration: 1.2 }
      );
      if (markersRef.current[selectedVehicle.id]) {
        markersRef.current[selectedVehicle.id].openPopup();
      }
    }
  }, [selectedVehicle]);

  return (
    <div className="map-container">
      <div id="map" ref={mapRef} />
    </div>
  );
}
