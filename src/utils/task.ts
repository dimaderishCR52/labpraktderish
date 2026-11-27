import {
    CreateTaskInput,
    Task,
    TaskFilter,
    TaskPriority,
    TaskSort,
    TaskStatus,
} from '../types/task';

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
    active: 'Активная',
    completed: 'Выполнено',
};

export const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: PRIORITY_LABELS.low },
    { value: 'medium', label: PRIORITY_LABELS.medium },
    { value: 'high', label: PRIORITY_LABELS.high },
];

export const FILTER_OPTIONS: { value: TaskFilter; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'completed', label: 'Выполненные' },
];

export const SORT_OPTIONS: { value: TaskSort; label: string }[] = [
    { value: 'newest', label: 'Сначала новые' },
    { value: 'priority', label: 'По приоритету' },
];

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
};

export interface TaskCounts {
    total: number;
    active: number;
    completed: number;
}

export function countTasks(tasks: Task[]): TaskCounts {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    return {
        total: tasks.length,
        completed,
        active: tasks.length - completed,
    };
}

export function sortByPriority(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]);
}

export function filterByStatus(tasks: Task[], filter: TaskFilter): Task[] {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
}

export function filterTasks(tasks: Task[], query: string): Task[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tasks;
    return tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(normalized) ||
            task.subject.toLowerCase().includes(normalized),
    );
}

export function isValidDateString(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}
export function formatDateForDisplay(iso: string): string {
    if (!isValidDateString(iso)) return iso;
    const [year, month, day] = iso.split('-');
    return `${day}.${month}.${year}`;
}

export function parseDisplayDate(value: string): string | null {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim());
    if (!match) return null;
    const iso = `${match[3]}-${match[2]}-${match[1]}`;
    return isValidDateString(iso) ? iso : null;
}

export function isOverdue(task: Task, now: Date = new Date()): boolean {
    if (!task.dueDate || task.status === 'completed') return false;
    if (!isValidDateString(task.dueDate)) return false;
    const endOfDay = new Date(`${task.dueDate}T23:59:59`);
    return now.getTime() > endOfDay.getTime();
}

export function createTaskId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function buildTask(input: CreateTaskInput, now: Date = new Date()): Task {
    return {
        ...input,
        id: createTaskId(),
        status: 'active',
        createdAt: now.toISOString(),
    };
}

export function clamp01(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.min(1, Math.max(0, value));
}

export function getCompletionRatio(tasks: Task[]): number {
    if (tasks.length === 0) return 0;
    return clamp01(countTasks(tasks).completed / tasks.length);
}