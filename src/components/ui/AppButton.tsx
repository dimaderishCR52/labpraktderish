import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'md' | 'sm';
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function AppButton({
                                      title,
                                      onPress,
                                      variant = 'primary',
                                      size = 'md',
                                      disabled = false,
                                      style,
                                  }: AppButtonProps) {
    const { colors } = useTheme();
    const isPrimary = variant === 'primary';
    const isSmall = size === 'sm';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[
                styles.button,
                isSmall && styles.buttonSmall,
                isPrimary
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    isSmall && styles.textSmall,
                    { color: isPrimary ? colors.onPrimary : colors.text },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        alignItems: 'center',
    },
    buttonSmall: { paddingVertical: 10, paddingHorizontal: spacing.sm },
    text: { fontSize: 16, fontWeight: '700' },
    textSmall: { fontSize: 14 },
    disabled: { opacity: 0.6 },
});