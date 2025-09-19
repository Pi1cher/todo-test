import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { useTodoStore } from '../../store/todoStore';
import { fetchTodosFromAPI } from '../../services/todoService';
import { TodoItem } from './TodoItem.tsx';
import { TodoFilters } from './TodoFilters';
import { SearchBar } from '../SearchBar';
import { Link } from 'react-router-dom';

export const TodoList = () => {
    const { user } = useAuthStore();
    const {
        todos,
        loading,
        setTodos,
        setLoading,
        getFilteredTodos
    } = useTodoStore();

    const filteredTodos = getFilteredTodos();

    useEffect(() => {
        const loadTodos = async () => {
            setLoading(true);
            const todosFromAPI = await fetchTodosFromAPI();
            setTodos(todosFromAPI);
            setLoading(false);
        };

        loadTodos();
    }, [setTodos, setLoading]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Welcome, {user?.displayName}!
                        </h1>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/user"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Todo List</h2>
                        <div className="space-y-4">
                            <SearchBar />
                            <TodoFilters />
                        </div>
                    </div>

                    <div className="p-6">
                        {filteredTodos.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                {todos.length === 0 ? 'Loading todos...' : 'No todos match your current filter.'}
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {filteredTodos.map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                            </div>
                        )}

                        <div className="mt-6 text-sm text-gray-500 text-center">
                            Showing {filteredTodos.length} of {todos.length} todos
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};