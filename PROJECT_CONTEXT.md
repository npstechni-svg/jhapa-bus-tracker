# 🚌 Jhapa Transit Tracker — Master Project Context & Agent Briefing

> **Notice for Future AI Agents & Developers**:  
> Read this entire document before writing or modifying any code in this repository. It encapsulates the full origin, design discussions, architectural decisions, hardware philosophy, and roadmap agreed upon by the founding team.

---

## 1. Project Background & Core Mission

- **Project Name**: Jhapa Transit Tracker (नेपाल स्थानीय यातायात लाइभ)
- **Primary Founders / Team**: Nirmal & Prakash (`npstechni-svg` / `Pokhrelp910`)
- **Target Geography**: Jhapa District, Koshi Province, Eastern Nepal
- **Initial Pilot Route**: **Gauriganj Chowk ↔ Gauradaha ↔ Damak Bus Park**
- **Core Mission**: Modernize and digitize rural and semi-urban public transport in Nepal through a zero-cost hardware MVP. Give commuters accurate, reliable transit information while empowering local transport operators.

---

## 2. Problem Statement & The Nepali Transit Reality

1. **Unpredictable Waiting Times**: Commuters standing at Gauriganj Chowk, Khajurgachhi, or Gauradaha have no idea when the next bus, auto, or safari will arrive.
2. **Three Coexisting Vehicle Types**:
   - 🚌 **Public Buses** (Long & medium distance)
   - 🛺 **Autos / Tempos** (Inter-township transit)
   - 🔋 **City Safaris** (Electric e-rickshaws for short hops and local bazaar routes)
3. **No Heavy App Downloads**: Many local passengers have limited data packs or storage on entry-level Android devices. They need an instant, lightweight interface (accessible via a mobile browser or PWA through a QR code at bus stops) rather than forcing an 80MB app download.
4. **Weak/Fluctuating 3G/4G Internet**: Transit tracking must handle network drops gracefully without freezing or displaying false location claims.

---

## 3. The "Rs. 0 Hardware Budget" Philosophy (Crucial!)

**Never assume or require dedicated GPS tracking hardware (e.g., Teltonika, OBD trackers) for the MVP.**

- **The Driver's Android Phone is the GPS Unit**: The bus driver or conductor opens the app, selects their vehicle, and taps **"Start Trip"**.
- The app streams latitude, longitude, speed, heading, and timestamps every 4–8 seconds while moving.
- When the trip concludes, the driver taps **"End Trip"**, and location broadcast terminates immediately to save battery and protect privacy.
- Dedicated hardware may be introduced in Phase 3 after operator monetization, but the system must forever remain compatible with smartphone-based beaconing.

---

## 4. Key Architectural & Technology Decisions

### Why OpenStreetMap (OSM) + Leaflet (NOT Google Maps initially)?
1. **Zero Billing / No Credit Card Requirement**: Google Maps API requires an international credit card with automated billing. In Nepal, acquiring international cards is restrictive, and unexpected usage spikes could cause billing shocks. OpenStreetMap with Leaflet is 100% free and open-source.
2. **Superior Local Mapping in Nepal**: Kathmandu Living Labs and the Nepali OpenStreetMap community have mapped local Terai roads, chowks, and feeder routes (including the Hulaki Rajmarg / Postal Highway) in extensive detail.
3. **Custom Asset Freedom**: Leaflet allows lightweight, custom SVG/HTML markers for buses, autos, and safaris with pulsing live status rings.

### Frontend & Cross-Platform Strategy
- **Base Stack**: React + Vite + Leaflet + Lucide Icons.
- **Port Assignment**: Configured to run on **Port 5173** (with `strictPort: false`) to avoid port conflicts with other local backend services or existing projects running on Port 3000.
- **Responsive by Design**:
  - **Desktop / Windows**: Sidebar controls on the left, full interactive map on the right.
  - **Mobile / Phone**: Full-screen map with floating vehicle filter pills at the top, and an expandable bottom drawer (sheet) for vehicle details and verified stops.
- **Target Expansion**: Built with web standards so it can seamlessly package into:
  - Responsive Web / PWA (immediate access via QR codes at bus stands)
  - Android & iOS (via Capacitor or React Native/Expo)
  - Windows Desktop (.exe via Electron or Tauri for bus park station counters)

### Backend & Cloud Sync
- **Database**: Firebase Realtime Database (free Spark Tier) or Supabase.
- **Authentication**: Firebase Auth for drivers and admin operators. Passengers do **not** require login.

---

## 5. Strict MVP Scope & Freshness Logic

### 🚫 Explicitly Excluded from Phase 1:
Do **NOT** add the following features during Phase 1:
- ❌ No online ticketing or seat booking
- ❌ No payment gateway integrations (eSewa, Khalti, Fonepay)
- ❌ No in-app passenger-driver chat
- ❌ No commercial advertisements

### 🟢🟡⚪ Data Freshness Rules (Golden Rule):
**Never label stale data as "Live".** Network drops are common along the Gauriganj–Damak route.

Client freshness logic:
$$\Delta t = \text{Current Timestamp} - \text{Vehicle Location Timestamp}$$

- $\Delta t \le 15\text{ seconds}$: **🟢 LIVE** (Pulsing green indicator).
- $15\text{ seconds} < \Delta t \le 90\text{ seconds}$: **🟡 STALE / DELAYED** (Show exact elapsed seconds, e.g. "45s ago").
- $\Delta t > 90\text{ seconds}$: **⚪ OFFLINE / INACTIVE** (Clear marker indicating the vehicle has stopped broadcasting).

---

## 6. Pilot Corridor Landmarks & Stops

| Stop # | Stop Name (English) | Stop Name (नेपाली) | Latitude | Longitude | Landmark Description |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **1** | Gauriganj Chowk | गौरीगञ्ज चोक | 26.46744 | 87.71075 | Hulaki Rajmarg junction, south market hub |
| **2** | Khajurgachhi Bazaar | खजुरगाछी बजार | 26.50500 | 87.70800 | Local market & police post |
| **3** | Gauradaha Chowk | गौरादह चोक | 26.56830 | 87.70250 | Gauradaha Municipality main hub |
| **4** | Kerkha Mod | केर्खा मोड | 26.62100 | 87.69650 | Kamal rural municipality feeder road |
| **5** | Damak Dakshin Gate | दमक दक्षिण गेट | 26.64800 | 87.69300 | Southern highway entrance to Damak |
| **6** | Damak Bus Park | दमक बसपार्क | 26.66670 | 87.69170 | Regional interchange hub near Mahendra Highway |

---

## 7. Directory Structure Reference

```text
Bus Tracker/
├── docs/
│   ├── ARCHITECTURE.md       # Database schemas & technical specs
│   └── TEAM_WORKFLOW.md      # Team Git guide (branching, commits, PRs)
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx    # Fleet & route monitoring dashboard
│   │   ├── DriverMode.jsx    # Driver GPS transmitter (Simulated & Real Geolocation)
│   │   ├── Map.jsx           # Leaflet/OSM map with custom vehicle pins
│   │   └── PassengerView.jsx # Vehicle cards, stops list & category filters
│   ├── data/
│   │   └── mockData.js       # Pilot route coordinates, verified stops & vehicles
│   ├── App.jsx               # Root component with responsive layout & mode switcher
│   ├── index.css             # Unified responsive design system & animations
│   └── main.jsx              # React DOM mounting
├── index.html                # HTML5 shell with viewport & Leaflet styles
├── package.json              # Project scripts & dependencies (React, Leaflet, Vite)
├── vite.config.js            # Vite config (Port 5173, auto fallback)
├── PROJECT_CONTEXT.md        # THIS FILE (Master Project Context)
└── README.md                 # Public repository overview
```

---

## 8. Instructions for Future AI Agents & Subagents

When you are asked to make changes to this codebase:
1. **Preserve the Philosophy**: Always maintain the zero-cost, lightweight ethos. Never force heavy external libraries where native or lightweight alternatives exist.
2. **Never Break Freshness Tracking**: Any modification to vehicle location streaming must respect the `last_updated` calculation.
3. **Preserve Bilingual Support**: Retain Nepali and English labels for stops, routes, and vehicle types (`नेपाली` / `English`).
4. **Check Port Conflict**: Do not revert the dev server port back to 3000; keep it on **5173** (or dynamic via `strictPort: false`).
5. **Follow Team Git Etiquette**: When writing commits, use descriptive conventional commit messages (e.g., `feat: ...`, `fix: ...`, `docs: ...`).
