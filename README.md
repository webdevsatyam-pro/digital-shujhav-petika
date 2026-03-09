# Digital Sujhav & Shikayat Petika

Anonymous digital suggestion & complaint box with QR code support.

## 📁 Project Structure

```
src/
├── App.jsx                    ← Main entry point
├── components/
│   ├── QRCode.jsx             ← QR code display
│   ├── ToggleGroup.jsx        ← Custom button selector
│   ├── Header.jsx             ← Navigation bar
│   ├── HomeView.jsx           ← Home page with QR
│   ├── SubmitForm.jsx         ← Anonymous submission form
│   ├── EntryCard.jsx          ← Single entry card (admin)
│   └── AdminView.jsx          ← Admin panel
└── utils/
    └── storage.js             ← Persistent storage helpers
```

## Features

**QR Code** — Scan karo, seedha form khulta hai
**Anonymous** — Koi naam, phone ya email nahi manga jaata
**3 Types** — Sujhav, Shikayat, Feedback
**7 Categories** — General, Seva, Suvidha, Staff, Safai, Suraksha, Anya
**Priority** — Low / Medium / High
**Admin Panel** — Password protected, status update, delete

## Admin Password

Default: `admin123`
(App.jsx ya AdminView.jsx mein badal sakte hain)

## Usage (React)

```jsx
import App from "./src/App";
// Ya individual components:
import HomeView from "./src/components/HomeView";
import SubmitForm from "./src/components/SubmitForm";
import AdminView from "./src/components/AdminView";
```
