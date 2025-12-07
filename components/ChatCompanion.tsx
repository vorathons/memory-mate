import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateCompanionResponse } from '../services/vorathonService';

// Add type definition for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const ChatCompanion: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'สวัสดีครับ ผม Vorathon วันนี้คุณตารู้สึกอย่างไรบ้าง เล่าให้ฟังได้นะครับ',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'th-TH';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev + transcript);
      };
    }
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.9; // Slower for elderly
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleListening = () => {
    if (!recognitionRef.current) {
      alert("อุปกรณ์ของท่านไม่รองรับการสั่งงานด้วยเสียง");
      return;
    }
    if (isListening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // แปลง role ให้ตรงกับ type ของ generateCompanionResponse
      const history: { role: "user" | "assistant"; content: string }[] = messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));

      const responseText = await generateCompanionResponse(userMsg.text, history);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);

      if (autoSpeak) speakText(responseText);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      <header className="bg-white p-4 shadow-sm z-10 sticky top-0 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Vorathon</h1>
            <p className="text-xs text-green-600 flex items-center font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              ออนไลน์
            </p>
          </div>
        </div>
        <button 
          onClick={() => setAutoSpeak(!autoSpeak)}
          className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
            autoSpeak ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-400 border-gray-200'
          }`}
        >
          {autoSpeak ? '🔊 อ่านเสียง' : '🔇 ปิดเสียง'}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
              <div className={`p-4 rounded-3xl text-lg leading-relaxed shadow-sm relative group ${
                msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
              }`}>
                {msg.text}
                {msg.sender === 'ai' && (
                  <button 
                    onClick={() => speakText(msg.text)}
                    className="absolute -right-10 top-2 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Play message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              <span className="text-xs text-gray-400 mt-1 px-2">
                {msg.timestamp.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl rounded-bl-none shadow-sm border border-gray-100">
              <div className="flex space-x-2 items-center text-gray-500">
                <span className="text-sm">กำลังคิด...</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-2">
          {/* Microphone Button */}
          <button
            onClick={handleToggleListening}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-100' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
            title="กดเพื่อพูด"
          >
            {isListening ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="flex-1 bg-gray-100 rounded-3xl flex items-center px-4 py-2 border-2 border-transparent focus-within:border-blue-300 transition-colors">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isListening ? "กำลังฟัง..." : "พิมพ์หรือกดไมค์เพื่อพูด..."}
              className="flex-1 bg-transparent border-none focus:outline-none text-lg py-1"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md ${
              !inputText.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </div>
        {isListening && (
          <p className="text-center text-xs text-red-500 mt-2 font-medium animate-pulse">กำลังฟังเสียงของคุณตา...</p>
        )}
      </div>
    </div>
  );
};

export default ChatCompanion;
