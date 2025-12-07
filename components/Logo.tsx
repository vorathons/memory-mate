import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-40 h-40'
  };

  const textSize = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} bg-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden border-4 border-blue-100`}>
        <div className="text-center transform translate-y-1">
            {/* Friendly Brain Emoji Composition */}
            <span className={`${textSize[size]} block`}>🧠</span>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1 ml-3 text-red-400 animate-pulse text-lg">❤️</span>
        </div>
      </div>
      <h1 className={`mt-4 font-bold text-blue-800 ${size === 'lg' ? 'text-3xl' : 'text-xl'} tracking-wide`}>
        Memory Mate
      </h1>
      <p className="text-gray-400 text-sm font-light">เพื่อนช่วยจำ & กำลังใจ</p>
    </div>
  );
};

export default Logo;