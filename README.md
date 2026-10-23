# 🚌 Jhapa Public Transport Tracker (Gauriganj – Damak MVP)

> **Important**: For complete project history, architectural decisions, and detailed instructions for developers & AI agents, read **[`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md)**.

A real-time public transit tracking system for local buses, autos (tempo), and city safaris (electric rickshaws) in Jhapa, Nepal.

Designed as a **zero-cost hardware MVP** leveraging participating drivers' Android smartphones and free-tier cloud infrastructure.

---

## 🎯 Project Overview

- **Pilot Corridor**: Gauriganj Chowk ↔ Khajurgachhi ↔ Gauradaha ↔ Damak Bus Park (Jhapa, Koshi Province).
- **Tracked Vehicles**:
  - 🚌 Buses (Medium & long-distance)
  - 🛺 Autos / Tempos (Inter-township)
  - 🔋 City Safaris (Electric rickshaws for local bazaar routes)
- **Key Principles**:
  - **Rs. 0 Hardware Budget**: Runs via driver smartphone GPS beaconing (no external GPS devices required).
  - **OpenStreetMap / Leaflet**: 100% free open-source mapping with no credit card billing traps.
  - **Accurate Freshness Indicator**: Clear distinction between 🟢 Live (<15s), 🟡 Stale (15–90s), and ⚪ Offline (>90s). Never displays stale locations as live.
  - **Responsive Everywhere**: Adapts smoothly to mobile screens (bottom drawer), tablets, and desktops (sidebar).

---

## 🏗️ Documentation Hub

- **[`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md)**: **Master Project Brief** — full history, design discussions, and developer/AI guidelines.
- **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**: Firebase database schema & freshness formulas.
- **[`docs/TEAM_WORKFLOW.md`](docs/TEAM_WORKFLOW.md)**: Step-by-step Git instructions for team members across different computers.

---

## 🚀 Quick Setup & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/npstechni-svg/jhapa-bus-tracker.git
   cd "Bus Tracker"
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run local development server**:
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:5173` (port 3000 is intentionally avoided to prevent conflicts with other running projects).*

---

## 🗺️ Roadmap
- [x] Initial repository setup & team collaboration workflow
- [x] Responsive base app (Mobile bottom drawer & Desktop sidebar)
- [x] Gauriganj – Damak corridor polyline & verified stops mapping
- [x] Vehicle filter pills (All, 🚌 Bus, 🛺 Auto, 🔋 City Safari)
- [x] Driver Mode with simulated route driving and real Geolocation support
- [x] Admin fleet & stops dashboard
- [x] Comprehensive project context briefing for AI agents & team members
- [ ] Connect live Firebase Realtime Database for cross-device cloud synchronization
- [ ] Add offline route caching for weak network zones
