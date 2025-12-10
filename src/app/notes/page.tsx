import { Notes } from '@/components/notes/Notes';
import { getNotes } from '@/lib/data';

export default function NotesPage() {
  const notes = getNotes();

  return <Notes initialNotes={notes} />;
}
