# 🚌 Jhapa Public Transport Tracker (Gauriganj – Damak MVP)

A real-time public transit tracking system for local buses, autos (tempo), and city safaris (electric rickshaws) in Jhapa, Nepal.

Designed as a **zero-cost hardware MVP** leveraging drivers' Android smartphones and free-tier cloud infrastructure.

---

## 🎯 Project Overview

- **Pilot Corridor**: Gauriganj Chowk ↔ Gauradaha ↔ Damak Bus Park (Jhapa, Koshi Province).
- **Tracked Vehicles**:
  - 🚌 Buses
  - 🛺 Autos / Tempos
  - 🔋 City Safaris (E-rickshaws)
- **Key Principles**:
  - No dedicated GPS devices purchased (runs via driver app on smartphone).
  - OpenStreetMap / Leaflet (no paid Google Maps API billing surprises).
  - Real-time location updates via Firebase Realtime Database.
  - Transparent data freshness (Live vs. Stale vs. Offline indicators).

---

## 🏗️ Project Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full database schema and freshness calculation logic.

```
Bus Tracker/
├── docs/
│   ├── ARCHITECTURE.md     # Firebase database schema & system architecture
│   └── TEAM_WORKFLOW.md    # Step-by-step Git instructions for team members
├── src/                    # Source code (Passenger UI, Driver Mode, Admin)
├── .gitignore              # Files excluded from Git (secrets, node_modules)
└── README.md               # Project documentation
```

---

## 👥 Team Collaboration

Refer to [docs/TEAM_WORKFLOW.md](docs/TEAM_WORKFLOW.md) for daily Git practices:
1. Always `git pull origin main` before starting work.
2. Work in feature branches (`git checkout -b feature/xyz`).
3. Commit often with descriptive messages.
4. Merge using Pull Requests on GitHub.

---

## 🚀 Quick Setup for Teammates

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd "Bus Tracker"
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the local environment**:
   ```bash
   npm start
   ```

---

## 🗺️ Roadmap
- [x] Repository initialization & team workflow setup
- [ ] Firebase project connection & authentication setup
- [ ] Gauriganj – Damak route line & stops mapping (Leaflet / OSM)
- [ ] Driver mode (Start Trip / GPS transmitter / End Trip)
- [ ] Passenger live map view with vehicle-type filter pills
- [ ] Admin panel for vehicle & driver approvals
