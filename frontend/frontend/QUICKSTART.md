# 🚀 Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Navigate to the project folder

```bash
cd "c:\Users\Loay khaled\Desktop\Graduation Project\wifi-pentest-frontend"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
copy .env.example .env
```

Edit `.env` and configure your backend URL:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
wifi-pentest-frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── LoadingSpinner.js
│   │   ├── Modal.js
│   │   ├── ConfirmationModal.js
│   │   ├── StatCard.js
│   │   ├── AttackStatusBadge.js
│   │   ├── LiveLogViewer.js
│   │   └── ProtectedRoute.js
│   │
│   ├── pages/           # Page components
│   │   ├── Login.js           # User authentication
│   │   ├── Setup.js           # First-time setup
│   │   ├── Dashboard.js       # Main dashboard
│   │   ├── Scanner.js         # Network scanner
│   │   ├── Attacks.js         # Attack center
│   │   ├── AgenticAI.js       # AI dashboard
│   │   ├── Results.js         # Captured data
│   │   ├── Reports.js         # Security reports
│   │   ├── Logs.js            # System logs
│   │   ├── Consent.js         # Consent management
│   │   ├── Settings.js        # Settings
│   │   ├── Users.js           # User management
│   │   ├── Help.js            # Documentation
│   │   ├── About.js           # Project info
│   │   └── NotFound.js        # 404 page
│   │
│   ├── context/         # React Context for state
│   │   ├── AuthContext.js     # Authentication state
│   │   └── SocketContext.js   # Socket.io state
│   │
│   ├── services/        # API and Socket.io
│   │   ├── api.js             # Axios instance
│   │   ├── apiService.js      # API endpoints
│   │   └── socket.js          # Socket.io service
│   │
│   ├── utils/           # Helper functions
│   │   ├── helpers.js         # Utility functions
│   │   └── constants.js       # App constants
│   │
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
│
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── .gitignore          # Git ignore rules
├── .env.example        # Environment template
└── README.md           # Project documentation
```

## 🎨 Features Implemented

✅ **Authentication System**

- Login page with JWT token handling
- First-time setup wizard
- Protected routes
- Automatic token validation

✅ **Dashboard**

- Real-time statistics cards
- Device health monitoring
- Active attacks panel
- Live activity feed

✅ **Network Scanner**

- Wi-Fi network discovery
- Real-time network table
- Signal strength indicators
- Vulnerability scores
- Search and filter

✅ **Navigation**

- Responsive sidebar menu
- Top navbar with user info
- Connection status indicator
- Role-based menu items

✅ **Real-time Communication**

- Socket.io integration
- Live log streaming
- Network discovery events
- Attack progress updates
- Device metrics

✅ **State Management**

- Auth Context (user, token)
- Socket Context (networks, attacks, logs)
- Centralized state handling

✅ **UI Components**

- Loading spinners
- Modal dialogs
- Confirmation modals
- Status badges
- Stat cards
- Live log viewer

## 🔌 Backend Integration Points

The frontend is ready to connect to your backend. Here are the API endpoints it expects:

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/setup` - First-time setup
- `GET /api/auth/verify` - Token verification

### Networks

- `GET /api/networks` - Get scanned networks
- `POST /api/networks/scan/start` - Start scanning
- `POST /api/networks/scan/stop` - Stop scanning

### Attacks

- `POST /api/attacks/start` - Start attack
- `POST /api/attacks/:id/stop` - Stop attack
- `GET /api/attacks/active` - Get active attacks

### Dashboard

- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/activity` - Get recent activity
- `GET /api/dashboard/health` - Get device health

### Socket.io Events

The frontend listens to these events:

- `network_discovered` - New network found
- `attack_started` - Attack started
- `attack_progress` - Attack progress update
- `attack_completed` - Attack finished
- `handshake_captured` - Handshake captured
- `agentic_decision` - AI decision made
- `device_metrics` - Device stats update
- `log_entry` - New log entry

## 📝 Next Steps

### What's Ready

✅ Complete project structure
✅ All pages created (some as placeholders)
✅ Routing configured
✅ Authentication flow
✅ Socket.io integration
✅ API service layer
✅ State management
✅ Styling with Tailwind CSS
✅ Git repository initialized

### What Needs Implementation

🔨 Complete the remaining pages:

- Attacks page (attack execution UI)
- AgenticAI page (AI decision monitoring)
- Results page (captured data viewer)
- Reports page (report generation)
- Consent page (consent management)
- Settings page (configuration)
- Users page (user management)
- Help page (documentation)

🔨 Backend Development:

- Node.js/Express server
- MongoDB setup
- Socket.io server
- Python attack scripts integration
- AI model integration

## 🚀 Pushing to GitHub

### 1. Create a new repository on GitHub

Go to https://github.com/Loay-Khaled?tab=repositories and create a new repository named `wifi-pentest-device`

### 2. Link local repo to GitHub

```bash
cd "c:\Users\Loay khaled\Desktop\Graduation Project\wifi-pentest-frontend"
git remote add origin https://github.com/Loay-Khaled/wifi-pentest-device.git
git branch -M main
git push -u origin main
```

### 3. Future commits

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push
```

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Install new package
npm install package-name

# Update dependencies
npm update
```

## 💡 Tips

1. **Mock Data**: While waiting for backend, you can add mock data in the pages for testing UI
2. **Environment Variables**: Keep sensitive data in `.env` and never commit it
3. **Component Reusability**: Use the components in `/components` folder across pages
4. **State Management**: Use Context API for global state (Auth, Socket)
5. **API Calls**: All API functions are in `/services/apiService.js`
6. **Styling**: Use Tailwind classes for consistent styling

## 📞 Support

If you encounter any issues:

1. Check console for errors
2. Verify backend is running
3. Check `.env` configuration
4. Ensure all dependencies are installed

---

**Good luck with your graduation project! 🎓**
