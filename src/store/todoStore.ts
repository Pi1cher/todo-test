import { create } from 'zustand';
import { Todo, FilterType } from '../types/todo';

interface TodoStore {
    todos: Todo[];
    filter: FilterType;
    searchQuery: string;
    loading: boolean;
    setTodos: (todos: Todo[]) => void;
    toggleTodo: (id: number) => void;
    setFilter: (filter: FilterType) => void;
    setSearchQuery: (query: string) => void;
    setLoading: (loading: boolean) => void;
    getFilteredTodos: () => Todo[];
}

export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    filter: 'all',
    searchQuery: '',
    loading: false,

    setTodos: (todos) => set({ todos }),

    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    })),

    setFilter: (filter) => set({ filter }),

    setSearchQuery: (searchQuery) => set({ searchQuery }),

    setLoading: (loading) => set({ loading }),

    getFilteredTodos: () => {
        const { todos, filter, searchQuery } = get();

        let filtered = todos;

        if (filter === 'completed') {
            filtered = filtered.filter(todo => todo.completed);
        } else if (filter === 'active') {
            filtered = filtered.filter(todo => !todo.completed);
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter(todo =>
                todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }
}));
