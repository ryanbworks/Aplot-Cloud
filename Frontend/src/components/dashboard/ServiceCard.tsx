'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Power, MoreVertical, Calendar, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  id: string;
  name: string;
  type: 'minecraft' | 'discord-bot' | 'vps' | 'website';
  status: 'online' | 'offline' | 'suspended';
  plan: string;
  expiryDate: string;
  ip?: string;
  port?: string;
  index?: number;
}

const serviceIcons = {
  'minecraft': '🎮',
  'discord-bot': '🤖',
  'vps': '🖥️',
  'website': '🌐',
};

const serviceTypes = {
  'minecraft': 'Minecraft',
  'discord-bot': 'Bot Discord',
  'vps': 'VPS',
  'website': 'Hospedagem Web',
};

const statusConfig = {
  online: {
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    label: 'Online',
    dot: 'bg-green-500',
  },
  offline: {
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    label: 'Offline',
    dot: 'bg-red-500',
  },
  suspended: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    label: 'Suspenso',
    dot: 'bg-yellow-500',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  type,
  status,
  plan,
  expiryDate,
  ip,
  port,
  index = 0,
}) => {
  const statusStyle = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-2xl">
              {serviceIcons[type]}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
              <p className="text-sm text-muted-foreground">{serviceTypes[type]}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-green-500 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-2 ${statusStyle.bg} ${statusStyle.border} border rounded-full px-3 py-1`}>
            <div className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`} />
            <span className={`text-xs font-semibold ${statusStyle.color}`}>
              {statusStyle.label}
            </span>
          </div>
          <div className="inline-flex items-center gap-1 bg-muted/50 rounded-full px-3 py-1">
            <Server className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">{plan}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-3">
        {ip && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">IP:</span>
            <code className="bg-muted/50 px-2 py-1 rounded text-foreground font-mono">
              {ip}{port && `:${port}`}
            </code>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Vencimento:</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{expiryDate}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 flex gap-3">
        <Button
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          size="sm"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Acessar Painel
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
        >
          <Power className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

