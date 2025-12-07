import React from 'react';
import { RoutineTask } from '../types';

interface RoutineListProps {
  tasks: RoutineTask[];
  onToggle: (id: string) => void;
}

const RoutineList: React.FC<RoutineListProps> = ({ tasks, onToggle }) => {
  
  const playVoice = (e: React.MouseEvent, task: RoutineTask) => {
    e.stopPropagation(); // Prevent toggling the task when clicking play
    
    // Simulate playing audio if no real file is present (using TTS for demo)
    // In a real app, this would play `task.voiceNoteUrl`
    const textToSay = task.voiceMessageText || `ถึงเวลา ${task.title} แล้วนะคะ`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSay);
      utterance.lang = 'th-TH';
      utterance.rate = 0.9; // Slower for elderly
      window.speechSynthesis.speak(utterance);
    } else {
      alert("อุปกรณ์นี้ไม่รองรับเสียงพูด");
    }
  };

  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-bold text-gray-800 px-1 flex items-center">
        <span className="mr-2">📅</span> สิ่งที่ต้องทำวันนี้
      </h2>
      
      {tasks.map((task) => {
        const hasFamilyContent = !!task.familyPhotoUrl;

        return (
          <div
            key={task.id}
            onClick={() => onToggle(task.id)}
            className={`relative rounded-3xl shadow-sm border transition-all duration-300 cursor-pointer overflow-hidden ${
              task.completed
                ? 'bg-green-50 border-green-200 opacity-80 grayscale-[0.5]'
                : 'bg-white border-gray-100 hover:border-blue-300 shadow-md'
            }`}
          >
            {/* Special Layout for Family Reminders */}
            {hasFamilyContent && !task.completed && (
              <div className="w-full h-48 relative bg-gray-100">
                <img 
                  src={task.familyPhotoUrl} 
                  alt="Family Reminder" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                   <div className="text-white">
                      <p className="text-sm font-light text-yellow-300 mb-1">
                        📢 เสียงจาก: {task.relationshipLabel || 'ครอบครัว'}
                      </p>
                      <h3 className="text-2xl font-bold leading-tight">{task.title}</h3>
                   </div>
                </div>
                {/* Play Button Overlay */}
                <button 
                  onClick={(e) => playVoice(e, task)}
                  className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-blue-600 shadow-lg active:scale-90 transition-transform animate-bounce"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {/* Standard List / Completed View */}
            <div className={`flex items-center p-4 ${hasFamilyContent && !task.completed ? 'bg-blue-50' : ''}`}>
               {(!hasFamilyContent || task.completed) && (
                 <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-3xl mr-4 ${
                  task.completed ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {task.icon}
                </div>
               )}
              
              <div className="flex-grow">
                {(!hasFamilyContent || task.completed) && (
                  <h3 className={`text-xl font-bold mb-1 ${task.completed ? 'text-green-800 line-through decoration-2' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                )}
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-medium">{task.time}</span>
                  {hasFamilyContent && task.completed && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">มีเสียงเตือน</span>
                  )}
                </div>
                
                {hasFamilyContent && !task.completed && (
                   <p className="text-blue-600 text-sm mt-1 font-medium">👇 แตะเพื่อทำรายการให้เสร็จ</p>
                )}
              </div>

              <div className="flex-shrink-0 ml-2">
                {task.completed ? (
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform scale-110">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 border-4 border-gray-200 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoutineList;