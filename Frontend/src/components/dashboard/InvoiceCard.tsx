'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceCardProps {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  index?: number;
}

const statusConfig = {
  paid: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    label: 'Pago',
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    label: 'Pendente',
  },
  overdue: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    label: 'Vencida',
  },
};

export const InvoiceCard: React.FC<InvoiceCardProps> = ({
  id,
  date,
  amount,
  status,
  description,
  index = 0,
}) => {
  const statusStyle = statusConfig[status];
  const StatusIcon = statusStyle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-200"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{description}</h4>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-bold text-green-500">
            R$ {amount.toFixed(2)}
          </p>
          <div className={`inline-flex items-center gap-1 ${statusStyle.bg} ${statusStyle.border} border rounded-full px-2 py-0.5`}>
            <StatusIcon className={`w-3 h-3 ${statusStyle.color}`} />
            <span className={`text-xs font-semibold ${statusStyle.color}`}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        {status === 'paid' && (
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-green-500/10 hover:text-green-500"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

