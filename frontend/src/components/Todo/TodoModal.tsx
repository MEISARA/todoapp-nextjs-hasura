import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO, UPDATE_TODO } from '../../graphql/mutations/todos';
import { Todo } from '../../types';

type Props = {
  onClose: () => void;
  initialData?: Todo;
  refetch: () => void;
};

export default function TodoModal({ onClose, initialData, refetch }: Props) {
  const isEditMode = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<'high' | 'normal'>(initialData?.priority || 'normal');
  const [status, setStatus] = useState<'todo' | 'done'>(initialData?.status || 'todo');

  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      title,
      description,
      priority,
      status,
    };

    try {
      if (isEditMode && initialData?.id) {
        await updateTodo({
          variables: {
            id: initialData.id,
            ...variables,
          },
        });
      } else {
        await addTodo({ variables });
      }

      await refetch();
      onClose();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <label className="block font-medium mb-1">Priority</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === 'high'}
                  onChange={() => setPriority('high')}
                />
                <span className="ml-1">High</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="normal"
                  checked={priority === 'normal'}
                  onChange={() => setPriority('normal')}
                />
                <span className="ml-1">Normal</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Status</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="todo"
                  checked={status === 'todo'}
                  onChange={() => setStatus('todo')}
                />
                <span className="ml-1">Todo</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="done"
                  checked={status === 'done'}
                  onChange={() => setStatus('done')}
                />
                <span className="ml-1">Done</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
