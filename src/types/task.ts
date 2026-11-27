export type TaskStatus = 'active' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskFilter = 'all' | TaskStatus;
export type TaskSort = 'newest' | 'priority';

export interface Task {
    id: string;
    title: string;
    subject: string;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: string;
    dueDate?: string;
    description?: string;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'status'>;

export type UpdateTaskInput = Partial<CreateTaskInput> & {
    status?: TaskStatus;
};

export interface TaskDraft {
    title: string;
    subject: string;
    priority: TaskPriority;
    dueDate: string;
    description: string;
}