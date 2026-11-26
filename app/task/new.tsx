import React from 'react';
import { router } from 'expo-router';
import TaskForm from '../../src/components/task/TaskForm';
import { useTasks } from '../../src/hooks/useTasks';
import { CreateTaskInput } from '../../src/types/task';

export default function NewTaskScreen() {
    const { createTask } = useTasks();

    const handleSave = (input: CreateTaskInput) => {
        createTask(input);
        router.back();
    };

    return <TaskForm onSave={handleSave} />;
}