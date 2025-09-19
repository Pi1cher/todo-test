import { useTodoStore } from '../../store/todoStore';
import { FilterType } from '../../types/todo';

export const TodoFilters = () => {
    const { filter, setFilter, todos } = useTodoStore();

    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = todos.filter(todo => !todo.completed).length;

    const filters: { key: FilterType; label: string; count?: number }[] = [
        { key: 'all', label: 'All', count: todos.length },
        { key: 'active', label: 'Active', count: activeCount },
        { key: 'completed', label: 'Completed', count: completedCount }
    ];

    return (
        <div className="flex space-x-1">
            {filters.map(({ key, label, count }) => (
                <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        filter === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {label} ({count})
                </button>
            ))}
        </div>
    );
};