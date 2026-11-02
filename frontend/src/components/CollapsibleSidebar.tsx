'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  LogOut, 
  Menu, 
  X,
  LucideIcon,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Building2,
  BookOpen,
  UserCheck,
  Circle
} from 'lucide-react';

export interface SubNavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  subItems?: SubNavItem[];
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

  // Track accordion expanded states
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.subItems) {
        const isChildActive = item.subItems.some(sub => sub.id === activeTab);
        if (item.id === activeTab || isChildActive) {
          initial[item.id] = true;
        }
      }
    });
    return initial;
  });

  const toggleAccordion = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

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

  const renderNavList = (collapsedView: boolean) => (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isChildActive = hasSubItems && item.subItems!.some(sub => sub.id === activeTab);
        const isParentActive = activeTab === item.id;
        const isActive = isParentActive || isChildActive;
        const isExpanded = !!expandedItems[item.id];

        return (
          <div key={item.id} className="relative group">
            {/* Main Nav Item Button */}
            <button
              onClick={() => {
                if (hasSubItems && !collapsedView) {
                  toggleAccordion(item.id);
                  // If clicking parent and none of children active, activate first child
                  if (!isChildActive) {
                    onTabChange(item.subItems![0].id);
                  }
                } else if (!hasSubItems) {
                  onTabChange(item.id);
                  setMobileOpen(false);
                }
              }}
              title={collapsedView && !hasSubItems ? item.label : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-medium transition-all duration-200 relative ${
                collapsedView ? 'justify-center p-3' : 'justify-between px-3.5 py-2.5'
              } ${
                isActive && (!hasSubItems || collapsedView)
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : isActive && hasSubItems
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive && (!hasSubItems || collapsedView)
                    ? 'text-white' 
                    : isActive && hasSubItems
                      ? 'text-zinc-900'
                      : 'text-zinc-500 group-hover:text-zinc-900'
                }`} />
                {!collapsedView && (
                  <span className="truncate text-left">{item.label}</span>
                )}
              </div>

              {/* Right Side: Badge & Accordion Arrow */}
              {!collapsedView && (
                <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive && !hasSubItems ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {hasSubItems && (
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-zinc-900' : ''
                    }`} />
                  )}
                </div>
              )}

              {/* Collapsed dot badge */}
              {collapsedView && item.badge !== undefined && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>

            {/* EXPANDED ACCORDION SUBMENUS */}
            {!collapsedView && hasSubItems && isExpanded && (
              <div className="mt-1 pl-4 space-y-1 transition-all duration-200 ease-in-out border-l-2 border-zinc-100 ml-5">
                {item.subItems!.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = activeTab === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onTabChange(sub.id);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between pl-3 pr-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                        isSubActive
                          ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        {SubIcon ? (
                          <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-white' : 'text-zinc-400'}`} />
                        ) : (
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSubActive ? 'bg-white' : 'bg-zinc-300'}`} />
                        )}
                        <span className="truncate text-left">{sub.label}</span>
                      </div>
                      {sub.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ml-1.5 ${
                          isSubActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'
                        }`}>
                          {sub.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* COLLAPSED HOVER POPOVER MENU */}
            {collapsedView && (
              <div className="absolute left-full ml-2 top-0 bg-white border border-zinc-200/90 rounded-2xl p-2 shadow-xl z-50 min-w-[210px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out origin-left">
                <div className="px-3 py-1.5 border-b border-zinc-100 mb-1 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-3.5 h-3.5 text-zinc-700" />
                    <span className="text-xs font-bold text-zinc-900">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                      {item.badge}
                    </span>
                  )}
                </div>

                {hasSubItems ? (
                  <div className="space-y-1">
                    {item.subItems!.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          onClick={() => onTabChange(sub.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isSubActive
                              ? 'bg-zinc-900 text-white'
                              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2 min-w-0">
                            {SubIcon ? (
                              <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-white' : 'text-zinc-400'}`} />
                            ) : (
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSubActive ? 'bg-white' : 'bg-zinc-300'}`} />
                            )}
                            <span className="truncate text-left">{sub.label}</span>
                          </div>
                          {sub.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              isSubActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'
                            }`}>
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <button
                    onClick={() => onTabChange(item.id)}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl"
                  >
                    Sahifaga o'tish
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-3 select-none">
      {/* Top Section: Brand & University */}
      <div className="space-y-4">
        {/* Header / Brand */}
        <div className="flex flex-col items-center justify-center pb-3 border-b border-zinc-100 relative text-center">
          {/* Desktop Toggle Button in absolute corner */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors absolute right-0 top-0"
            title={isCollapsed ? "Menyuni kengaytirish" : "Menyuni yig'ish"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 transition-transform duration-200" />
            ) : (
              <ChevronLeft className="w-4 h-4 transition-transform duration-200" />
            )}
          </button>

          <div className="flex flex-col items-center w-full">
            <div className={`${isCollapsed ? 'h-10 w-10' : 'h-14 sm:h-16 w-auto'} flex items-center justify-center shrink-0 mb-2 transition-all`}>
              <img src="/tiu-official-logo.png" alt="Tashkent International University" className="h-full w-full object-contain" />
            </div>
            {!isCollapsed && (
              <div className="transition-all duration-300 w-full px-1">
                <h2 className="text-xs font-bold text-zinc-900 tracking-tight leading-snug">Tashkent International University</h2>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Amaliyot Boshqaruv Portali</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        {renderNavList(isCollapsed)}
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
          <img src="/tiu-official-logo.png" alt="TIU" className="h-7 w-auto object-contain" />
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
        <div className="h-full flex flex-col justify-between p-3 select-none">
          {/* Top Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                <img src="/tiu-logo.svg" alt="TIU" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold text-zinc-900 truncate tracking-tight">TIU PLATFORM</h2>
                <p className="text-[10px] text-zinc-400 truncate">{roleTitle}</p>
              </div>
            </div>
            {renderNavList(false)}
          </div>

          {/* Bottom Profile */}
          <div className="pt-4 border-t border-zinc-100 space-y-2">
            <div className="flex items-center space-x-3 bg-zinc-50 border border-zinc-200/60 rounded-xl p-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-zinc-200 shrink-0">
                {getRoleIcon()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-900 truncate leading-tight">{userName}</p>
                {userSub && <p className="text-[10px] text-zinc-400 truncate">{userSub}</p>}
                {userBadge && (
                  <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${getRoleColorBg()}`}>
                    {userBadge}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center rounded-xl text-xs font-medium text-zinc-500 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100 px-3.5 py-2.5 space-x-3"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Tizimdan chiqish</span>
            </button>
          </div>
        </div>
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
