import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Extrapolation,
    FadeInDown,
    FadeOutLeft,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { Task } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';
import {
    formatDateForDisplay,
    isOverdue,
    PRIORITY_LABELS,
    STATUS_LABELS,
} from '../../utils/task';
import AnimatedChevron from '../ui/AnimatedChevron';
import AppButton from '../ui/AppButton';
import Collapsible from '../ui/Collapsible';
import StatusToggle from './StatusToggle';

interface TaskCardProps {
    task: Task;
    highlighted?: boolean;
    onOpen: () => void;
    onToggle: () => void;
    onEdit: () => void;
    onRemove: () => void;
}

function DetailRow({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
    const { colors } = useTheme();
    return (
        <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{label}</Text>
            <Text style={[styles.detailValue, { color: danger ? colors.danger : colors.text }]}>
                {value}
            </Text>
        </View>
    );
}

export default function TaskCard({
                                     task,
                                     highlighted = false,
                                     onOpen,
                                     onToggle,
                                     onEdit,
                                     onRemove,
                                 }: TaskCardProps) {
    const { colors } = useTheme();
    const [expanded, setExpanded] = useState(false);

    const completed = task.status === 'completed';
    const overdue = isOverdue(task);

    // Это только прогресс анимации. Источник истины о статусе остаётся в useTasks().
    const completion = useSharedValue(completed ? 1 : 0);
    const highlight = useSharedValue(0);

    useEffect(() => {
        completion.value = withTiming(completed ? 1 : 0, { duration: 300 });
    }, [completed, completion]);

    useEffect(() => {
        if (!highlighted) return;
        highlight.value = withSequence(
            withTiming(1, { duration: 300 }),
            withTiming(0, { duration: 1200 }),
        );
    }, [highlighted, highlight]);

    const cardColor = colors.card;
    const completedColor = colors.completedBackground;
    const highlightColor = colors.highlight;

    const cardStyle = useAnimatedStyle(() => {
        const base = interpolateColor(completion.value, [0, 1], [cardColor, completedColor]);
        return {
            backgroundColor: interpolateColor(highlight.value, [0, 1], [base, highlightColor]),
            opacity: interpolate(completion.value, [0, 1], [1, 0.75], Extrapolation.CLAMP),
        };
    });

    return (
        <Animated.View
            entering={FadeInDown.duration(350)}
            exiting={FadeOutLeft.duration(250)}
            style={styles.wrapper}
        >
            <Animated.View style={[styles.card, cardStyle]}>
                <View style={styles.header}>
                    <StatusToggle completed={completed} onPress={onToggle} />
                    <TouchableOpacity style={styles.titleBlock} onPress={onOpen} activeOpacity={0.7}>
                        <Text
                            style={[
                                styles.title,
                                {
                                    color: colors.text,
                                    textDecorationLine: completed ? 'line-through' : 'none',
                                },
                            ]}
                        >
                            {task.title}
                        </Text>
                        <Text style={[styles.meta, { color: overdue ? colors.danger : colors.textSecondary }]}>
                            Приоритет: {PRIORITY_LABELS[task.priority]}
                            {overdue ? ' · просрочено' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => setExpanded((value) => !value)}
                    activeOpacity={0.7}
                >
                    <Text style={{ color: colors.accent, fontWeight: '600' }}>
                        {expanded ? 'Скрыть' : 'Подробнее'}
                    </Text>
                    <AnimatedChevron expanded={expanded} />
                </TouchableOpacity>

                <Collapsible expanded={expanded}>
                    <View style={styles.details}>
                        <DetailRow label="Предмет" value={task.subject} />
                        <DetailRow
                            label="Срок"
                            value={task.dueDate ? formatDateForDisplay(task.dueDate) : 'не указан'}
                            danger={overdue}
                        />
                        <DetailRow label="Описание" value={task.description ?? 'нет описания'} />
                        <DetailRow label="Статус" value={STATUS_LABELS[task.status]} />
                        <View style={styles.actions}>
                            <AppButton
                                title="Открыть"
                                variant="secondary"
                                size="sm"
                                onPress={onOpen}
                                style={styles.action}
                            />
                            <AppButton
                                title="Изменить"
                                variant="secondary"
                                size="sm"
                                onPress={onEdit}
                                style={styles.action}
                            />
                            <AppButton
                                title="Удалить"
                                variant="secondary"
                                size="sm"
                                onPress={onRemove}
                                style={styles.action}
                            />
                        </View>
                    </View>
                </Collapsible>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: 12 },
    card: { borderRadius: radius.md, padding: spacing.md, elevation: 2 },
    header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    titleBlock: { flex: 1 },
    title: { fontSize: 17, fontWeight: '700' },
    meta: { marginTop: 3 },
    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: spacing.sm,
    },
    details: { paddingTop: spacing.sm },
    detailRow: { marginTop: spacing.sm },
    detailLabel: { fontSize: 12 },
    detailValue: { fontSize: 15, marginTop: 2 },
    actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    action: { flex: 1 },
});