import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, TOGGLE_TODO_STATUS } from '../../graphql/mutations/todos';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  refetch: () => void;
};

const priorityColors: Record<Todo['priority'] | 'done', string> = {
  high: 'bg-todo-high',
  normal: 'bg-todo-normal',
  done: 'bg-todo-done',
};

export default function TodoItem({ todo, onEdit, refetch }: Props) {
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [toggleStatus] = useMutation(TOGGLE_TODO_STATUS);

  const handleDelete = async () => {
    try {
      await deleteTodo({ variables: { id: todo.id } });
      await refetch();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = todo.status === 'done' ? 'todo' : 'done';
    try {
      await toggleStatus({ variables: { id: todo.id, status: newStatus } });
      await refetch();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const cardColor = todo.status === 'done' ? priorityColors['done'] : priorityColors[todo.priority];

  return (
    <div className={`relative p-4 rounded-lg shadow-md transition-all ${cardColor} group`}>
      <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="text-gray-100 hover:text-gray-300 hover:text-blue-700 mr-2 cursor-pointer"
          title="Edit"
        >
          <FaEdit className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-100 hover:text-gray-300 mr-2 cursor-pointer"
          title="Delete"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-white">
            {todo.priority === 'high' ? 'HIGH PRIORITY' : 'NORMAL PRIORITY'}
          </p>
          <h3 className="text-lg text-white font-semibold">{todo.title}</h3>
          <p className="text-base text-white">{todo.description}</p>
        </div>
        <input
          type="checkbox"
          checked={todo.status === 'done'}
          onChange={handleToggleStatus}
          className="w-5 h-5 mt-1 cursor-pointer"
        />
      </div>
    </div>
  );
}
