import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';
import AppButton from './AppButton';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
                                       title,
                                       description,
                                       icon,
                                       actionLabel,
                                       onAction,
                                   }: EmptyStateProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            {icon ? <Text style={styles.icon}>{icon}</Text> : null}
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            {description ? (
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                    {description}
                </Text>
            ) : null}
            {actionLabel && onAction ? (
                <AppButton title={actionLabel} onPress={onAction} style={styles.action} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 35,
        paddingHorizontal: spacing.md,
        borderRadius: radius.lg,
    },
    icon: { fontSize: 32, marginBottom: spacing.sm },
    title: { fontWeight: '700', fontSize: 17, textAlign: 'center' },
    description: { marginTop: 5, textAlign: 'center' },
    action: { marginTop: spacing.md, alignSelf: 'stretch' },
});