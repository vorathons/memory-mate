import React from 'react';
import Logo from './Logo';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-blue-50/50 flex flex-col items-center justify-center p-6 text-center">
      
      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <div className="mb-12 transform scale-110">
          <Logo size="lg" />
        </div>

        <div className="w-full space-y-5">
          {/* Patient Button (Blue) */}
          <button
            onClick={() => onLogin('PATIENT')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-24 rounded-[2rem] shadow-blue-200 shadow-xl transform transition-all active:scale-95 flex items-center justify-between px-8 relative overflow-hidden group"
          >
            <div className="text-left z-10">
              <p className="text-blue-100 text-sm font-medium mb-0.5 opacity-90">สำหรับผู้ใช้งาน</p>
              <h2 className="text-2xl font-bold tracking-tight">เข้าใช้งานทันที</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md z-10 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </button>

          {/* Caregiver Button (White) */}
          <button
            onClick={() => onLogin('CAREGIVER')}
            className="w-full bg-white border-2 border-white text-blue-900 h-24 rounded-[2rem] shadow-lg shadow-gray-100 hover:bg-gray-50 transform transition-all active:scale-95 flex items-center justify-between px-8"
          >
            <div className="text-left">
              <p className="text-gray-400 text-xs font-medium mb-0.5">สำหรับญาติ / ผู้ดูแล</p>
              <h2 className="text-xl font-bold text-blue-900">ตั้งค่าระบบ (ใส่รหัส)</h2>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center pb-6 w-full max-w-xs border-t border-gray-100 pt-6">
        <p className="text-gray-400 text-xs font-light mb-4">
          Version 1.2.0 • ออกแบบเพื่อผู้สูงอายุ
        </p>
        
        <div className="flex flex-col space-y-3 items-center">
           <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">ติดต่อผู้พัฒนา</p>
           
           {/* Instagram */}
           <a 
             href="https://instagram.com/vonthon_3" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="flex items-center space-x-2 text-gray-500 hover:text-pink-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50 w-full justify-center"
           >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="text-xs font-medium">vonthon_3</span>
           </a>

           {/* Gmail */}
           <a 
             href="mailto:vorathon.su21@gmail.com" 
             className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50 w-full justify-center"
           >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">vorathon.su21@gmail.com</span>
           </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;