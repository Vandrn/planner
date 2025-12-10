import { Dashboard } from '@/components/dashboard/Dashboard';
import { getCategories, getEvents } from '@/lib/data';

export default function DashboardPage() {
  const events = getEvents();
  const categories = getCategories();

  return <Dashboard initialEvents={events} initialCategories={categories} />;
}