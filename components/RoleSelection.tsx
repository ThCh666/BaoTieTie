import React from 'react';
import { GraduationCap, Briefcase, Shield } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          {/* Logo Large Version */}
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative hover:scale-105 transition-transform duration-500">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center text-white text-4xl font-bold transform -rotate-6 border-4 border-white ring-1 ring-slate-100">
                    报
                </div>
                <div className="absolute -bottom-2 -right-6 bg-teal-400 text-white text-sm font-bold px-4 py-1.5 rounded-full border-4 border-white transform rotate-3 shadow-lg">
                    贴贴
                </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Scholar<span className="text-indigo-600">Post</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium tracking-wide">
             你的学术海报，我们帮你 <span className="text-indigo-600 border-b-2 border-indigo-200 pb-0.5 font-bold">贴贴</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-16">
          {/* Scholar Card */}
          <button 
            onClick={() => onSelect(UserRole.SCHOLAR)}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-2xl hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm border border-indigo-50 group-hover:scale-110 transition-transform">
              <GraduationCap size={32} />
            </div>
            <h2 className="relative z-10 text-2xl font-bold text-slate-900 mb-2">我是学者</h2>
            <p className="relative z-10 text-slate-600 mb-8 flex-1 leading-relaxed">
              无法亲自参会？让我们的可靠代贴人帮您完成海报打印与张贴，学术展示不缺席。
            </p>
            <span className="relative z-10 inline-flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
              寻找代贴服务 <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all">&rarr;</span>
            </span>
          </button>

          {/* Provider Card */}
          <button 
            onClick={() => onSelect(UserRole.PROVIDER)}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-2xl hover:border-teal-500/30 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>

            <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm border border-teal-50 group-hover:scale-110 transition-transform">
              <Briefcase size={32} />
            </div>
            <h2 className="relative z-10 text-2xl font-bold text-slate-900 mb-2">我是服务方</h2>
            <p className="relative z-10 text-slate-600 mb-8 flex-1 leading-relaxed">
              即将参加会议？顺手帮人代贴海报，赚取丰厚服务费，结识更多同行。
            </p>
            <span className="relative z-10 inline-flex items-center text-teal-600 font-bold group-hover:gap-2 transition-all">
              成为代贴人 <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all">&rarr;</span>
            </span>
          </button>
        </div>

        <div className="text-center">
           <button 
             onClick={() => onSelect(UserRole.ADMIN)}
             className="text-slate-400 hover:text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5 mx-auto transition-colors py-2 px-4 rounded-full hover:bg-slate-100"
           >
             <Shield size={12} /> 平台管理员入口
           </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;