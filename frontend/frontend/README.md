# Wi-Fi Penetration Testing Device - Frontend

**Raspberry Pi-Based Wi-Fi Penetration Testing Device with Agentic AI Integration**

**Arab Academy for Science, Technology and Maritime Transport (AAST)**  
**Department of Computer Engineering**  
**Supervisor:** Dr. Mohamed Elhammahmy

---

## 🚀 Project Overview

This is the React.js frontend for an ethical Wi-Fi penetration testing device built on Raspberry Pi. The system features:

- 🔍 Network scanning and vulnerability assessment
- ⚔️ Automated attack execution (Deauth, Evil Twin, MITM, etc.)
- 🤖 Dual AI integration (Local vulnerability assessment + Cloud agentic decision-making)
- 📊 Real-time monitoring and reporting
- 🔐 Ethical safeguards and consent management

---

## 📁 Project Structure

```
wifi-pentest-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── context/            # React Context for state management
│   ├── services/           # API and Socket.io services
│   ├── utils/              # Utility functions
│   ├── App.js              # Main App component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Tech Stack

- **React 18** - UI Library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP requests
- **React Toastify** - Notifications
- **Recharts** - Data visualization
- **React Icons** - Icon library

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/Loay-Khaled/wifi-pentest-device.git
cd wifi-pentest-device/wifi-pentest-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file:**

```bash
cp .env.example .env
```

4. **Configure environment variables:**
   Edit `.env` file with your backend URL:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

5. **Start development server:**

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 📄 Available Pages

| Route         | Page               | Description                       |
| ------------- | ------------------ | --------------------------------- |
| `/login`      | Login              | User authentication               |
| `/setup`      | Initial Setup      | First-time admin account creation |
| `/`           | Dashboard          | Main overview with statistics     |
| `/scanner`    | Network Scanner    | Wi-Fi network discovery           |
| `/attacks`    | Attack Center      | Execute penetration tests         |
| `/agentic-ai` | AI Dashboard       | Monitor autonomous exploitation   |
| `/results`    | Results            | View captured data                |
| `/reports`    | Reports            | Generate security reports         |
| `/logs`       | System Logs        | Audit trail                       |
| `/consent`    | Consent Management | Ethical authorization             |
| `/settings`   | Settings           | System configuration              |
| `/users`      | User Management    | Manage users (Admin)              |
| `/help`       | Help & Docs        | User manual                       |
| `/about`      | About              | Project information               |

---

## 🔌 API Integration

The frontend communicates with the backend via:

1. **REST API** (Axios) - For standard CRUD operations
2. **Socket.io** - For real-time updates

### API Service Usage Example:

```javascript
import api from "./services/api";

// Fetch networks
const networks = await api.get("/networks");

// Start attack
await api.post("/attack/start", { type: "deauth", target: "BSSID" });
```

### Socket.io Events:

```javascript
import { socket } from "./services/socket";

socket.on("network_discovered", (data) => {
  console.log("New network:", data);
});
```

---

## 🎨 Component Structure

### Reusable Components:

- `Navbar` - Top navigation bar
- `Sidebar` - Side navigation menu
- `NetworkCard` - Display network information
- `AttackStatusBadge` - Visual status indicators
- `LiveLogViewer` - Real-time log display
- `ConfirmationModal` - Ethical consent dialogs
- `LoadingSpinner` - Loading states
- `NotificationToast` - Alerts

---

## 🔐 Authentication Flow

1. User visits `/login`
2. Submits credentials
3. Backend returns JWT token
4. Token stored in localStorage
5. Token included in all API requests
6. Protected routes check for valid token

---

## ⚠️ Ethical Notice

**This tool is designed exclusively for controlled laboratory environments and authorized security testing.**

- ✅ Use only on networks you own or have explicit permission to test
- ✅ Record consent before any testing
- ✅ Follow all applicable laws and regulations
- ❌ Unauthorized access to networks is illegal
- ❌ Misuse may result in criminal prosecution

---

## 👥 Team

- Hardware & OS Specialist
- Attacks & Python Developer
- GUI Developer
- AI/ML Engineer
- Web Developer (Frontend - React.js)
- Web Developer (Backend) & System Integrator

---

## 📞 Contact

**GitHub:** [Loay-Khaled](https://github.com/Loay-Khaled)

---

## 📝 License

This project is for educational purposes as part of a graduation project at AAST.

---

## 🙏 Acknowledgments

- **Supervisor:** Dr. Mohamed Elhammahmy
- **Institution:** Arab Academy for Science, Technology and Maritime Transport (AAST)
- **Department:** Computer Engineering
- **Date:** December 2025
