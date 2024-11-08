import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { redis } from './redis';
import { logger } from '../utils/logger';
import config from '../config';

export function initializeWebSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: config.corsOrigin,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      // Validate token using auth service
      const session = await authService.validateSession(token);
      if (!session) {
        return next(new Error('Invalid token'));
      }

      socket.data.userId = session.userId;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  // Handle connections
  io.on('connection', (socket) => {
    const userId = socket.data.userId;
    logger.info(`User connected: ${userId}`);

    // Join user's room
    socket.join(`user:${userId}`);

    // Subscribe to Redis notifications
    const subscriber = redis.duplicate();
    subscriber.subscribe('notifications', (message) => {
      const notification = JSON.parse(message);
      if (notification.userId === userId) {
        socket.emit('notification', notification);
      }
    });

    // Handle call events
    socket.on('call:start', async (data) => {
      socket.join(`call:${data.callId}`);
      io.to(`call:${data.callId}`).emit('call:started', data);
    });

    socket.on('call:end', async (data) => {
      io.to(`call:${data.callId}`).emit('call:ended', data);
      socket.leave(`call:${data.callId}`);
    });

    socket.on('call:transcription', async (data) => {
      io.to(`call:${data.callId}`).emit('call:transcription', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      subscriber.unsubscribe('notifications');
      logger.info(`User disconnected: ${userId}`);
    });
  });

  return io;
}