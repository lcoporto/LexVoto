export type ViewType = 'dashboard' | 'consultancy' | 'ads' | 'accountability' | 'guide' | 'settings';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ExpenseRecord {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: 'valid' | 'warning' | 'invalid';
  note?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  category: string;
}
