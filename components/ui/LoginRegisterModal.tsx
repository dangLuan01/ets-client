"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { register, login, getMe } from "@/services/authService";
import { validateEmail, validatePassword, validateTarget, validateUsername } from "@/utils/helper";
import { useAuthStore } from "@/store/useAuthStore";

const LoginRegisterModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [isLogin, setIsLogin]             = useState(true);
  const [username, setUsername]           = useState("");
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [target, setTarget]               = useState(990);
  const [agree, setAgree]                 = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError]       = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [targetError, setTargetError]     = useState("");
  const [agreeError, setAgreeError]       = useState("");
  const [apiError, setApiError]           = useState("");
  const setTokens                         = useAuthStore((state) => state.setTokens);
  const setUser                           = useAuthStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setApiError("");

    let hasError = false;
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Mật khẩu không được để trống.");
      hasError = true;
    }

    if (!hasError) {
      try {
        const loginResponse = await login({ email, password });
       
        const { access_token, refresh_token } = loginResponse.data;
        
        // Store tokens first
        setTokens(access_token, refresh_token);
        
        // Then, fetch user information
        const meResponse = await getMe();
        setUser(meResponse.data);

        onClose();
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("Đã có lỗi xảy ra.  Kiểm tra lại thông tin.");
        }
      }
    }
  };

  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setAgreeError("");
    setTargetError("");
    setApiError("");

    let hasError = false;
    if (!validateUsername(username)) {
      setUsernameError(
        "Họ và tên không được để trống."
      );
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ.");
      hasError = true;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Mật khẩu phải dài ít nhất 8 ký tự."
      );
      hasError = true;
    }
    if(!agree) {
      setAgreeError("Bạn phải đồng ý với điều khoản sử dụng.");
      hasError = true;
    }

    if (!validateTarget(target)) {
      setTargetError("Mục tiêu phải từ 10 đến 990.")
      hasError = true;
    }

    if (!hasError) {
      try {
        await register({ username, email, password, target });
        setIsLogin(true);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("Đã có lỗi xảy ra.");
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
      ></div>

      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 hover:text-slate-900 transition z-50"
        >
          <X size={20} />
        </button>

        <div className="hidden md:flex md:w-5/12 bg-indigo-600 p-10 flex-col justify-between relative overflow-hidden text-white">
          <div className="relative z-10">
            <a href="#" className="text-2xl font-black tracking-tighter italic opacity-90">
              Toiecviet<span className="text-indigo-300">.com</span>
            </a>
          </div>

          <div className="relative z-10 space-y-6">
            <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
              Cộng đồng 9K+ học viên
            </span>
            <h2 className="text-4xl font-black leading-tight">
              Đột phá điểm số <br />
              ngay hôm nay.
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Truy cập kho đề thi ETS 2026, phân tích AI chuyên sâu và lộ trình cá nhân hóa hoàn toàn miễn phí.
            </p>
          </div>

          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-screen blur-3xl opacity-50"></div>
          <div className="absolute top-1/4 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen blur-3xl opacity-40"></div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 relative">
          <div className="flex gap-6 border-b border-slate-100 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-4 font-black text-lg transition ${
                isLogin
                  ? "text-indigo-600 border-b-4 border-indigo-600"
                  : "text-slate-400 border-b-4 border-transparent hover:text-slate-600"
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-4 font-black text-lg transition ${
                !isLogin
                  ? "text-indigo-600 border-b-4 border-indigo-600"
                  : "text-slate-400 border-b-4 border-transparent hover:text-slate-600"
              }`}
            >
              Đăng ký mới
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              {apiError && <p className="text-red-500 text-sm text-center font-bold">{apiError}</p>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                    Email của bạn
                  </label>
                  <input
                    type="email"
                    placeholder="Ví dụ: hi@toiecviet.com"
                    className={`w-full bg-slate-50 border-2 ${emailError ? 'border-red-500' : 'border-transparent'} px-5 py-4 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1 px-1">{emailError}</p>}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2 px-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Mật khẩu
                    </label>
                    {/* <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">
                      Quên mật khẩu?
                    </a> */}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full bg-slate-50 border-2 ${passwordError ? 'border-red-500' : 'border-transparent'} px-5 py-4 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Eye icon can be added here */}
                  </div>
                   {passwordError && <p className="text-red-500 text-xs mt-1 px-1">{passwordError}</p>}
                </div>
                
              </div>
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-indigo-600 transition-colors"
              >
                ĐĂNG NHẬP
              </button>
              {/* <div className="relative flex items-center justify-center mt-8 mb-6">
                <div className="w-full border-t border-slate-100"></div>
                <span className="absolute bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Hoặc tiếp tục với
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-3 bg-slate-50 py-3.5 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-100 border border-slate-100 transition">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" /> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-3 bg-slate-50 py-3.5 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-100 border border-slate-100 transition">
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" /> Facebook
                </button>
              </div> */}
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
               {apiError && <p className="text-red-500 text-sm text-center font-bold">{apiError}</p>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className={`w-full bg-slate-50 border-2 ${usernameError ? 'border-red-500' : 'border-transparent'} px-5 py-4 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && <p className="text-red-500 text-xs mt-1 px-1">{usernameError}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="hi@toiecviet.com"
                    className={`w-full bg-slate-50 border-2 ${emailError ? 'border-red-500' : 'border-transparent'} px-5 py-4 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1 px-1">{emailError}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    placeholder="Tạo mật khẩu (tối thiểu 8 ký tự)"
                    className={`w-full bg-slate-50 border-2 ${passwordError ? 'border-red-500' : 'border-transparent'} px-5 py-4 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <p className="text-red-500 text-xs mt-1 px-1">{passwordError}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                    Mục tiêu điểm
                  </label>
                  <input
                    type="number"
                    placeholder="Nhập mục tiêu đạt điểm của bạn"
                    className={`w-full bg-slate-50 border-2 ${targetError ? 'border-red-500' : 'border-transparent'} px-5 py-4 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm`}
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                  />
                  {targetError && <p className="text-red-500 text-xs mt-1 px-1">{targetError}</p>}
                </div>
              </div>

              <div className="flex items-start gap-3 px-1 mt-2">
                <input
                  type="checkbox"
                  id="agree"
                  className="mt-1 w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-indigo-600 font-bold hover:underline">
                      Điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-indigo-600 font-bold hover:underline">
                      Chính sách bảo mật
                    </a>{" "}
                    của Toiecviet.com.
                  </p>
                  {agreeError && <p className="text-red-500 text-xs mt-1">{agreeError}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-slate-900 transition-colors"
              >
                TẠO TÀI KHOẢN MỚI
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
