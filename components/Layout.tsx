import React from 'react';
import { UserRole } from '../types';
import { LogOut, User, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  role: UserRole;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ role, onLogout, children }) => {
  const getRoleDisplayName = (r: UserRole) => {
    switch (r) {
      case UserRole.SCHOLAR: return '学者用户';
      case UserRole.PROVIDER: return '服务方用户';
      case UserRole.ADMIN: return '平台管理员';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 h-20 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 select-none group cursor-pointer">
            <div className="relative">
              {/* '报' Icon Box */}
              <div className="w-11 h-11 bg-indigo-600 rounded-xl shadow-indigo-200 shadow-lg flex items-center justify-center text-white text-xl font-bold transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 border-[3px] border-white ring-1 ring-slate-100">
                报
              </div>
              {/* '贴贴' Badge */}
              <div className="absolute -bottom-1 -right-3 bg-teal-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white transform rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-sm flex items-center gap-0.5">
                <span>贴</span>
                <span>贴</span>
              </div>
            </div>
            
            <div className="flex flex-col ml-2 justify-center">
              <span className="font-extrabold text-xl tracking-tight leading-none text-slate-900">
                Scholar<span className="text-indigo-600">Post</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase leading-tight mt-1 pl-0.5">
                BAO TIE TIE
              </span>
            </div>

            {role === UserRole.ADMIN && (
              <span className="ml-2 px-2 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded uppercase tracking-wider self-start mt-0.5 shadow-sm">Admin</span>
            )}
          </div>
          
          {role !== UserRole.GUEST && (
            <div className="flex items-center gap-5">
              <div className="hidden md:flex flex-col items-end border-r border-slate-200 pr-5 py-1">
                <span className="text-sm font-bold text-slate-800">
                  {getRoleDisplayName(role)}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                  {role}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm transition-transform hover:scale-105 ${role === UserRole.ADMIN ? 'bg-slate-800 text-white border-slate-700' : 'bg-gradient-to-br from-indigo-50 to-white text-indigo-600 border-indigo-100'}`}>
                    {role === UserRole.ADMIN ? <ShieldCheck size={18} /> : <User size={20} />}
                </div>
                <button 
                    onClick={onLogout}
                    className="group flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                    title="退出登录"
                >
                    <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 bg-slate-50/50">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="mb-3 font-medium">&copy; 2026 ScholarPost (报贴贴) Inc. 版权所有.</p>
          <div className="flex justify-center gap-8 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">服务条款</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">联系客服</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;