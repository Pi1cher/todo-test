export const fetchTodosFromAPI = async () => {
    try {
        const response = await fetch('https://dummyjson.com/todos?limit=50');
        const data = await response.json();
        return data.todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};