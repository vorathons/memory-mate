import React from 'react';
import { Contact } from '../types';

interface EmergencyViewProps {
  contacts: Contact[];
  userData: {
    name: string;
    condition: string;
    bloodType: string;
    address: string;
  };
}

const EmergencyView: React.FC<EmergencyViewProps> = ({ contacts, userData }) => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="p-6 pb-24 space-y-8">
      <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-6 text-center shadow-sm">
        <h2 className="text-red-600 font-bold text-lg mb-2">บัตรประจำตัวผู้ป่วย</h2>
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-sm">
             <img src="https://picsum.photos/200/200?random=user" alt="User" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{userData.name}</h1>
        <p className="text-gray-600 mb-4">{userData.condition}</p>
        
        <div className="grid grid-cols-2 gap-4 text-left bg-white p-4 rounded-xl border border-red-100">
           <div>
               <p className="text-xs text-gray-400 uppercase">กรุ๊ปเลือด</p>
               <p className="text-xl font-semibold text-gray-800">{userData.bloodType}</p>
           </div>
           <div>
               <p className="text-xs text-gray-400 uppercase">ที่อยู่</p>
               <p className="text-sm font-medium text-gray-800">{userData.address}</p>
           </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 pl-2">เบอร์โทรฉุกเฉิน</h3>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleCall(contact.phoneNumber)}
              className="w-full bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center space-x-4 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-green-100">
                <img src={contact.imageUrl} alt={contact.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow text-left">
                <p className="text-lg font-bold text-gray-900">{contact.name}</p>
                <p className="text-green-600 font-medium">{contact.relation}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </button>
          ))}
          
          <button
            onClick={() => handleCall('1669')}
            className="w-full bg-red-500 text-white p-5 rounded-2xl shadow-lg shadow-red-200 flex items-center justify-center space-x-3 active:scale-95 transition-transform mt-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-2xl font-bold">เรียกรถพยาบาล (1669)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyView;