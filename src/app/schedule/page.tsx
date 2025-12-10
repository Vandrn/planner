import { Scheduler } from '@/components/ai/Scheduler';
import { getCategories, getEvents } from '@/lib/data';

export default function SchedulePage() {
  const events = getEvents();
  const categories = getCategories();

  // Mock data for class and work schedules as requested
  const classSchedule = [
    { day: 'Monday', time: '13:00-14:30', name: 'Calculus II Lecture' },
    { day: 'Wednesday', time: '13:00-14:30', name: 'Calculus II Lecture' },
    { day: 'Friday', time: '13:00-14:30', name: 'Calculus II Recitation' },
    { day: 'Tuesday', time: '10:00-11:30', name: 'History of Art' },
    { day: 'Thursday', time: '10:00-11:30', name: 'History of Art' },
  ];

  const workSchedule = [
    { day: 'Tuesday', time: '17:00-21:00', name: 'Part-time job' },
    { day: 'Thursday', time: '17:00-21:00', name: 'Part-time job' },
    { day: 'Saturday', time: '09:00-17:00', name: 'Part-time job' },
  ];

  return (
    <div className="container mx-auto py-6">
      <Scheduler
        calendarData={events}
        classSchedule={classSchedule}
        workSchedule={workSchedule}
      />
    </div>
  );
}
