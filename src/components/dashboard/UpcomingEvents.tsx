'use client';

import type { Category, Event as EventType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, formatTime } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createElement } from 'react';

interface UpcomingEventsProps {
  selectedDay: Date;
  events: EventType[];
  categories: Category[];
  onEdit: (event: EventType) => void;
  onDelete: (eventId: string) => void;
  onToggleComplete: (eventId: string) => void;
}

const priorityMap = {
  low: 'outline',
  medium: 'secondary',
  high: 'default',
};

const priorityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function UpcomingEvents({
  selectedDay,
  events,
  categories,
  onEdit,
  onDelete,
  onToggleComplete,
}: UpcomingEventsProps) {
  const sortedEvents = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {format(selectedDay, 'MMMM d, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {sortedEvents.length > 0 ? (
            <ul className="space-y-4">
              {sortedEvents.map((event) => {
                const category = categoryMap.get(event.categoryId);
                const IconComponent = category?.icon as React.ElementType;
                return (
                  <li
                    key={event.id}
                    className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Checkbox
                        id={`event-${event.id}`}
                        checked={event.completed}
                        onCheckedChange={() => onToggleComplete(event.id)}
                        className="mt-1"
                        aria-label={`Mark ${event.title} as complete`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                         <span
                           className={cn(
                             'font-semibold',
                             event.completed && 'line-through text-muted-foreground'
                           )}
                         >
                           {event.title}
                         </span>
                         {category && IconComponent && (
                           <div className='flex items-center gap-2'>
                             <IconComponent
                               className={cn('h-4 w-4', category.color)}
                             />
                             <span className='text-sm text-muted-foreground'>{category.name}</span>
                           </div>
                         )}
                      </div>
                      <p
                        className={cn(
                          'text-sm text-muted-foreground',
                          event.completed && 'line-through'
                        )}
                      >
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </p>
                      {event.notes && (
                        <p className="text-sm text-muted-foreground/80 mt-1">{event.notes}</p>
                      )}
                      <Badge variant={priorityMap[event.priority]} className="mt-2 capitalize">
                        {priorityLabel[event.priority]}
                      </Badge>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => onEdit(event)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => onDelete(event.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <p>No events scheduled for this day.</p>
              <p className="text-sm">Enjoy your free time!</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}