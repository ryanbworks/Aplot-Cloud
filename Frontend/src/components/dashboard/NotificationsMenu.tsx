'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Trash2, Settings, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  time: string;
  read: boolean;
}

// Mock data - em produção virá da API
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Fatura Pendente',
    message: 'Fatura de R$ 62,00 vence em 3 dias',
    type: 'warning',
    time: 'Há 2 horas',
    read: false,
  },
  {
    id: '2',
    title: 'Backup Concluído',
    message: 'Backup automático concluído com sucesso',
    type: 'success',
    time: 'Há 5 horas',
    read: false,
  },
  {
    id: '3',
    title: 'Servidor Atualizado',
    message: 'Servidor Minecraft foi atualizado para versão 1.20',
    type: 'info',
    time: 'Há 1 dia',
    read: true,
  },
  {
    id: '4',
    title: 'Ticket Respondido',
    message: 'Sua solicitação de suporte foi respondida',
    type: 'success',
    time: 'Há 2 dias',
    read: true,
  },
];

export const NotificationsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      info: '🔔',
      warning: '⚠️',
      success: '✅',
      error: '❌',
    };
    return iconMap[type as keyof typeof iconMap] || '🔔';
  };

  const getNotificationColor = (type: string) => {
    const colorMap = {
      info: 'border-blue-500/30 bg-blue-500/5',
      warning: 'border-yellow-500/30 bg-yellow-500/5',
      success: 'border-green-500/30 bg-green-500/5',
      error: 'border-red-500/30 bg-red-500/5',
    };
    return colorMap[type as keyof typeof colorMap] || 'border-border bg-card';
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="outline"
        size="sm"
        className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Notificações</h3>
                    <p className="text-xs text-muted-foreground">
                      {unreadCount > 0 ? `${unreadCount} não lida(s)` : 'Tudo lido'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllAsRead}
                        className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma notificação
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-muted/50 transition-colors ${
                          !notification.read ? 'bg-green-500/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm font-semibold text-foreground">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="h-6 px-2 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(notification.id)}
                                  className="h-6 px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
