import React from 'react';
import { Alert, View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import TaskForm from '../../../src/components/TaskForm';
import { useApp } from '../../../src/context/AppContext';

export default function EditTaskScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { tasks, updateTask, theme } = useApp();
    const task = tasks.find((item) => item.id === id);

    if (!task) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text>Задача не найдена. Вернитесь к списку и выберите существующую задачу.</Text>
            </View>
        );
    }

    const handleSave = async (title: string, subject: string, priority: 'low' | 'medium' | 'high') => {
        await updateTask({ ...task, title, subject, priority });
        router.back();
    };

    return <TaskForm theme={theme} initialTask={task} onSave={handleSave} />;
}
