import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskDraft, TaskPriority, TaskStatus } from '../types/task';
import { ThemeName } from '../theme/colors';

export const THEME_STORAGE_KEY = '@campus-planner/theme';
export const TASKS_STORAGE_KEY = '@campus-planner/tasks';
export const DRAFT_STORAGE_KEY = '@campus-planner/new-task-draft';

interface StoredTask {
    id: string;
    title: string;
    subject: string;
    priority: TaskPriority;
    isCompleted?: boolean;
    status?: TaskStatus;
    createdAt?: string;
    dueDate?: string;
    description?: string;
}

function normalizeTask(raw: StoredTask): Task {
    const task: Task = {
        id: raw.id,
        title: raw.title,
        subject: raw.subject,
        priority: raw.priority,
        status: raw.status ?? (raw.isCompleted ? 'completed' : 'active'),
        createdAt: raw.createdAt ?? new Date().toISOString(),
    };
    if (raw.dueDate) task.dueDate = raw.dueDate;
    if (raw.description) task.description = raw.description;
    return task;
}

export async function loadTasks(): Promise<Task[] | null> {
    try {
        const value = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (!value) return null;
        const parsed: unknown = JSON.parse(value);
        if (!Array.isArray(parsed)) return null;
        return (parsed as StoredTask[]).map(normalizeTask);
    } catch {
        return null;
    }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export async function loadTheme(): Promise<ThemeName> {
    try {
        const value = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        return value === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
}

export async function saveTheme(theme: ThemeName): Promise<void> {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
}

export async function loadDraft(): Promise<TaskDraft | null> {
    try {
        const raw = await AsyncStorage.getItem(DRAFT_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<TaskDraft>;
        return {
            title: parsed.title ?? '',
            subject: parsed.subject ?? '',
            priority: parsed.priority ?? 'medium',
            dueDate: parsed.dueDate ?? '',
            description: parsed.description ?? '',
        };
    } catch {
        return null;
    }
}

export async function saveDraft(draft: TaskDraft): Promise<void> {
    await AsyncStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export async function removeDraft(): Promise<void> {
    await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
}