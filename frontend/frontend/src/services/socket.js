import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = localStorage.getItem("token");

    this.socket = io(SOCKET_URL, {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection events
    this.socket.on("connect", () => {
      console.log("✅ Socket.io connected:", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ Socket.io disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Subscribe to events
  on(eventName, callback) {
    if (!this.socket) {
      this.connect();
    }

    this.socket.on(eventName, callback);

    // Store listener for cleanup
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  // Unsubscribe from events
  off(eventName, callback) {
    if (this.socket) {
      this.socket.off(eventName, callback);
    }

    // Remove from stored listeners
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Emit events
  emit(eventName, data) {
    if (!this.socket?.connected) {
      console.warn("Socket not connected, attempting to connect...");
      this.connect();
    }

    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  // Clean up all listeners
  removeAllListeners() {
    if (this.socket) {
      this.listeners.forEach((callbacks, eventName) => {
        callbacks.forEach((callback) => {
          this.socket.off(eventName, callback);
        });
      });
      this.listeners.clear();
    }
  }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
