import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AppButton from '../../src/components/ui/AppButton';
import EmptyState from '../../src/components/ui/EmptyState';
import Screen from '../../src/components/ui/Screen';
import { useTaskIdParam } from '../../src/hooks/useTaskIdParam';
import { useTasks } from '../../src/hooks/useTasks';
import { useTheme } from '../../src/hooks/useTheme';
import { radius, spacing } from '../../src/theme/spacing';
import { isOverdue, PRIORITY_LABELS, STATUS_LABELS } from '../../src/utils/task';

function Info({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
    const { colors } = useTheme();
    return (
        <View style={{ marginTop: spacing.md }}>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{label}</Text>
            <Text style={{ color: danger ? colors.danger : colors.text, fontSize: 17, marginTop: 3 }}>
                {value}
            </Text>
        </View>
    );
}

export default function TaskDetailsScreen() {
    const id = useTaskIdParam();
    const { getTaskById, toggleTaskStatus, removeTask } = useTasks();
    const { colors } = useTheme();
    const task = getTaskById(id);

    if (!task) {
        return (
            <Screen>
                <EmptyState
                    icon="❓"
                    title="Задача не найдена"
                    description="Возможно, она была удалена или указан неверный идентификатор."
                    actionLabel="Вернуться назад"
                    onAction={() => router.back()}
                />
            </Screen>
        );
    }

    const completed = task.status === 'completed';
    const overdue = isOverdue(task);

    const handleRemove = () => {
        Alert.alert('Удалить задачу?', 'Это действие нельзя отменить.', [
            { text: 'Отмена', style: 'cancel' },
            {
                text: 'Удалить',
                style: 'destructive',
                onPress: () => {
                    removeTask(task.id);
                    router.back();
                },
            },
        ]);
    };

    return (
        <Screen scroll>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
                <Info label="Предмет" value={task.subject} />
                <Info label="Приоритет" value={PRIORITY_LABELS[task.priority]} />
                <Info label="Статус" value={STATUS_LABELS[task.status]} />
                {task.dueDate ? (
                    <Info
                        label="Срок"
                        value={overdue ? `${task.dueDate} (просрочено)` : task.dueDate}
                        danger={overdue}
                    />
                ) : null}
            </View>

            <AppButton
                title={completed ? 'Вернуть в активные' : 'Отметить выполненной'}
                onPress={() => toggleTaskStatus(task.id)}
                style={styles.button}
            />
            <AppButton
                title="Редактировать"
                variant="secondary"
                onPress={() =>
                    router.push({ pathname: '/task/edit/[id]', params: { id: task.id } })
                }
                style={styles.button}
            />
            <AppButton title="Удалить" variant="secondary" onPress={handleRemove} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    card: { borderRadius: radius.lg, padding: 18, marginBottom: 18 },
    title: { fontSize: 23, fontWeight: '800' },
    button: { marginBottom: 12 },
});