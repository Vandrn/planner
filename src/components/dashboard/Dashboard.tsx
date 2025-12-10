'use client';

import type { Category, Event } from '@/lib/types';
import { useState, useMemo } from 'react';
import { add, format, isSameDay, startOfToday } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { EventDialog } from './EventDialog';
import { UpcomingEvents } from './UpcomingEvents';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getFullCategories } from '@/lib/data';
import {
  Briefcase,
  BookOpen,
  Users,
  GlassWater,
  User,
  Dumbbell,
} from 'lucide-react';

const iconMap = {
  Briefcase,
  BookOpen,
  Users,
  GlassWater,
  User,
  Dumbbell,
};

interface DashboardProps {
  initialEvents: Event[];
  initialCategories: Category[];
}

export function Dashboard({ initialEvents, initialCategories }: DashboardProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  
  const categories = useMemo(() => {
    const fullCategories = getFullCategories();
    return initialCategories.map(c => {
      const fullCategory = fullCategories.find(fc => fc.id === c.id);
      return {
        ...c,
        icon: fullCategory ? (iconMap[fullCategory.icon as keyof typeof iconMap] || User) : User
      }
    })
  }, [initialCategories]);

  const [selectedDay, setSelectedDay] = useState<Date>(startOfToday());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(
    undefined
  );
  const [visibleCategories, setVisibleCategories] = useState<
    Record<string, boolean>
  >(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );

  const handleAddOrUpdateEvent = (event: Event) => {
    setEvents((prevEvents) => {
      const existingEventIndex = prevEvents.findIndex((e) => e.id === event.id);
      if (existingEventIndex > -1) {
        const newEvents = [...prevEvents];
        newEvents[existingEventIndex] = event;
        return newEvents;
      }
      return [...prevEvents, event];
    });
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
  };

  const handleToggleComplete = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === eventId ? { ...e, completed: !e.completed } : e
      )
    );
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingEvent(undefined);
  };

  const filteredEvents = events.filter((event) =>
    visibleCategories[event.categoryId]
  );
  const eventsOnSelectedDay = filteredEvents.filter((event) =>
    isSameDay(new Date(event.date), selectedDay)
  );

  const eventDays = filteredEvents.map((event) => new Date(event.date));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-2xl">
              My Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category.id}
                      checked={visibleCategories[category.id]}
                      onCheckedChange={(checked) =>
                        setVisibleCategories((prev) => ({
                          ...prev,
                          [category.id]: !!checked,
                        }))
                      }
                    >
                      {category.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !selectedDay && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDay ? (
                      format(selectedDay, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDay}
                    onSelect={(day) => setSelectedDay(day || startOfToday())}
                    initialFocus
                    modifiers={{ hasEvent: eventDays }}
                    modifiersClassNames={{
                      hasEvent: 'day-with-event',
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-2 md:p-4">
            <Calendar
              mode="single"
              selected={selectedDay}
              onSelect={(day) => setSelectedDay(day || startOfToday())}
              className="hidden rounded-md sm:flex"
              modifiers={{ hasEvent: eventDays }}
              modifiersClassNames={{
                hasEvent: 'day-with-event',
              }}
            />
            <style>{`.day-with-event { position: relative; } .day-with-event::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background-color: hsl(var(--primary)); }`}</style>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Button
          size="lg"
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusCircle className="mr-2" />
          Add New Event
        </Button>
        <UpcomingEvents
          selectedDay={selectedDay}
          events={eventsOnSelectedDay}
          categories={categories}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onToggleComplete={handleToggleComplete}
        />
      </div>

      <EventDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleAddOrUpdateEvent}
        event={editingEvent}
        categories={categories}
      />
    </div>
  );
}