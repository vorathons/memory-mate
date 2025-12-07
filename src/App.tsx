
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import RoutineList from './components/RoutineList';
import PhotoAlbum from './components/PhotoAlbum';
import ChatCompanion from './components/ChatCompanion';
import EmergencyView from './components/EmergencyView';
import LoginScreen from './components/LoginScreen';
import SettingsView from './components/SettingsView';
import Logo from './components/Logo';
import HealthTipsCard from './components/HealthTipsCard';
import { AppView, RoutineTask, UserData, Contact, UserRole, MemoryPhoto } from './types';
import { sendNotification } from './services/notificationService';

// -------------------------------
// INITIAL DATA
// -------------------------------
const INITIAL_ROUTINES: RoutineTask[] = [
  { 
    id: '1', 
    title: 'กินยาเช้า', 
    time: '08:00', 
    completed: false, 
    icon: '💊',
    voiceMessageText: 'อย่าลืมกินยาเช้านะครับคุณตา'
  },
  { 
    id: '2', 
    title: 'ทานข้าวกลางวัน', 
    time: '12:00', 
    completed: false, 
    icon: '🍲' 
  },
  { 
    id: '3', 
    title: 'ออกกำลังกายเบาๆ', 
    time: '16:00', 
    completed: false, 
    icon: '💪' 
  },
];

const MEMORIES: MemoryPhoto[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    description: 'วันเกิดน้องเมย์ หลานสาวคนเล็ก ครบ 5 ขวบ',
    people: ['น้องเมย์', 'คุณตา'],
    date: '12 มกราคม 2567'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    description: 'ไปเที่ยวทะเลบางแสนกับลูกๆ สนุกมาก',
    people: ['คุณพ่อ', 'คุณแม่', 'พี่ต้น'],
    date: 'สงกรานต์ ปีที่แล้ว'
  }
];

const INITIAL_USER_DATA: UserData = {
  name: "คุณตา",
  surname: "ใจดี",
  condition: "ความดันสูง", // Mapped from 'notes'
  bloodType: "O",
  address: "กรุงเทพ",
  photoUrl: "https://ui-avatars.com/api/?name=Grandpa&background=random&size=200"
};

const INITIAL_CONTACTS: Contact[] = [
  { 
    id: 'c1', 
    name: 'ลูกชาย', 
    phoneNumber: '0812345678', 
    relation: 'ลูก',
    imageUrl: 'https://ui-avatars.com/api/?name=Son&background=random'
  },
  { 
    id: 'c2', 
    name: 'พยาบาล', 
    phoneNumber: '0899999999', 
    relation: 'พยาบาลดูแล',
    imageUrl: 'https://ui-avatars.com/api/?name=Nurse&background=random'
  },
];

// -------------------------------
// MAIN APP
// -------------------------------
export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [routines, setRoutines] = useState<RoutineTask[]>(INITIAL_ROUTINES);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [lastNotifiedMinute, setLastNotifiedMinute] = useState<string>('');

  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);

  // -------------------------------
  // Clock + Notifications
  // -------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

      if (timeStr !== lastNotifiedMinute) {
        routines.forEach((task) => {
          if (task.time === timeStr && !task.completed) {
            sendNotification(
              `ถึงเวลา: ${task.title}`,
              task.voiceMessageText || 'อย่าลืมทำกิจวัตรประจำวันนะครับ'
            );
          }
        });
        setLastNotifiedMinute(timeStr);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [routines, lastNotifiedMinute]);

  // -------------------------------
  // HANDLERS
  // -------------------------------
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView(AppView.HOME);
  };

  const toggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdateUser = (newData: UserData) => {
    setUserData(newData);
  };

  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // -------------------------------
  // RENDER VIEW
  // -------------------------------
  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="p-4 pb-24 space-y-6">
            <div className="flex flex-col items-center mt-4 mb-6">
              <Logo size="lg" />
              <h1 className="text-2xl font-bold mt-4 text-center text-blue-900">
                ระบบดูแลผู้สูงอายุ
              </h1>
              <p className="text-gray-500">{currentTime.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long'})}</p>
            </div>
            
            <HealthTipsCard condition={userData.condition} name={userData.name} />
            
            <div className="pt-4">
              <RoutineList
                tasks={routines}
                onToggle={toggleRoutine}
              />
            </div>
          </div>
        );

      case AppView.MEMORIES: // Mapped from ALBUM
        return <PhotoAlbum memories={MEMORIES} />;

      case AppView.CHAT:
        return <ChatCompanion />;

      case AppView.EMERGENCY:
        return (
          <EmergencyView
            contacts={contacts}
            userData={userData}
          />
        );

      case AppView.SETTINGS:
        return (
          <SettingsView
            userData={userData}
            onUpdateUser={handleUpdateUser}
            contacts={contacts}
            onAddContact={handleAddContact}
            onDeleteContact={handleDeleteContact}
            onBack={() => setCurrentView(AppView.HOME)}
          />
        );
      
      case AppView.PROFILE:
         return (
          <SettingsView
            userData={userData}
            onUpdateUser={handleUpdateUser}
            contacts={contacts}
            onAddContact={handleAddContact}
            onDeleteContact={handleDeleteContact}
            variant="profile"
          />
        );

      default:
        return <div>Unknown View</div>;
    }
  };

  // -------------------------------
  // RETURN MAIN UI
  // -------------------------------
  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {renderView()}
      </main>
      
      {/* Show NavBar only on main views */}
      {currentView !== AppView.SETTINGS && (
        <NavBar
          currentView={currentView}
          setView={setCurrentView}
        />
      )}
    </div>
  );
}
