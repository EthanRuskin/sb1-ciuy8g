import React from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { format } from 'date-fns';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_call':
        return <Bell className="h-5 w-5 text-indigo-600" />;
      case 'missed_call':
        return <X className="h-5 w-5 text-red-600" />;
      case 'performance_alert':
        return <Check className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 ${
                    !notification.read ? 'bg-indigo-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}