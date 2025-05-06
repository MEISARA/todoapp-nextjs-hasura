export type Todo = {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'normal';
  status: 'todo' | 'done';
};
