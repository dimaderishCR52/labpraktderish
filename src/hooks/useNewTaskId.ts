import { useEffect, useRef, useState } from 'react';
import { Task } from '../types/task';

export function useNewTaskId(tasks: Task[]): string | null {
    const knownIds = useRef<Set<string>>(new Set(tasks.map((task) => task.id)));
    const [newId, setNewId] = useState<string | null>(null);

    useEffect(() => {
        const fresh = tasks.find((task) => !knownIds.current.has(task.id));
        knownIds.current = new Set(tasks.map((task) => task.id));
        if (!fresh) return;

        setNewId(fresh.id);
        const timer = setTimeout(() => setNewId(null), 1500);
        return () => clearTimeout(timer);
    }, [tasks]);

    return newId;
}