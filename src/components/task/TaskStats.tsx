import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Task } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';
import { countTasks } from '../../utils/task';

function Stat({ value, label }: { value: number; label: string }) {
    const { colors } = useTheme();
    return (
        <View style={styles.item}>
            <Text style={[styles.number, { color: colors.text }]}>{value}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{label}</Text>
        </View>
    );
}

export default function TaskStats({ tasks }: { tasks: Task[] }) {
    const { colors } = useTheme();
    const counts = countTasks(tasks);

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Stat value={counts.total} label="Всего" />
            <Stat value={counts.completed} label="Выполнено" />
            <Stat value={counts.active} label="Активных" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: radius.lg,
        paddingVertical: 18,
        marginBottom: spacing.md,
        elevation: 2,
    },
    item: { alignItems: 'center', gap: 3 },
    number: { fontSize: 24, fontWeight: '800' },
});