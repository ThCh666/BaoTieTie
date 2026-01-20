import React, { useState } from 'react';
import { ShieldCheck, Users, FileText, CheckCircle, XCircle, Clock, Eye, Briefcase, DollarSign } from 'lucide-react';

// Mock Data for Admin
const MOCK_VERIFICATIONS = [
  { id: 1, name: 'Wang Li', role: 'PhD Student', institution: 'MIT', docType: '学生证', date: '2024-03-10', status: 'pending' },
  { id: 2, name: 'Zhang Wei', role: 'Postdoc', institution: 'Tsinghua University', docType: '注册确认函', date: '2024-03-11', status: 'pending' },
];

const MOCK_SERVICE_APPROVALS = [
  { id: 101, provider: 'Wang Li', conference: 'CVPR 2024', basePrice: 50, location: 'Seattle', proof: 'Registration.pdf', status: 'pending' },
  { id: 102, provider: 'Chen Hao', conference: 'ICRA 2024', basePrice: 60, location: 'Yokohama', proof: 'Ticket.png', status: 'pending' },
];

const MOCK_ORDERS = [
  { id: 'ORD-2024-001', scholar: 'Liu Yang', conference: 'CVPR 2024', amount: 90, status: 'unassigned', req: 'Print + Hang' },
  { id: 'ORD-2024-002', scholar: 'Mike Smith', conference: 'NeurIPS 2024', amount: 60, status: 'assigned', provider: 'Zhang Wei', req: 'Hang Only' },
  { id: 'ORD-2024-003', scholar: 'Anna Lee', conference: 'CVPR 2024', amount: 150, status: 'unassigned', req: 'Design + Print + Hang' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'services' | 'orders'>('verifications');
  const [verifications, setVerifications] = useState(MOCK_VERIFICATIONS);
  const [services, setServices] = useState(MOCK_SERVICE_APPROVALS);
  const [orders, setOrders] = useState(MOCK_ORDERS);

  // Handlers
  const handleVerify = (id: number, _approved: boolean) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    // In a real app, send API call
  };

  const handleServiceReview = (id: number, _approved: boolean) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleAssignOrder = (id: string) => {
    // Simulate auto-match
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'assigned', provider: 'Auto-Matched Provider' } : o));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">后台管理系统</h1>
        <p className="text-slate-500">管理用户认证、审核服务上架及订单调度。</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-slate-500 text-sm font-medium">待审核资质</p>
                <p className="text-2xl font-bold text-slate-900">{verifications.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Users size={20} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-slate-500 text-sm font-medium">待上架服务</p>
                <p className="text-2xl font-bold text-slate-900">{services.length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase size={20} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-slate-500 text-sm font-medium">待分配订单</p>
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === 'unassigned').length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                <DollarSign size={20} />
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <button 
                    onClick={() => setActiveTab('verifications')}
                    className={`w-full flex items-center justify-between p-4 text-sm font-medium transition-colors ${activeTab === 'verifications' ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                >
                    <span className="flex items-center gap-3"><ShieldCheck size={18} /> 资质审核</span>
                    {verifications.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{verifications.length}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('services')}
                    className={`w-full flex items-center justify-between p-4 text-sm font-medium transition-colors ${activeTab === 'services' ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                >
                    <span className="flex items-center gap-3"><Briefcase size={18} /> 服务审批</span>
                    {services.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{services.length}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center justify-between p-4 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                >
                    <span className="flex items-center gap-3"><FileText size={18} /> 订单调度</span>
                    {orders.filter(o => o.status === 'unassigned').length > 0 && <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{orders.filter(o => o.status === 'unassigned').length}</span>}
                </button>
            </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
            {activeTab === 'verifications' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h2 className="font-bold text-slate-800">服务方资质审核列表</h2>
                    </div>
                    {verifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">暂无待审核资质</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {verifications.map(item => (
                                <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900">{item.name}</h3>
                                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{item.institution}</span>
                                        </div>
                                        <div className="text-sm text-slate-600 mb-2">{item.role}</div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {item.date}</span>
                                            <span>•</span>
                                            <span>提交文件: {item.docType}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-1 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                                            <Eye size={16} /> 查看文件
                                        </button>
                                        <div className="h-6 w-px bg-slate-200 mx-1"></div>
                                        <button onClick={() => handleVerify(item.id, false)} className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                                            <XCircle size={16} /> 驳回
                                        </button>
                                        <button onClick={() => handleVerify(item.id, true)} className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm">
                                            <CheckCircle size={16} /> 通过
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'services' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h2 className="font-bold text-slate-800">新服务上架审批</h2>
                    </div>
                    {services.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">暂无待审批服务</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {services.map(item => (
                                <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1">{item.conference}</h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                            <span>服务方: {item.provider}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-green-600 font-medium">报价: ${item.basePrice}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded border border-slate-200">
                                            参会凭证: {item.proof}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleServiceReview(item.id, false)} className="px-3 py-1.5 text-sm border border-slate-300 text-slate-600 rounded hover:bg-slate-50">
                                            拒绝
                                        </button>
                                        <button onClick={() => handleServiceReview(item.id, true)} className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                            批准上架
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h2 className="font-bold text-slate-800">全平台订单管理</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">订单号</th>
                                    <th className="px-6 py-3">会议</th>
                                    <th className="px-6 py-3">学者需求</th>
                                    <th className="px-6 py-3">状态</th>
                                    <th className="px-6 py-3">分配服务方</th>
                                    <th className="px-6 py-3 text-right">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-mono text-slate-600">{order.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{order.conference}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900">{order.scholar}</div>
                                            <div className="text-xs text-slate-500">{order.req}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.status === 'assigned' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    已分配
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                    待分配
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {order.provider || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {order.status === 'unassigned' && (
                                                <button 
                                                    onClick={() => handleAssignOrder(order.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                >
                                                    智能分配
                                                </button>
                                            )}
                                            {order.status === 'assigned' && (
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    详情
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;