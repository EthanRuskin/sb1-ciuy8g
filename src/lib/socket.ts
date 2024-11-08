import { io, Socket } from 'socket.io-client';
import { env } from '../config/env';

class SocketClient {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(env.apiUrl, {
      auth: { token },
      transports: ['websocket'],
      autoConnect: false
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Handle notifications
    this.socket.on('notification', (notification) => {
      this.emit('notification', notification);
    });

    // Handle call events
    this.socket.on('call:started', (data) => {
      this.emit('call:started', data);
    });

    this.socket.on('call:ended', (data) => {
      this.emit('call:ended', data);
    });

    this.socket.on('call:transcription', (data) => {
      this.emit('call:transcription', data);
    });

    this.socket.connect();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  // Call-specific methods
  joinCall(callId: string) {
    this.socket?.emit('call:start', { callId });
  }

  leaveCall(callId: string) {
    this.socket?.emit('call:end', { callId });
  }

  sendTranscription(callId: string, text: string) {
    this.socket?.emit('call:transcription', { callId, text });
  }
}

export const socketClient = new SocketClient();