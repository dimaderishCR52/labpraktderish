import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';
import { isOverdue, PRIORITY_LABELS, STATUS_LABELS } from '../../utils/task';

interface TaskCardProps {
    task: Task;
    onPress: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
    const { colors } = useTheme();
    const completed = task.status === 'completed';
    const overdue = isOverdue(task);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.card, { backgroundColor: colors.card, opacity: completed ? 0.65 : 1 }]}
        >
            <View style={styles.body}>
                <Text
                    style={[
                        styles.title,
                        { color: colors.text, textDecorationLine: completed ? 'line-through' : 'none' },
                    ]}
                >
                    {task.title}
                </Text>
                <Text style={[styles.line, { color: colors.textSecondary, marginTop: 5 }]}>
                    Предмет: {task.subject}
                </Text>
                <Text style={[styles.line, { color: colors.textSecondary }]}>
                    Приоритет: {PRIORITY_LABELS[task.priority]}
                </Text>
                <Text style={[styles.line, { color: colors.textSecondary }]}>
                    Статус: {STATUS_LABELS[task.status]}
                </Text>
                {task.dueDate ? (
                    <Text style={[styles.line, { color: overdue ? colors.danger : colors.textSecondary }]}>
                        Срок: {task.dueDate}
                        {overdue ? ' (просрочено)' : ''}
                    </Text>
                ) : null}
            </View>
            <Text style={[styles.chevron, { color: colors.accent }]}>›</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    body: { flex: 1 },
    title: { fontSize: 17, fontWeight: '700' },
    line: { marginTop: 3 },
    chevron: { fontSize: 22, marginLeft: 10 },
});