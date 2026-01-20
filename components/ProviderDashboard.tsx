import React, { useState } from 'react';
import { Upload, Plus, FileText, CreditCard, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { MOCK_CONFERENCES } from '../constants';

const ProviderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'create' | 'profile'>('listings');
  const [listings, setListings] = useState([
    { id: 1, conference: 'CVPR 2024', status: '进行中', price: 65, slots: 3, filled: 1 },
    { id: 2, conference: 'NeurIPS 2024', status: '待审核', price: 80, slots: 5, filled: 0 }
  ]);

  const [formData, setFormData] = useState({
    conferenceId: '',
    baseFee: '',
    canPrint: false,
    canDesign: false,
    maxSlots: 5,
    // New fields for manual conference entry
    isNewConference: false,
    newConfName: '',
    newConfAcronym: '',
    newConfLocation: '',
    newConfDates: ''
  });

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    
    let confName = '';
    
    if (formData.isNewConference) {
        // For new conferences, use the manually entered acronym or name
        confName = formData.newConfAcronym ? `${formData.newConfAcronym}` : formData.newConfName;
    } else {
        confName = MOCK_CONFERENCES.find(c => c.id === formData.conferenceId)?.acronym || '未知会议';
    }

    setListings([...listings, {
        id: Date.now(),
        conference: confName,
        status: '待审核', // All new listings start as pending
        price: Number(formData.baseFee),
        slots: formData.maxSlots,
        filled: 0
    }]);
    
    setActiveTab('listings');
    // Reset form
    setFormData({ 
        conferenceId: '', 
        baseFee: '', 
        canPrint: false, 
        canDesign: false, 
        maxSlots: 5,
        isNewConference: false,
        newConfName: '',
        newConfAcronym: '',
        newConfLocation: '',
        newConfDates: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">服务方控制台</h1>
          <p className="text-slate-500">管理您的代贴服务与收益。</p>
        </div>
        <button 
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
            <Plus size={18} /> 发布新服务
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
            <button 
                onClick={() => setActiveTab('listings')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'listings' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                <FileText size={18} /> 我的发布
            </button>
            <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'profile' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                <CreditCard size={18} /> 支付与认证
            </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
            {activeTab === 'listings' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">活跃服务</h2>
                    </div>
                    {listings.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {listings.map(listing => (
                                <div key={listing.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-slate-900">{listing.conference}</h3>
                                            <span className={`px-2 py-0.5 text-xs rounded-full border ${listing.status === '进行中' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {listing.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-500 flex gap-4">
                                            <span>费用: ${listing.price}</span>
                                            <span>名额: {listing.filled}/{listing.slots} 已预订</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-100 text-slate-600">编辑</button>
                                        <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded hover:bg-slate-800">查看订单</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-slate-500">
                            暂无发布服务。立即创建服务开始赚取收益！
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'create' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold mb-6">创建新服务</h2>
                    <form onSubmit={handleSubmitListing} className="space-y-6">
                        
                        {/* Conference Selection with Manual Entry Toggle */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-slate-700">
                                    {formData.isNewConference ? '会议详情' : '选择会议'}
                                </label>
                                <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, isNewConference: !formData.isNewConference, conferenceId: ''})}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium underline transition-colors"
                                >
                                    {formData.isNewConference ? '返回列表选择' : '找不到会议？点此手动添加'}
                                </button>
                            </div>

                            {formData.isNewConference ? (
                                <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">会议全称 <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" required={formData.isNewConference}
                                            placeholder="例如：International Conference on Robotics and Automation"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={formData.newConfName}
                                            onChange={e => setFormData({...formData, newConfName: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">会议简称/年份 <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" required={formData.isNewConference}
                                                placeholder="例如：ICRA 2025"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={formData.newConfAcronym}
                                                onChange={e => setFormData({...formData, newConfAcronym: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">举办地点 <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" required={formData.isNewConference}
                                                placeholder="城市, 国家"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={formData.newConfLocation}
                                                onChange={e => setFormData({...formData, newConfLocation: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">会议日期 <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" required={formData.isNewConference}
                                            placeholder="例如：2025年5月10-15日"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={formData.newConfDates}
                                            onChange={e => setFormData({...formData, newConfDates: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2.5 rounded border border-amber-100">
                                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                        <p>手动添加的会议需要经过平台管理员审核后，您的服务才会正式上架。请确保信息准确。</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <select 
                                        required={!formData.isNewConference}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                        value={formData.conferenceId}
                                        onChange={e => setFormData({...formData, conferenceId: e.target.value})}
                                    >
                                        <option value="">-- 请选择您要提供服务的会议 --</option>
                                        {MOCK_CONFERENCES.map(c => (
                                            <option key={c.id} value={c.id}>{c.acronym} - {c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">您的基础服务费 ($)</label>
                                <input 
                                    type="number" 
                                    required
                                    min="10"
                                    placeholder="例如：50"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.baseFee}
                                    onChange={e => setFormData({...formData, baseFee: e.target.value})}
                                />
                                <p className="text-xs text-slate-500 mt-1">这是您代贴一张海报获得的纯收入。</p>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">最大接单量</label>
                                <input 
                                    type="number" 
                                    required
                                    min="1"
                                    max="50"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.maxSlots}
                                    onChange={e => setFormData({...formData, maxSlots: Number(e.target.value)})}
                                />
                                <p className="text-xs text-slate-500 mt-1">您最多愿意携带或张贴多少张海报。</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <h3 className="font-medium text-slate-900 mb-3">附加服务能力</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-indigo-600 rounded"
                                        checked={formData.canPrint}
                                        onChange={e => setFormData({...formData, canPrint: e.target.checked})}
                                    />
                                    <span className="text-sm text-slate-700">我可以提供<b>当地打印</b>服务 (客户支付额外打印费)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-indigo-600 rounded"
                                        checked={formData.canDesign}
                                        onChange={e => setFormData({...formData, canDesign: e.target.checked})}
                                    />
                                    <span className="text-sm text-slate-700">我可以提供简单<b>排版/设计调整</b>服务</span>
                                </label>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">参会凭证 <span className="text-red-500">*</span></label>
                            <p className="text-xs text-slate-500 mb-3">上传您的注册确认信(Registration Confirmation)或胸牌照片。这是服务上线的必要条件。</p>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer bg-slate-50 group">
                                <Upload size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm">点击上传文件 (PDF/JPG/PNG)</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setActiveTab('listings')} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium">取消</button>
                            <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center gap-2">
                                <CheckCircle size={18} /> 提交审核
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold mb-6">支付与认证</h2>
                    
                    <div className="mb-8">
                        <h3 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4">身份认证</h3>
                        <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg border border-green-200 text-green-800">
                            <CheckCircle size={24} />
                            <div>
                                <p className="font-bold">身份已认证</p>
                                <p className="text-sm">您的大学邮箱和ID已通过验证。</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4">收款方式</h3>
                        <div className="border rounded-lg p-4 flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 p-2 rounded">
                                    <CreditCard size={20} className="text-slate-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">招商银行 (...8892)</p>
                                    <p className="text-xs text-slate-500">储蓄卡</p>
                                </div>
                            </div>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">默认</span>
                        </div>
                        <button className="text-sm text-indigo-600 font-medium hover:underline">+ 添加收款方式</button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;