import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CreateTaskInput, Task, UpdateTaskInput } from '../types/task';
import { initialTasks } from '../data/initialTasks';
import { loadTasks, saveTasks } from '../storage/storage';
import { buildTask } from '../utils/task';

export interface TasksContextValue {
    tasks: Task[];
    isReady: boolean;
    createTask: (input: CreateTaskInput) => void;
    updateTask: (id: string, input: UpdateTaskInput) => void;
    removeTask: (id: string) => void;
    toggleTaskStatus: (id: string) => void;
    getTaskById: (id: string | undefined) => Task | undefined;
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let active = true;
        loadTasks().then((saved) => {
            if (!active) return;
            setTasks(saved ?? initialTasks);
            setIsReady(true);
        });
        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (isReady) saveTasks(tasks).catch(() => {});
    }, [tasks, isReady]);

    const createTask = useCallback((input: CreateTaskInput) => {
        setTasks((current) => [buildTask(input), ...current]);
    }, []);

    const updateTask = useCallback((id: string, input: UpdateTaskInput) => {
        setTasks((current) =>
            current.map((task) => (task.id === id ? { ...task, ...input } : task)),
        );
    }, []);

    const removeTask = useCallback((id: string) => {
        setTasks((current) => current.filter((task) => task.id !== id));
    }, []);

    const toggleTaskStatus = useCallback((id: string) => {
        setTasks((current) =>
            current.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === 'completed' ? 'active' : 'completed' }
                    : task,
            ),
        );
    }, []);

    const getTaskById = useCallback(
        (id: string | undefined) => tasks.find((task) => task.id === id),
        [tasks],
    );

    const value = useMemo<TasksContextValue>(
        () => ({ tasks, isReady, createTask, updateTask, removeTask, toggleTaskStatus, getTaskById }),
        [tasks, isReady, createTask, updateTask, removeTask, toggleTaskStatus, getTaskById],
    );

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}