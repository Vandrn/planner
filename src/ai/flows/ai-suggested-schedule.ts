'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal times to schedule tasks and study sessions, 
 * considering existing calendar, class schedule, and work commitments.
 *
 * @exports suggestSchedule - An asynchronous function that takes scheduling information as input and returns suggested times.
 * @exports SuggestScheduleInput - The input type for the suggestSchedule function, defining the structure of the scheduling information.
 * @exports SuggestScheduleOutput - The output type for the suggestSchedule function, defining the structure of the suggested schedule.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestScheduleInputSchema = z.object({
  calendarData: z.string().describe('Existing calendar data in JSON format.'),
  classSchedule: z.string().describe('Class schedule information in JSON format.'),
  workSchedule: z.string().describe('Work schedule information in JSON format.'),
  taskDetails: z.string().describe('Details of the task to be scheduled, including duration and priority.'),
});

export type SuggestScheduleInput = z.infer<typeof SuggestScheduleInputSchema>;

const SuggestScheduleOutputSchema = z.object({
  suggestedSchedule: z.string().describe('Suggested schedule in JSON format, including start time, end time, and reminders.'),
  reasoning: z.string().describe('Reasoning for why the suggested schedule is optimal.'),
});

export type SuggestScheduleOutput = z.infer<typeof SuggestScheduleOutputSchema>;

export async function suggestSchedule(input: SuggestScheduleInput): Promise<SuggestScheduleOutput> {
  return suggestScheduleFlow(input);
}

const suggestSchedulePrompt = ai.definePrompt({
  name: 'suggestSchedulePrompt',
  input: {schema: SuggestScheduleInputSchema},
  output: {schema: SuggestScheduleOutputSchema},
  prompt: `You are an AI scheduling assistant that helps students and workers optimize their schedules.

  Analyze the following information to suggest the best time to schedule a task:

  Existing Calendar Data: {{{calendarData}}}
  Class Schedule: {{{classSchedule}}}
  Work Schedule: {{{workSchedule}}}
  Task Details: {{{taskDetails}}}

  Consider the task's duration, priority, and any potential conflicts with existing commitments. Provide a suggested schedule with a specific start and end time, as well as reasoning for why the suggested time is optimal.  Also suggest when to remind the user of the appointment.

  Ensure that the suggested schedule is realistic and takes into account the user's need for breaks and rest.
  Output the suggested schedule in JSON format. Include the keys 'startTime', 'endTime' and 'reminderTime'.`,
});

const suggestScheduleFlow = ai.defineFlow(
  {
    name: 'suggestScheduleFlow',
    inputSchema: SuggestScheduleInputSchema,
    outputSchema: SuggestScheduleOutputSchema,
  },
  async input => {
    const {output} = await suggestSchedulePrompt(input);
    return output!;
  }
);
