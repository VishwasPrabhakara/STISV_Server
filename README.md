# 🏛️ STISV_Server — STIS-V 2025 Conference Platform

> Full-stack platform powering the **Fifth International Conference on the Science & Technology of Ironmaking and Steelmaking (STIS-V) 2025** at the Indian Institute of Science, Bengaluru.

**Live Site:** https://materials.iisc.ac.in/stis2025/

Built end-to-end — frontend, backend, database, and PDF generation — for a real international academic conference hosted by IISc's Department of Materials Engineering.

---

## What it does

A complete conference management platform with public-facing content pages and a backend handling delegate workflows:

### Public site
- **About** — conference scope, history, organizers
- **Programme** — multi-day session schedule with speaker tracks
- **Conference Registration** — multi-tier delegate registration with payment metadata capture
- **Proceedings** — publication submission and tracking
- **Venue & Location** — IISc campus details and arrival info
- **Tours & Social Events** — optional add-on registration
- **Sponsors** — multi-tier sponsor showcase
- **Announcements** — live updates from the organizing committee

### Backend services
- **Registration API** — validates and stores delegate submissions
- **MongoDB-backed storage** — delegates, sessions, sponsors, announcements
- **PDF generation** — auto-generated registration confirmations and certificates using NotoSans (multilingual support)
- **Admin endpoints** — for the organizing committee to manage submissions

---

## 🛠️ Tech Stack

**Frontend**
- **React** (Create React App)
- **JavaScript · CSS · HTML**
- Responsive multi-page layout

**Backend**
- **Node.js + Express** — REST API
- **MongoDB** — document store for delegates, sessions, sponsors
- **PDF generation** — server-side document rendering with NotoSans-Regular font for Unicode/multilingual support

**Infrastructure**
- Deployed on IISc Materials Engineering's web infrastructure
- Served at `materials.iisc.ac.in/stis2025/`

---

## 📁 Project Structure

```
STISV_Server/
├── public/              # Static frontend assets
├── server/              # Express API, MongoDB connection, routes
├── src/                 # React frontend
│   ├── components/      # Reusable UI components
│   └── pages/           # About, Programme, Registration, etc.
├── NotoSans-Regular.ttf # Font asset for server-side PDF rendering
├── package.json
└── README.md
```

---

## 🏃 Run Locally

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas connection string)

### Setup

```bash
git clone https://github.com/VishwasPrabhakara/STISV_Server.git
cd STISV_Server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/stisv
PORT=5000
NODE_ENV=development
```

### Run

```bash
# Start the backend
cd server
npm start

# In another terminal, start the React frontend
cd ..
npm start
```

Frontend at `http://localhost:3000`, backend at `http://localhost:5000`.

---

## 💡 Why this matters

Most conference websites are static. STIS-V 2025 needed a real platform — registration with validation, organizer dashboards, document generation, multilingual support for international delegates from across Asia, Europe, and the Americas. This repo is the working system that ran the conference.

105+ commits of iterative development driven by real organizer requirements — schedule changes, registration tier additions, sponsor onboarding, last-minute announcements during the event.

---

## 🌐 The Conference

**STIS-V 2025** is a major international forum bringing together researchers and industry leaders in ironmaking and steelmaking. Hosted by the **Department of Materials Engineering at the Indian Institute of Science, Bengaluru**.

[Visit the live site →](https://materials.iisc.ac.in/stis2025/)

---

## 📝 Built By

**Vishwas Prabhakara** — Project Assistant, Centre for Sustainable Technologies, IISc Bengaluru.

Built end-to-end as part of his role supporting IISc events and research infrastructure.

[GitHub](https://github.com/VishwasPrabhakara) · [LinkedIn](https://www.linkedin.com/in/vishwas-prabhakara-2050821b6/)

---

## 📄 License

Built for the Indian Institute of Science — STIS-V 2025 organizing committee. All rights reserved.
