import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';

export default function TaskCard({ task, theme, onPress }: { task: Task; theme: 'light' | 'dark'; onPress: () => void }) {
    const dark = theme === 'dark';
    const priority = task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий';
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.card, { backgroundColor: dark ? '#202124' : '#ffffff', opacity: task.isCompleted ? 0.65 : 1 }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: dark ? '#ffffff' : '#222222', textDecorationLine: task.isCompleted ? 'line-through' : 'none' }]}>{task.title}</Text>
                <Text style={{ color: dark ? '#c1c1c1' : '#555555', marginTop: 5 }}>Предмет: {task.subject}</Text>
                <Text style={{ color: dark ? '#c1c1c1' : '#555555', marginTop: 3 }}>Приоритет: {priority}</Text>
                <Text style={{ color: dark ? '#c1c1c1' : '#777777', marginTop: 3 }}>Статус: {task.isCompleted ? 'Выполнено' : 'Активная'}</Text>
            </View>
            <Text style={{ color: dark ? '#b8c7ff' : '#3157a4', fontSize: 22, marginLeft: 10 }}>›</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
    title: { fontSize: 17, fontWeight: '700' },
});
