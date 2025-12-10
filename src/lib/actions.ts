'use server';

import { suggestSchedule } from '@/ai/flows/ai-suggested-schedule';
import type { SuggestScheduleInput } from '@/ai/flows/ai-suggested-schedule';

export async function getScheduleSuggestion(
  prevState: any,
  formData: FormData
) {
  const taskDetails = formData.get('taskDetails') as string;
  const calendarData = formData.get('calendarData') as string;
  const classSchedule = formData.get('classSchedule') as string;
  const workSchedule =formData.get('workSchedule') as string;

  if (!taskDetails || !calendarData || !classSchedule || !workSchedule) {
    return {
      message: 'All fields are required.',
      suggestion: null,
      reasoning: null,
    };
  }

  const input: SuggestScheduleInput = {
    taskDetails,
    calendarData,
    classSchedule,
    workSchedule,
  };

  try {
    const result = await suggestSchedule(input);
    const suggestedSchedule = JSON.parse(result.suggestedSchedule);

    return {
      message: 'Suggestion received.',
      suggestion: suggestedSchedule,
      reasoning: result.reasoning,
    };
  } catch (error) {
    console.error('Error getting schedule suggestion:', error);
    return {
      message:
        'An error occurred while generating the schedule. Please try again.',
      suggestion: null,
      reasoning: null,
    };
  }
}
