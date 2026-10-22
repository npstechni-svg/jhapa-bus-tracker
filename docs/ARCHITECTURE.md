# Architecture & Data Specification
## Jhapa Transport Tracker (Gauriganj – Damak MVP)

---

### 1. System Components

1. **Driver Mode (Mobile App)**
   - Driver logs in via Firebase Authentication.
   - Selects assigned vehicle (`BUS-01`, `AUTO-05`, `SAFARI-12`).
   - Toggles **"Start Trip"** -> Begins broadcasting GPS location every 5–10 seconds.
   - Toggles **"End Trip"** -> Immediately stops location broadcasting and updates vehicle status to `inactive`.

2. **Passenger Interface (Mobile & Web)**
   - Interactive OpenStreetMap (Leaflet/MapLibre).
   - Filter pills: `All`, `Bus 🚌`, `Auto 🛺`, `City Safari 🔋`.
   - Real-time vehicle pins moving on map.
   - Route path line with designated stops between Gauriganj Chowk and Damak Bus Park.
   - Status badge on each vehicle:
     - 🟢 **Live**: Updated within last 15 seconds.
     - 🟡 **Delayed / Stale**: Updated 16–90 seconds ago (network weak or stalled).
     - ⚪ **Offline**: Not updated for > 90 seconds (never show stale data as live).

3. **Admin Panel (Web)**
   - Register vehicles and assign driver accounts.
   - Manage Gauriganj – Damak route coordinates and stops.
   - Monitor live active vehicles.

---

### 2. Firebase Realtime Database Structure

```json
{
  "routes": {
    "gauriganj_damak": {
      "id": "gauriganj_damak",
      "name_en": "Gauriganj - Damak",
      "name_ne": "गौरीगञ्ज - दमक",
      "stops": [
        { "id": "s1", "name": "Gauriganj Chowk", "lat": 26.46744, "lng": 87.71075, "order": 1 },
        { "id": "s2", "name": "Gauradaha Chowk", "lat": 26.5683, "lng": 87.7025, "order": 2 },
        { "id": "s3", "name": "Urlabari Mod", "lat": 26.6500, "lng": 87.6400, "order": 3 },
        { "id": "s4", "name": "Damak Bus Park", "lat": 26.6667, "lng": 87.6917, "order": 4 }
      ]
    }
  },
  "vehicles": {
    "VEH_001": {
      "id": "VEH_001",
      "vehicle_number": "Me 1 Kha 1234",
      "type": "bus", // "bus" | "auto" | "safari"
      "route_id": "gauriganj_damak",
      "status": "active", // "active" | "inactive"
      "driver_id": "driver_uid_abc",
      "location": {
        "latitude": 26.5123,
        "longitude": 87.7050,
        "speed": 35.2,
        "heading": 12.0,
        "timestamp": 1792653000000
      }
    }
  }
}
```

---

### 3. Freshness Calculation Formula
On the client application, vehicle status is calculated dynamically:

$$\Delta t = \text{Current Client Timestamp} - \text{location.timestamp}$$

- If $\Delta t < 15\text{ seconds}$ $\rightarrow$ **Status: Live 🟢**
- If $15\text{ seconds} \le \Delta t \le 90\text{ seconds}$ $\rightarrow$ **Status: Stale 🟡**
- If $\Delta t > 90\text{ seconds}$ $\rightarrow$ **Status: Offline / Inactive ⚪**
