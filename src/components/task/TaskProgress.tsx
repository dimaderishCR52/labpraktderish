import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Task } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';
import { countTasks, getCompletionRatio } from '../../utils/task';
import ProgressBar from '../ui/ProgressBar';

export default function TaskProgress({ tasks }: { tasks: Task[] }) {
    const { colors } = useTheme();
    const { completed, total } = countTasks(tasks);
    const ratio = getCompletionRatio(tasks);

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <View style={styles.row}>
                <Text style={[styles.title, { color: colors.text }]}>Прогресс</Text>
                <Text style={{ color: colors.textSecondary }}>
                    {completed} из {total} · {Math.round(ratio * 100)}%
                </Text>
            </View>
            <ProgressBar value={ratio} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    title: { fontSize: 16, fontWeight: '700' },
});