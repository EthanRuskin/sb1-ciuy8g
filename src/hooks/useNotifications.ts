import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';

interface Notification {
  id: string;
  type: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { onNotification } = useSocket();

  useEffect(() => {
    const unsubscribe = onNotification((notification) => {
      setNotifications(prev => [
        {
          id: Date.now().toString(),
          read: false,
          createdAt: new Date().toISOString(),
          ...notification
        },
        ...prev
      ]);
    });

    return () => unsubscribe();
  }, [onNotification]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    clearAll
  };
}