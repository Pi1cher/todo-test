import { Todo } from '../../types/todo';
import { useTodoStore } from '../../store/todoStore';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
    const toggleTodo = useTodoStore(state => state.toggleTodo);

    return (
        <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    todo.completed
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                }`}
            >
                {todo.completed && (
                    <svg
                        className="w-3 h-3 text-white m-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>

            <div className="flex-1">
                <p className={`text-sm ${
                    todo.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-900'
                }`}>
                    {todo.todo}
                </p>
            </div>

            <span className={`px-2 py-1 rounded-full text-xs ${
                todo.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
            }`}>
        {todo.completed ? 'Completed' : 'Active'}
      </span>
        </div>
    );
};