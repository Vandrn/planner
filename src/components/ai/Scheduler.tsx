'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { getScheduleSuggestion } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Calendar, Clock, Lightbulb, Loader2 } from 'lucide-react';
import type { Event } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface SchedulerProps {
  calendarData: Event[];
  classSchedule: any[];
  workSchedule: any[];
}

const initialState = {
  message: null,
  suggestion: null,
  reasoning: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Get Suggestion
        </>
      )}
    </Button>
  );
}

export function Scheduler({ calendarData, classSchedule, workSchedule }: SchedulerProps) {
  const [state, formAction] = useFormState(getScheduleSuggestion, initialState);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI Scheduling Assistant</CardTitle>
          <CardDescription>
            Describe the task you want to schedule, and our AI will find the best time for you.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taskDetails">Task to Schedule</Label>
              <Textarea
                id="taskDetails"
                name="taskDetails"
                placeholder="e.g., 'Study for my History midterm for 2 hours. It is very important.' or 'Go for a 30-minute run.'"
                required
                rows={4}
              />
            </div>
            <input type="hidden" name="calendarData" value={JSON.stringify(calendarData)} />
            <input type="hidden" name="classSchedule" value={JSON.stringify(classSchedule)} />
            <input type="hidden" name="workSchedule" value={JSON.stringify(workSchedule)} />
            <div className='text-xs text-muted-foreground'>
              Note: Your current calendar, class, and work schedules are automatically included for context.
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-8">
        {state.suggestion || state.reasoning ? (
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">AI Suggestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {state.suggestion && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2" /> Suggested Time</h3>
                  <div className="p-4 bg-background rounded-lg border">
                    <p className="font-bold text-lg">
                      {formatTime(state.suggestion.startTime)} - {formatTime(state.suggestion.endTime)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Reminder at: {formatTime(state.suggestion.reminderTime)}
                    </p>
                  </div>
                </div>
              )}
              {state.reasoning && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center"><Lightbulb className="w-4 h-4 mr-2" /> Reasoning</h3>
                  <p className="p-4 bg-background rounded-lg border text-sm text-foreground/80">{state.reasoning}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
             <BrainCircuit className="w-16 h-16 text-muted-foreground/50 mb-4" />
             <h3 className="text-lg font-semibold text-muted-foreground">Your schedule suggestion will appear here.</h3>
             <p className="text-sm text-muted-foreground/80">Just fill out the form and let the AI do the work!</p>
          </div>
        )}

        {state.message && state.message !== 'Suggestion received.' && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
