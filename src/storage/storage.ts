import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

export const THEME_STORAGE_KEY = '@campus-planner/theme';
export const TASKS_STORAGE_KEY = '@campus-planner/tasks';
export const DRAFT_STORAGE_KEY = '@campus-planner/new-task-draft';

export async function loadTasks(): Promise<Task[] | null> {
    try {
        const value = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        return value ? (JSON.parse(value) as Task[]) : null;
    } catch {
        return null;
    }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export async function loadTheme(): Promise<'light' | 'dark'> {
    try {
        const value = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        return value === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
}

export async function saveTheme(theme: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
}
