'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Menu, 
  X,
  LucideIcon,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Building2,
  BookOpen,
  UserCheck
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface CollapsibleSidebarProps {
  role: 'STUDENT' | 'MENTOR' | 'OTM_STAFF' | 'TEACHER' | 'ADMIN';
  roleTitle: string;
  userName: string;
  userSub?: string;
  userBadge?: string;
  items: NavItem[];
  activeTab: string;
  onTabChange: (id: any) => void;
  onLogout: () => void;
}

export default function CollapsibleSidebar({
  role,
  roleTitle,
  userName,
  userSub,
  userBadge,
  items,
  activeTab,
  onTabChange,
  onLogout
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getRoleIcon = () => {
    switch (role) {
      case 'ADMIN':
        return <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />;
      case 'OTM_STAFF':
        return <Building2 className="w-5 h-5 text-blue-600 shrink-0" />;
      case 'MENTOR':
        return <Briefcase className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'TEACHER':
        return <BookOpen className="w-5 h-5 text-amber-600 shrink-0" />;
      case 'STUDENT':
      default:
        return <GraduationCap className="w-5 h-5 text-violet-600 shrink-0" />;
    }
  };

  const getRoleColorBg = () => {
    switch (role) {
      case 'ADMIN': return 'bg-indigo-50 border-indigo-200/80 text-indigo-700';
      case 'OTM_STAFF': return 'bg-blue-50 border-blue-200/80 text-blue-700';
      case 'MENTOR': return 'bg-emerald-50 border-emerald-200/80 text-emerald-700';
      case 'TEACHER': return 'bg-amber-50 border-amber-200/80 text-amber-700';
      case 'STUDENT':
      default: return 'bg-violet-50 border-violet-200/80 text-violet-700';
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-3 select-none">
      {/* Top Section: Brand & University */}
      <div className="space-y-4">
        {/* Header / Brand */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-1.5 shrink-0 shadow-xs">
              <img src="/tiu-logo.svg" alt="TIU" className="w-full h-full object-contain" />
            </div>
            {!isCollapsed && (
              <div className="transition-all duration-300 min-w-0">
                <h2 className="text-xs font-bold text-zinc-900 truncate tracking-tight">TIU PLATFORM</h2>
                <p className="text-[10px] text-zinc-400 truncate">{roleTitle}</p>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            title={isCollapsed ? "Menyuni kengaytirish" : "Menyuni yig'ish"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 transition-transform duration-200" />
            ) : (
              <ChevronLeft className="w-4 h-4 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-xs font-medium transition-all duration-200 relative group ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-3.5 py-2.5'
                } ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-900'}`} />
                  {!isCollapsed && (
                    <span className="truncate text-left">{item.label}</span>
                  )}
                </div>

                {/* Badge if present */}
                {item.badge !== undefined && (
                  <>
                    {!isCollapsed ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {item.badge}
                      </span>
                    ) : (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </>
                )}

                {/* Floating Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2.5 py-1 bg-zinc-900 text-white text-[11px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: User Profile & Logout */}
      <div className="pt-4 border-t border-zinc-100 space-y-2">
        <div className={`flex items-center rounded-xl p-2 transition-all ${
          isCollapsed ? 'justify-center' : 'space-x-3 bg-zinc-50 border border-zinc-200/60'
        }`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-zinc-200 shrink-0">
            {getRoleIcon()}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-zinc-900 truncate leading-tight">{userName}</p>
              {userSub && <p className="text-[10px] text-zinc-400 truncate">{userSub}</p>}
              {userBadge && (
                <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${getRoleColorBg()}`}>
                  {userBadge}
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          title={isCollapsed ? "Tizimdan chiqish" : undefined}
          className={`w-full flex items-center rounded-xl text-xs font-medium text-zinc-500 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100 ${
            isCollapsed ? 'justify-center p-3' : 'px-3.5 py-2.5 space-x-3'
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Tizimdan chiqish</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Toggle Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-zinc-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img src="/tiu-logo.svg" alt="TIU" className="w-7 h-7 object-contain" />
          <span className="text-xs font-bold text-zinc-900">{roleTitle}</span>
        </div>
        <div className="flex items-center space-x-2">
          {userBadge && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getRoleColorBg()}`}>
              {userBadge}
            </span>
          )}
          <button
            onClick={onLogout}
            className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden transition-opacity"
        />
      )}

      {/* Mobile Slide-over Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </div>

      {/* Desktop Sticky Animated Left Sidebar */}
      <aside
        className={`hidden md:block sticky top-0 h-screen bg-white border-r border-zinc-200/80 shrink-0 z-30 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
