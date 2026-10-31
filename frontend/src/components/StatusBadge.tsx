import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyle = () => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
      case 'PRESENT':
      case 'SIGNED':
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'PENDING':
      case 'SUBMITTED':
      case 'IN_PROGRESS':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'REJECTED':
      case 'ABSENT':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-zinc-50 text-zinc-600 border-zinc-200';
    }
  };

  const getLabel = () => {
    switch (status.toUpperCase()) {
      case 'APPROVED': return 'Tasdiqlangan';
      case 'PENDING': return 'Kutilmoqda';
      case 'SUBMITTED': return 'Yuborilgan';
      case 'REJECTED': return 'Qaytarilgan';
      case 'PRESENT': return 'Kelgan';
      case 'ABSENT': return 'Kelmadi';
      case 'IN_PROGRESS': return 'Jarayonda';
      case 'COMPLETED': return 'Tugatilgan';
      default: return status;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {getLabel()}
    </span>
  );
};
