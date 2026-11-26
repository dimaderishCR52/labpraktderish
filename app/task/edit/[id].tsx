import React from 'react';
import { router } from 'expo-router';
import TaskForm from '../../../src/components/task/TaskForm';
import EmptyState from '../../../src/components/ui/EmptyState';
import Screen from '../../../src/components/ui/Screen';
import { useTaskIdParam } from '../../../src/hooks/useTaskIdParam';
import { useTasks } from '../../../src/hooks/useTasks';
import { CreateTaskInput } from '../../../src/types/task';

export default function EditTaskScreen() {
    const id = useTaskIdParam();
    const { getTaskById, updateTask } = useTasks();
    const task = getTaskById(id);

    if (!task) {
        return (
            <Screen>
                <EmptyState
                    icon="❓"
                    title="Задача не найдена"
                    description="Вернитесь к списку и выберите существующую задачу."
                    actionLabel="Вернуться назад"
                    onAction={() => router.back()}
                />
            </Screen>
        );
    }

    const handleSave = (input: CreateTaskInput) => {
        updateTask(task.id, input);
        router.back();
    };

    return <TaskForm initialTask={task} onSave={handleSave} />;
}