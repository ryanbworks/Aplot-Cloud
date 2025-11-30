'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-lg p-3 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Info Principal */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-base flex-shrink-0">
            {serviceIcons[type]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground group-hover:text-green-500 transition-colors truncate">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground">{serviceTypes[type]} • {plan}</p>
          </div>
        </div>

        {/* Status e Info */}
        <div className="flex items-center gap-3">
          {ip && (
            <code className="hidden md:block bg-muted/50 px-2 py-1 rounded text-foreground font-mono text-xs">
              {ip}{port && `:${port}`}
            </code>
          )}
          <span className="hidden sm:block text-xs text-muted-foreground whitespace-nowrap">
            {expiryDate}
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusStyle.dot} ${status === 'online' ? 'animate-pulse' : ''}`} />
            <span className={`hidden lg:block text-xs font-medium ${statusStyle.color}`}>
              {statusStyle.label}
            </span>
          </div>
          <Button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-7 px-3 text-xs"
            size="sm"
          >
            <ExternalLink className="w-3 h-3 lg:mr-1" />
            <span className="hidden lg:inline">Acessar</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

