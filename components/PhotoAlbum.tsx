import React from 'react';
import { MemoryPhoto } from '../types';

interface PhotoAlbumProps {
  memories: MemoryPhoto[];
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ memories }) => {
  return (
    <div className="space-y-6 pb-24">
      <header className="px-4 pt-6">
        <h1 className="text-3xl font-bold text-gray-900">อัลบั้มความทรงจำ</h1>
        <p className="text-gray-500 mt-2">ภาพแห่งความสุขของคุณและครอบครัว</p>
      </header>

      <div className="grid grid-cols-1 gap-6 px-4">
        {memories.map((memory) => (
          <div key={memory.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
            <div className="relative h-64 w-full bg-gray-200">
              <img 
                src={memory.imageUrl} 
                alt={memory.description} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                 <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {memory.people.join(', ')}
                 </span>
              </div>
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                {memory.description}
              </p>
              {memory.date && (
                <p className="text-gray-400 text-sm mt-3">
                  {memory.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoAlbum;