import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '../../src/context/AppContext';

export default function TaskDetailsScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { tasks, toggleTask, theme } = useApp();
    const task = tasks.find((item) => item.id === id);
    const dark = theme === 'dark';
    const colors = { background: dark ? '#121212' : '#f2f3f5', card: dark ? '#202124' : '#ffffff', text: dark ? '#ffffff' : '#222222', secondary: dark ? '#c1c1c1' : '#666666', button: dark ? '#eeeeee' : '#222222', buttonText: dark ? '#222222' : '#ffffff' };

    if (!task) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.title, { color: colors.text }]}>Задача не найдена</Text>
                <Text style={{ color: colors.secondary, marginBottom: 18 }}>Возможно, она была удалена или указан неверный идентификатор.</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={() => router.back()}>
                    <Text style={{ color: colors.buttonText, fontWeight: '700' }}>Вернуться назад</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const priorityText = task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
                <Info label="Предмет" value={task.subject} textColor={colors.text} secondary={colors.secondary} />
                <Info label="Приоритет" value={priorityText} textColor={colors.text} secondary={colors.secondary} />
                <Info label="Статус" value={task.isCompleted ? 'Выполнено' : 'Активная'} textColor={colors.text} secondary={colors.secondary} />
            </View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.button }]}
                onPress={() => toggleTask(task.id)}
            >
                <Text style={{ color: colors.buttonText, fontWeight: '700' }}>
                    {task.isCompleted ? 'Вернуть в активные' : 'Отметить выполненной'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.outlineButton, { borderColor: dark ? '#777' : '#999' }]}
                onPress={() => router.push({ pathname: '/task/edit/[id]', params: { id: task.id } })}
            >
                <Text style={{ color: colors.text, fontWeight: '700' }}>Редактировать</Text>
            </TouchableOpacity>
        </View>
    );
}

function Info({ label, value, textColor, secondary }: { label: string; value: string; textColor: string; secondary: string }) {
    return (
        <View style={{ marginTop: 16 }}>
            <Text style={{ color: secondary, fontSize: 13 }}>{label}</Text>
            <Text style={{ color: textColor, fontSize: 17, marginTop: 3 }}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: { borderRadius: 14, padding: 18, marginBottom: 18 },
    title: { fontSize: 23, fontWeight: '800' },
    button: { padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
    outlineButton: { padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1 },
});
