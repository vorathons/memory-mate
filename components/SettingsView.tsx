
import React, { useState, useRef, useEffect } from 'react';
import { UserData, Contact } from '../types';
import { requestNotificationPermission } from '../services/notificationService';

interface SettingsViewProps {
  userData: UserData;
  contacts: Contact[];
  onUpdateUser: (data: UserData) => void;
  onAddContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
  onBack?: () => void;
  variant?: 'settings' | 'profile'; // New prop to determine display mode
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  userData, 
  contacts, 
  onUpdateUser, 
  onAddContact, 
  onDeleteContact,
  onBack,
  variant = 'settings'
}) => {
  // Local state for the form
  const [formData, setFormData] = useState<UserData>(userData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  
  // Local state for new contact form
  const [newContact, setNewContact] = useState({
    name: '',
    relation: '',
    phoneNumber: ''
  });
  const [isAddingContact, setIsAddingContact] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationEnabled(Notification.permission === 'granted');
    }
  }, []);

  const handleToggleNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationEnabled(granted);
    if (granted) {
      alert('เปิดการแจ้งเตือนเรียบร้อยแล้ว');
    } else {
      alert('กรุณาอนุญาตการแจ้งเตือนในตั้งค่าของเบราว์เซอร์');
    }
  };

  const handleUserSave = () => {
    onUpdateUser(formData);
    alert('บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phoneNumber) return;

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      relation: newContact.relation || 'ญาติ',
      phoneNumber: newContact.phoneNumber,
      imageUrl: `https://ui-avatars.com/api/?name=${newContact.name}&background=random` // Auto generate avatar
    };

    onAddContact(contact);
    setNewContact({ name: '', relation: '', phoneNumber: '' });
    setIsAddingContact(false);
  };

  const isProfileTab = variant === 'profile';

  return (
    <div className="bg-gray-50 min-h-full pb-24">
      <header className={`bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center ${isProfileTab ? 'justify-center' : ''}`}>
        {!isProfileTab && onBack && (
          <button onClick={onBack} className="mr-3 p-2 rounded-full hover:bg-gray-100 absolute left-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800">
          {isProfileTab ? 'ข้อมูลของฉัน' : 'ตั้งค่าระบบ (สำหรับผู้ดูแล)'}
        </h1>
      </header>

      <div className="p-6 space-y-8">
        
        {/* Notification Settings (Visible in both modes) */}
        <div className="bg-white p-4 rounded-3xl shadow-md border border-yellow-100 flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
               🔔
             </div>
             <div>
               <h3 className="font-bold text-gray-800">การแจ้งเตือน</h3>
               <p className="text-xs text-gray-500">เตือนกินยา / กิจวัตร</p>
             </div>
           </div>
           <button 
             onClick={handleToggleNotifications}
             className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
               notificationEnabled 
                 ? 'bg-green-100 text-green-700 border border-green-200' 
                 : 'bg-gray-100 text-gray-500 border border-gray-200'
             }`}
           >
             {notificationEnabled ? 'เปิดอยู่' : 'แตะเพื่อเปิด'}
           </button>
        </div>

        {/* Section 1: User Profile */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-lg font-bold text-blue-800 mb-6 flex items-center">
            <span className="bg-blue-100 p-2 rounded-lg mr-2">👤</span> ข้อมูลผู้ใช้งาน
          </h2>
          
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 shadow-inner bg-gray-100 mb-3 relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
               {formData.photoUrl ? (
                 <img src={formData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                 </div>
               )}
               <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white text-xs font-bold">แตะเพื่อเปลี่ยนรูป</span>
               </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-blue-600 font-medium px-4 py-1 rounded-full bg-blue-50 hover:bg-blue-100"
            >
              เปลี่ยนรูปโปรไฟล์
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อจริง</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">โรคประจำตัว / อาการ</label>
              <input
                type="text"
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
               <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">กรุ๊ปเลือด</label>
                  <select 
                    value={formData.bloodType}
                    onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none text-gray-800"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="O">O</option>
                    <option value="AB">AB</option>
                  </select>
               </div>
               <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่ปัจจุบัน</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none resize-none text-gray-800"
                  />
               </div>
            </div>

            <button 
              onClick={handleUserSave}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform mt-2"
            >
              บันทึกข้อมูลส่วนตัว
            </button>
          </div>
        </div>

        {/* Section 2: Contacts Management */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-800 flex items-center">
              <span className="bg-green-100 p-2 rounded-lg mr-2">📞</span> เบอร์โทรฉุกเฉิน
            </h2>
            <button 
              onClick={() => setIsAddingContact(!isAddingContact)}
              className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 hover:bg-green-100"
            >
              {isAddingContact ? 'ยกเลิก' : '+ เพิ่มเบอร์'}
            </button>
          </div>

          {isAddingContact && (
            <form onSubmit={handleAddContactSubmit} className="bg-green-50 p-4 rounded-xl mb-4 border border-green-100 animate-fadeIn">
              <div className="space-y-3">
                <input
                  placeholder="ชื่อ (เช่น ลูกสาว)"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full p-2 rounded-lg border border-gray-200 bg-white"
                  required
                />
                <input
                  placeholder="ความสัมพันธ์ (เช่น ผู้ดูแลหลัก)"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
                  className="w-full p-2 rounded-lg border border-gray-200 bg-white"
                />
                <input
                  placeholder="เบอร์โทรศัพท์"
                  type="tel"
                  value={newContact.phoneNumber}
                  onChange={(e) => setNewContact({...newContact, phoneNumber: e.target.value})}
                  className="w-full p-2 rounded-lg border border-gray-200 bg-white"
                  required
                />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-medium shadow-sm">
                  ยืนยันการเพิ่ม
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 bg-white">
                <div className="flex items-center space-x-3">
                   <img src={contact.imageUrl} alt={contact.name} className="w-10 h-10 rounded-full bg-gray-200 object-cover border border-gray-200" />
                   <div>
                     <p className="font-bold text-gray-800">{contact.name}</p>
                     <p className="text-xs text-gray-500">{contact.phoneNumber}</p>
                   </div>
                </div>
                <button 
                  onClick={() => onDeleteContact(contact.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            {contacts.length === 0 && (
              <p className="text-center text-gray-400 py-4">ยังไม่มีรายชื่อผู้ติดต่อ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
