import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, ArrowRight, Upload, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_CONFERENCES, PRINTING_COST, DESIGN_COST } from '../constants';
import { Conference } from '../types';

interface ScholarDashboardProps {
  onBack: () => void;
}

const ITEMS_PER_PAGE = 12;

const ScholarDashboard: React.FC<ScholarDashboardProps> = ({ onBack: _ }) => {
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Order Form State
  const [needsPrinting, setNeedsPrinting] = useState(false);
  const [needsDesign, setNeedsDesign] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'MAIL_TO_VENUE' | 'PRINT_LOCAL'>('PRINT_LOCAL');
  const [orderStep, setOrderStep] = useState(1); // 1: Config, 2: Checkout, 3: Success

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag]);

  // Filtering Logic
  const filteredConferences = useMemo(() => {
    return MOCK_CONFERENCES.filter(conf => {
      const matchesSearch = conf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            conf.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            conf.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? conf.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredConferences.length / ITEMS_PER_PAGE);
  const paginatedConferences = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredConferences.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredConferences, currentPage]);

  // All unique tags for filter
  const allTags = useMemo(() => Array.from(new Set(MOCK_CONFERENCES.flatMap(c => c.tags))), []);

  // Pricing Logic
  const calculateTotal = () => {
    if (!selectedConference) return 0;
    let total = selectedConference.basePrice; // Base service fee
    if (needsPrinting) total += PRINTING_COST;
    if (needsDesign) total += DESIGN_COST;
    // Assume delivery cost is included in printing or mailing fee logic for simplicity
    return total;
  };

  const handleBookClick = (conf: Conference) => {
    setSelectedConference(conf);
    setOrderStep(1);
    setNeedsPrinting(false);
    setNeedsDesign(false);
  };

  const handlePlaceOrder = () => {
    setOrderStep(3);
  };

  if (selectedConference) {
    // === DETAIL & BOOKING VIEW ===
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => setSelectedConference(null)} className="text-sm text-slate-500 hover:text-indigo-600 mb-4 flex items-center gap-1">
          ← 返回会议列表
        </button>

        {orderStep === 3 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">订单已确认！</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              您关于 <strong>{selectedConference.acronym}</strong> 的代贴需求已发布。服务方将很快审核并接受您的请求。确认后将通过邮件通知您。
            </p>
            <button 
              onClick={() => setSelectedConference(null)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              返回控制台
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="h-48 w-full bg-slate-200 relative">
                    <img src={selectedConference.imageUrl} alt={selectedConference.acronym} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <h1 className="text-3xl font-bold text-white">{selectedConference.name}</h1>
                    </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 text-slate-600 mb-4">
                    <div className="flex items-center gap-2"><MapPin size={18} /> {selectedConference.location}</div>
                    <div className="flex items-center gap-2"><Calendar size={18} /> {selectedConference.dates}</div>
                  </div>
                  <div className="flex gap-2">
                    {selectedConference.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Config */}
              {orderStep === 1 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold mb-4">定制服务</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:border-indigo-300 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={needsPrinting}
                        onChange={(e) => setNeedsPrinting(e.target.checked)}
                        className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between font-medium">
                          <span>包含海报打印服务</span>
                          <span>+${PRINTING_COST}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          服务方将在当地打印海报，免去您携带或长途邮寄的麻烦。
                        </p>
                      </div>
                    </label>

                    {needsPrinting && (
                        <div className="ml-9 p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                            <p className="text-sm font-semibold text-slate-700 mb-2">海报如何送达会场？</p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="delivery" checked={deliveryMethod === 'PRINT_LOCAL'} onChange={() => setDeliveryMethod('PRINT_LOCAL')} className="text-indigo-600"/>
                                    <span className="text-sm">当地代印 (推荐)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="delivery" checked={deliveryMethod === 'MAIL_TO_VENUE'} onChange={() => setDeliveryMethod('MAIL_TO_VENUE')} className="text-indigo-600"/>
                                    <span className="text-sm">我将自行邮寄</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:border-indigo-300 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={needsDesign}
                        onChange={(e) => setNeedsDesign(e.target.checked)}
                        className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between font-medium">
                          <span>专业排版/设计调整</span>
                          <span>+${DESIGN_COST}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          服务方根据您的文本和图表调整海报布局，使其更符合学术展示标准。
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Contact/Checkout Form */}
              {orderStep === 2 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold mb-4">联系方式与支付</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">名字 (First Name)</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="San" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">姓氏 (Last Name)</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Zhang" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">电子邮箱</label>
                            <input type="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="san.zhang@university.edu" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">海报文件 (PDF)</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer">
                                <Upload size={24} className="mb-2" />
                                <span className="text-sm">点击上传或拖拽文件至此</span>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100">
                            <label className="block text-sm font-medium text-slate-700 mb-2">支付方式</label>
                            <div className="flex gap-3">
                                <div className="border p-3 rounded-lg flex-1 text-center cursor-pointer hover:border-indigo-500 bg-slate-50">微信支付</div>
                                <div className="border p-3 rounded-lg flex-1 text-center cursor-pointer hover:border-indigo-500 bg-slate-50">支付宝</div>
                                <div className="border p-3 rounded-lg flex-1 text-center cursor-pointer hover:border-indigo-500 bg-slate-50">信用卡</div>
                            </div>
                        </div>
                    </div>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 sticky top-6">
                <h3 className="text-lg font-bold mb-4">订单摘要</h3>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">代贴基础服务费</span>
                    <span className="font-medium">${selectedConference.basePrice}</span>
                  </div>
                  {needsPrinting && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">打印费 ({deliveryMethod === 'PRINT_LOCAL' ? '当地' : '邮寄'})</span>
                      <span className="font-medium">${PRINTING_COST}</span>
                    </div>
                  )}
                  {needsDesign && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">设计/排版费</span>
                      <span className="font-medium">${DESIGN_COST}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-base font-bold text-indigo-900">
                    <span>预估总价</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                {orderStep === 1 ? (
                    <button 
                        onClick={() => setOrderStep(2)}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                    >
                        下一步：支付
                    </button>
                ) : (
                    <div className="space-y-3">
                         <button 
                            onClick={handlePlaceOrder}
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                        >
                            确认并支付
                        </button>
                        <button 
                            onClick={() => setOrderStep(1)}
                            className="w-full py-2 text-slate-500 hover:text-slate-700 font-medium transition-colors"
                        >
                            返回修改
                        </button>
                    </div>
                )}
                
                <div className="mt-4 text-xs text-slate-400 text-center">
                    资金将由平台托管，直到服务完成并确认。
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // === LIST VIEW ===
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">寻找会议海报代贴服务</h1>
        <p className="text-slate-600">为全球学者提供专业的学术海报代贴服务</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索会议名称、简称或地点..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter size={18} className="text-slate-400" />
            <button 
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${selectedTag === null ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                onClick={() => setSelectedTag(null)}
            >
                全部
            </button>
            {allTags.map(tag => (
                <button 
                    key={tag}
                    className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    onClick={() => setSelectedTag(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
      </div>

      {/* Conference Grid */}
      {paginatedConferences.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedConferences.map(conf => (
                <div key={conf.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col h-full">
                    <div className="h-40 overflow-hidden relative">
                        <img src={conf.imageUrl} alt={conf.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-indigo-700 text-xs font-bold px-2 py-1 rounded shadow-sm">
                            {conf.acronym}
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{conf.name}</h3>
                        
                        <div className="space-y-2 mb-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-slate-400" />
                                {conf.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-slate-400" />
                                {conf.dates}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {conf.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500">起价</p>
                                <p className="text-lg font-bold text-indigo-600">${conf.basePrice}</p>
                            </div>
                            <button 
                                onClick={() => handleBookClick(conf)}
                                className="flex items-center gap-1 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                选择 <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">未找到相关会议</h3>
            <p className="text-slate-500">请尝试调整搜索关键词或筛选条件。</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
            >
                <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                第 {currentPage} 页 / 共 {totalPages} 页
            </span>
            <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
            >
                <ChevronRight size={20} />
            </button>
        </div>
      )}
    </div>
  );
};

export default ScholarDashboard;