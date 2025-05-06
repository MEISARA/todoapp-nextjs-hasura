import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../graphql/queries/todos';
import TodoItem from './TodoItem';
import TodoModal from './TodoModal';
import { FaPlus } from 'react-icons/fa';
import { Todo } from '../../types';

export default function TodoList() {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    );
  }, []);

  const handleAddClick = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos: {error.message}</p>;

  const todos: Todo[] = data?.todos || [];
  const todoTasks = todos.filter((t) => t.status !== 'done');
  const doneTasks = todos.filter((t) => t.status === 'done');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">{today}</div>
        <button
          className="flex flex-row items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition duration-200"
          onClick={handleAddClick}
        >
          <FaPlus className="mr-2" /> NEW TASK
        </button>
      </div>

      <hr className="my-6 border-gray-400" />

      <section>
        <h2 className="text-lg font-semibold mb-2">TODO TASKS</h2>
        <div className="space-y-3">
          {todoTasks.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} refetch={refetch} />
          ))}
        </div>
      </section>

      <hr className="my-6 border-gray-400" />

      <section>
        <h2 className="text-lg font-semibold mb-2">DONE TASKS</h2>
        <div className="space-y-3">
          {doneTasks.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} refetch={refetch} />
          ))}
        </div>
      </section>

      {modalOpen && (
        <TodoModal
          onClose={() => {
            setModalOpen(false);
            setEditingTodo(null);
          }}
          initialData={editingTodo || undefined}
          refetch={refetch}
        />
      )}
    </div>
  );
}
