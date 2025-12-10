import type { LucideIcon } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon | string; // Allow string for icon name
};

export type Event = {
  id: string;
  title: string;
  date: Date;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  categoryId: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  notes?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};