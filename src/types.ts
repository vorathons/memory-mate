export interface Contact {
  id: string;
  name: string;
  relation: string;
  phoneNumber: string;
  imageUrl: string;
}

export interface MemoryPhoto {
  id: string;
  imageUrl: string;
  description: string;
  people: string[];
  date?: string;
}

export interface RoutineTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  icon: string;
  familyPhotoUrl?: string;
  voiceNoteUrl?: string;
  voiceMessageText?: string;
  relationshipLabel?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export enum AppView {
  HOME = 'HOME',
  MEMORIES = 'MEMORIES',
  CHAT = 'CHAT',
  EMERGENCY = 'EMERGENCY',
  SETTINGS = 'SETTINGS',
  PROFILE = 'PROFILE'
}

export type UserRole = 'PATIENT' | 'CAREGIVER' | null;

export interface UserData {
  name: string;
  surname: string;
  condition: string;
  bloodType: string;
  address: string;
  photoUrl?: string;
}