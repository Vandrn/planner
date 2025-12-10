import type { Category, Event, Note } from '@/lib/types';
import {
  Briefcase,
  BookOpen,
  Users,
  GlassWater,
  User,
  Dumbbell,
} from 'lucide-react';
import { addDays, startOfToday } from 'date-fns';

const today = startOfToday();

const categories: Category[] = [
  {
    id: 'work',
    name: 'Work',
    color: 'text-sky-500',
    icon: 'Briefcase',
  },
  {
    id: 'classes',
    name: 'Classes',
    color: 'text-amber-500',
    icon: 'BookOpen',
  },
  {
    id: 'extracurricular',
    name: 'Extracurricular',
    color: 'text-violet-500',
    icon: 'Users',
  },
  {
    id: 'social',
    name: 'Social',
    color: 'text-pink-500',
    icon: 'GlassWater',
  },
  {
    id: 'personal',
    name: 'Personal',
    color: 'text-green-500',
    icon: 'User',
  },
  {
    id: 'health',
    name: 'Health',
    color: 'text-red-500',
    icon: 'Dumbbell',
  },
];

const events: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: today,
    startTime: '10:00',
    endTime: '11:00',
    categoryId: 'work',
    priority: 'medium',
    completed: true,
    notes: 'Discuss Q3 project goals.',
  },
  {
    id: '2',
    title: 'Calculus II Lecture',
    date: today,
    startTime: '13:00',
    endTime: '14:30',
    categoryId: 'classes',
    priority: 'high',
    completed: false,
    notes: 'Chapter 5 review.',
  },
  {
    id: '3',
    title: 'Submit Project Proposal',
    date: today,
    startTime: '17:00',
    endTime: '17:30',
    categoryId: 'work',
    priority: 'high',
    completed: false,
  },
  {
    id: '4',
    title: 'Gym Session',
    date: addDays(today, 1),
    startTime: '08:00',
    endTime: '09:00',
    categoryId: 'health',
    priority: 'low',
    completed: false,
  },
  {
    id: '5',
    title: 'Dinner with friends',
    date: addDays(today, 1),
    startTime: '19:00',
    endTime: '21:00',
    categoryId: 'social',
    priority: 'medium',
    completed: false,
    notes: 'At The Italian Place',
  },
  {
    id: '6',
    title: 'History Midterm',
    date: addDays(today, 3),
    startTime: '11:00',
    endTime: '13:00',
    categoryId: 'classes',
    priority: 'high',
    completed: false,
  },
];

const notes: Note[] = [
  {
    id: '1',
    title: 'CHEM 101 Study Guide',
    content:
      'Chapter 1: Atomic Structure...\nChapter 2: Chemical Bonds...\nRemember to review periodic trends.',
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Book Club Ideas',
    content:
      'Next month\'s book: "Dune" by Frank Herbert or "The Three-Body Problem" by Cixin Liu.',
    createdAt: new Date('2023-10-25T15:30:00Z'),
  },
  {
    id: '3',
    title: 'Grocery List',
    content: '- Milk\n- Bread\n- Eggs\n- Avocado\n- Chicken Breast',
    createdAt: new Date('2023-10-27T09:00:00Z'),
  },
];

export function getEvents(): Event[] {
  return events;
}

export function getCategories(): Category[] {
  return categories.map(({ icon: _, ...rest }) => rest) as unknown as Category[];
}

export function getFullCategories(): Category[] {
  return categories;
}


export function getNotes(): Note[] {
  return notes;
}