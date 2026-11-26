import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Task, TaskPriority } from '../types/task';
import { loadTasks, loadTheme, saveTasks, saveTheme } from '../storage/storage';

type ThemeType = 'light' | 'dark';

interface AppContextValue {
    tasks: Task[];
    theme: ThemeType;
    isReady: boolean;
    addTask: (title: string, subject: string, priority: TaskPriority) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    toggleTask: (id: string) => void;
    setTheme: (theme: ThemeType) => void;
}

const initialTasks: Task[] = [
    { id: '1', title: 'Подготовить лабораторную работу №1', subject: 'Программирование', priority: 'high', isCompleted: false },
    { id: '2', title: 'Повторить тему по сетям', subject: 'Компьютерные сети', priority: 'medium', isCompleted: false },
    { id: '3', title: 'Сделать презентацию', subject: 'Информационные технологии', priority: 'low', isCompleted: true },
];

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [theme, setThemeState] = useState<ThemeType>('light');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let active = true;
        async function loadInitialData() {
            const [savedTasks, savedTheme] = await Promise.all([loadTasks(), loadTheme()]);
            if (!active) return;
            if (savedTasks) setTasks(savedTasks);
            else await saveTasks(initialTasks);
            setThemeState(savedTheme);
            setIsReady(true);
        }
        loadInitialData();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (isReady) saveTasks(tasks).catch(() => {});
    }, [tasks, isReady]);

    const addTask = useCallback(async (title: string, subject: string, priority: TaskPriority) => {
        const newTask: Task = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title, subject, priority, isCompleted: false };
        setTasks((current) => [newTask, ...current]);
    }, []);

    const updateTask = useCallback(async (updatedTask: Task) => {
        setTasks((current) => current.map((task) => task.id === updatedTask.id ? updatedTask : task));
    }, []);

    const toggleTask = useCallback((id: string) => {
        setTasks((current) => current.map((task) => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
    }, []);

    const setTheme = useCallback((newTheme: ThemeType) => {
        setThemeState(newTheme);
        saveTheme(newTheme).catch(() => {});
    }, []);

    const value = useMemo(() => ({ tasks, theme, isReady, addTask, updateTask, toggleTask, setTheme }), [tasks, theme, isReady, addTask, updateTask, toggleTask, setTheme]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp должен использоваться внутри AppProvider');
    return context;
}
