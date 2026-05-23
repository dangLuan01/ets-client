"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotification } from '@/components/NotificationContext';
import { getUserDetail, updatePassword, updateUser } from '@/services/userService';
import { UserDetail } from '@/types/user';
import { Loader2 } from 'lucide-react';
import { ApiErrorResponse } from '@/types/error';

export const tagetList = [
  { taget: 600, label: '600+ (Đủ điều kiện ra trường)'},
  { taget: 750, label: '750+ (Tiêu chuẩn đi làm)'},
  { taget: 850, label: '850+ (Mức xuất sắc)'},
  { taget: 990, label: '990 (Tuyệt đối)'},
];

export default function ProfilePage() {
    
    const [activeTab, setActiveTab]             = useState('general');
    const [isSaving, setIsSaving]               = useState(false);
    const accessToken                           = useAuthStore((state) => state.accessToken);
    const notify                                = useNotification();
    const [userData, setUserData]               = useState({ username: '', target: 0, exam_date: '', has_password: false });
    const [userErrors, setUserErrors]           = useState({ username: '', target: 0, exam_date: '' });
    const [userDetail, setUserDetail]           = useState<UserDetail>();
    const [pwdData, setPwdData]                 = useState({ current_password: '', new_password: '', confirm_password: '' });
    const [pwdErrors, setPwdErrors]             = useState({ current_password: '', new_password: '', confirm_password: '' });

    useEffect(() => {
        if (!accessToken) {return};

        const fetchUserDetail = async () => {
            const resp = await getUserDetail();
            setUserDetail(resp.data)
        }

        fetchUserDetail();
    },[]);

    useEffect(() => {
        if (userDetail) {
            setUserData((prev) => ({
                ...prev,
                username: userDetail.username,
                target: userDetail.target,
                has_password: userDetail.has_password
            }));

            if (userDetail.exam_date) {
                const date = new Date(userDetail.exam_date).toLocaleDateString("en-CA")
                setUserData((prev) => ({
                    ...prev,
                    exam_date: date,
                    
                }));
            }
        }
    }, [userDetail]);
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);

            await updateUser({
                name:userData.username,
                target: Number(userData.target),
                exam_date: userData.exam_date || undefined,
            });
            
            notify.success(
                "Thành công 🎉",
                "Đã cập nhật thông tin cá nhân."
            );

        } catch (error) {
            const err = error as ApiErrorResponse
            if (err.error && userErrors.hasOwnProperty(err.error)) {
                setUserErrors(prev => ({
                    ...prev,
                    [err.error as string]: err.detail
                }));
            } else {
                notify.error(
                    "Thất bại",
                    "Cập nhật không thành công!"
                );
            }
           
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = { current_password: '', new_password: '', confirm_password: '' };
        let isValid = true;

        // 1. Kiểm tra rỗng mật khẩu hiện tại
        if (!pwdData.current_password) {
            newErrors.current_password = 'Vui lòng nhập mật khẩu hiện tại của bạn.';
            isValid = false;
        }

        // 2. Kiểm tra độ dài mật khẩu mới
        if (pwdData.new_password.length < 8) {
            newErrors.new_password = 'Mật khẩu mới phải có ít nhất 8 ký tự.';
            isValid = false;
        }

        // 3. Kiểm tra khớp mật khẩu xác nhận
        if (pwdData.new_password !== pwdData.confirm_password) {
            newErrors.confirm_password = 'Mật khẩu xác nhận không khớp.';
            isValid = false;
        } else if (!pwdData.confirm_password) {
            newErrors.confirm_password = 'Vui lòng xác nhận lại mật khẩu.';
            isValid = false;
        }

        setPwdErrors(newErrors);

        if (isValid) {
            try {
                setIsSaving(true);

                await updatePassword({
                    has_password: userData.has_password,
                    current_password: pwdData.current_password,
                    new_password: pwdData.new_password,
                    confirm_password: pwdData.confirm_password
                });
                
                notify.success(
                    "Thành công 🎉",
                    "Đã cập nhật mật khẩu thành công."
                );

            } catch (err) {
                const error = err as ApiErrorResponse

                if (error.error && pwdErrors.hasOwnProperty(error.error)) {
                    setPwdErrors(prev => ({
                        ...prev,
                        [error.error as string]: error.detail
                    }));
                } else {
                    setPwdErrors((prev) => ({
                        ...prev,
                        ...error.errors
                    }));  
                }
            } finally {
                setIsSaving(false);
            }
        };
    };

    const handleDelete = () => {
        notify.info("Hệ thống đang phát triển.", "Vui lòng quay lại sau. Cảm ơn ❤️ ❤️ ❤️");
        return;
    }

    if (!accessToken) {
        return null;
    }
    
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pt-5 lg:pt-24">
      
      {/* 1. HEADER */}
      <div className="mb-10">
        <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
          <Link href="/" className="hover:text-indigo-600 transition">Trang chủ</Link> 
          <span>/</span> 
          <span className="text-indigo-600">Cá nhân</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
          Hồ sơ <span className="text-indigo-600">Học viên</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* 2. LEFT SIDEBAR: AVATAR & MENU */}
        <aside className="lg:w-1/3 space-y-6">
            
            {/* Bento Avatar Box */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-50 to-purple-50"></div>
                
                {/* Avatar Upload */}
                <div className="relative inline-block mt-8 mb-4 group cursor-pointer">
                    <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl shadow-indigo-100/50 group-hover:scale-105 transition-transform duration-300">
                        <img src={userDetail?.avatar || "https://i.pravatar.cc/150?u=user1"} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    {/* Camera Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        <i className="fas fa-camera text-white text-xl"></i>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900">{userDetail?.username}</h2>
                <p className="text-sm font-medium text-slate-500 mb-4">{userDetail?.email}</p>
                
                {/* Badge Premium */}
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 px-4 py-2 rounded-xl text-xs font-bold">
                    <i className="fas fa-crown"></i> Thành viên
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-4 shadow-sm space-y-2">
                <button 
                    onClick={() => setActiveTab('general')}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'general' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                    <i className="fas fa-user-edit w-5 text-center"></i> Thông tin chung
                </button>
                <button 
                    onClick={() => setActiveTab('subscription')}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'subscription' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                    <i className="fas fa-credit-card w-5 text-center"></i> Quản lý gói cước
                </button>
                <button 
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                    <i className="fas fa-shield-alt w-5 text-center"></i> Bảo mật tài khoản
                </button>
            </div>
        </aside>

        {/* 3. RIGHT CONTENT AREA */}
        <div className="lg:w-2/3">
            
            {/* ================= TAB: THÔNG TIN CHUNG ================= */}
            {activeTab === 'general' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-slate-900">Thông tin cá nhân</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">Cập nhật thông tin để chúng tôi hỗ trợ bạn tốt hơn.</p>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Tên</label>
                                    <input type="text" value={userData.username} onChange={(e) => setUserData({...userData, username: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm" />
                                </div>
                                {/* <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Số điện thoại</label>
                                    <input type="tel" defaultValue="0987654321" className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm" />
                                </div> */}
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email (Không thể thay đổi)</label>
                                <input type="email" value={userDetail?.email || ""} disabled className="w-full bg-slate-100 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-bold text-slate-500 outline-none cursor-not-allowed" />
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-lg font-black text-slate-900 mb-6">Mục tiêu học tập</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Điểm TOEIC mục tiêu</label>
                                        <select value={userData.target} onChange={(e) => setUserData({...userData, target: Number(e.target.value)} )} className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm appearance-none">
                                            {tagetList.map((item) => (
                                                <option key={item.taget} value={item.taget}>{item.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`block text-[10px] font-black ${userErrors.exam_date ? 'text-red-500' : 'text-slate-400'} uppercase tracking-widest mb-2 px-1`}>Ngày dự định thi</label>
                                        <input type="date" value={userData.exam_date} 
                                            onChange={(e) => {
                                                    setUserData({...userData, exam_date: e.target.value});
                                                    if (userErrors.exam_date) setUserErrors({...userData, exam_date: ''});
                                                }
                                            }
                                            className={`w-full bg-slate-50 border-2 px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all ${userErrors.exam_date ? 'border-rose-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]': 'border-transparent focus:bg-white focus:border-indigo-600 focus:shadow-sm'}`} />
                                        {userErrors.exam_date && (
                                            <p className="text-[11px] font-bold text-rose-500 mt-2 px-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                                <i className="fas fa-exclamation-circle"></i> {userErrors.exam_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 text-right">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                   {isSaving && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin inline-block" />
                                    )}

                                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= TAB: GÓI CƯỚC ================= */}
            {activeTab === 'subscription' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Current Plan Card (Bento Style) */}
                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-screen blur-[80px] opacity-20"></div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Gói hiện tại</p>
                                <h3 className="text-3xl md:text-4xl font-black text-amber-400 mb-2">Premium 6 Tháng</h3>
                                <p className="text-sm text-slate-300 font-medium"><i className="far fa-clock mr-2"></i> Hết hạn vào: 15 Tháng 11, 2026</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center md:min-w-[140px]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Thời gian còn lại</p>
                                <p className="text-3xl font-black">184 <span className="text-sm font-medium text-slate-400">ngày</span></p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                            <button className="bg-amber-500 text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-white transition-colors">
                                Gia hạn ngay (Giảm 20%)
                            </button>
                            <button className="bg-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors border border-white/10">
                                Xem lịch sử thanh toán
                            </button>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <h4 className="text-lg font-black text-slate-900 mb-6">Đặc quyền của bạn</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3"><i className="fas fa-check-circle text-emerald-500"></i> <span className="text-sm font-bold text-slate-600">Xem giải thích chi tiết 100% câu hỏi</span></div>
                            <div className="flex items-center gap-3"><i className="fas fa-check-circle text-emerald-500"></i> <span className="text-sm font-bold text-slate-600">Tải xuống Audio & PDF</span></div>
                            <div className="flex items-center gap-3"><i className="fas fa-check-circle text-emerald-500"></i> <span className="text-sm font-bold text-slate-600">AI phân tích điểm yếu</span></div>
                            <div className="flex items-center gap-3"><i className="fas fa-check-circle text-emerald-500"></i> <span className="text-sm font-bold text-slate-600">Không có quảng cáo</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= TAB: BẢO MẬT ================= */}
            {activeTab === 'security' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Đổi mật khẩu */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Đổi mật khẩu</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8">Nên sử dụng mật khẩu mạnh bao gồm chữ hoa, chữ thường và số.</p>

                        <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                            {/* Mật khẩu hiện tại */}
                            {userData.has_password && (
                            <div>
                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 px-1 transition-colors ${pwdErrors.current_password ? 'text-rose-500' : 'text-slate-400'}`}>
                                    Mật khẩu hiện tại
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={pwdData.current_password}
                                    onChange={(e) => {
                                        setPwdData({...pwdData, current_password: e.target.value});
                                        if (pwdErrors.current_password) setPwdErrors({...pwdErrors, current_password: ''});
                                    }}
                                    className={`w-full bg-slate-50 border-2 px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all ${
                                        pwdErrors.current_password
                                        ? 'border-rose-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
                                        : 'border-transparent focus:bg-white focus:border-indigo-600'
                                    }`} 
                                />
                                {pwdErrors.current_password && (
                                    <p className="text-[11px] font-bold text-rose-500 mt-2 px-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                        <i className="fas fa-exclamation-circle"></i> {pwdErrors.current_password}
                                    </p>
                                )}
                            </div>
                            )}
                            {/* Mật khẩu mới */}
                            <div>
                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 px-1 transition-colors ${pwdErrors.new_password ? 'text-rose-500' : 'text-slate-400'}`}>
                                    Mật khẩu mới
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={pwdData.new_password}
                                    onChange={(e) => {
                                        setPwdData({...pwdData, new_password: e.target.value});
                                        if (pwdErrors.new_password) setPwdErrors({...pwdErrors, new_password: ''});
                                    }}
                                    className={`w-full bg-slate-50 border-2 px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all ${
                                        pwdErrors.new_password 
                                        ? 'border-rose-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
                                        : 'border-transparent focus:bg-white focus:border-indigo-600'
                                    }`} 
                                />
                                {pwdErrors.new_password && (
                                    <p className="text-[11px] font-bold text-rose-500 mt-2 px-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                        <i className="fas fa-exclamation-circle"></i> {pwdErrors.new_password}
                                    </p>
                                )}
                            </div>

                            {/* Xác nhận mật khẩu mới */}
                            <div>
                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 px-1 transition-colors ${pwdErrors.confirm_password ? 'text-rose-500' : 'text-slate-400'}`}>
                                    Xác nhận mật khẩu mới
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={pwdData.confirm_password}
                                    onChange={(e) => {
                                        setPwdData({...pwdData, confirm_password: e.target.value});
                                        if (pwdErrors.confirm_password) setPwdErrors({...pwdErrors, confirm_password: ''});
                                    }}
                                    className={`w-full bg-slate-50 border-2 px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all ${
                                        pwdErrors.confirm_password
                                        ? 'border-rose-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
                                        : 'border-transparent focus:bg-white focus:border-indigo-600'
                                    }`} 
                                />
                                {pwdErrors.confirm_password && (
                                    <p className="text-[11px] font-bold text-rose-500 mt-2 px-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                        <i className="fas fa-exclamation-circle"></i> {pwdErrors.confirm_password}
                                    </p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSaving}
                                className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-600 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin inline-block" /> Đang cập nhật...</> : "Cập nhật mật khẩu"}
                            </button>
                        </form>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                        <h3 className="text-xl font-black text-rose-600 mb-2">Khu vực nguy hiểm</h3>
                        <p className="text-sm font-medium text-rose-700/80 mb-6">Việc xóa tài khoản sẽ xóa toàn bộ lịch sử làm bài và gói Premium của bạn. Hành động này không thể hoàn tác.</p>
                        <button onClick={() => handleDelete()} className="bg-white text-rose-600 border border-rose-200 font-bold px-6 py-3 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-sm shadow-sm">
                            Yêu cầu xóa tài khoản
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </main>    
  );
}