import React from 'react';
import { router } from 'expo-router';
import TaskForm from '../../src/components/task/TaskForm';
import { useTasks } from '../../src/hooks/useTasks';
import { CreateTaskInput } from '../../src/types/task';

export default function NewTaskScreen() {
    const { createTask } = useTasks();

    const handleSave = (input: CreateTaskInput) => {
        router.back();
        // Создаём после закрытия формы, чтобы появление карточки было видно на списке.
        setTimeout(() => createTask(input), 350);
    };

    return <TaskForm onSave={handleSave} />;
}