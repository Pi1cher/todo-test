export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    createdAt: Date;
}

export type FilterType = 'all' | 'completed' | 'active';