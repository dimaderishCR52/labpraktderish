import React from 'react';
import { router } from 'expo-router';
import TaskForm from '../../src/components/TaskForm';
import { useApp } from '../../src/context/AppContext';

export default function NewTaskScreen() {
    const { addTask, theme } = useApp();

    const handleSave = async (title: string, subject: string, priority: 'low' | 'medium' | 'high') => {
        await addTask(title, subject, priority);
        router.back();
    };

    return <TaskForm theme={theme} onSave={handleSave} />;
}
