import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 transition-all duration-200 hover:border-zinc-300 shadow-subtle">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</span>
        <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-700">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-semibold text-zinc-900 tracking-tight">{value}</span>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-zinc-400 mt-1">{subtitle}</p>}
    </div>
  );
};
