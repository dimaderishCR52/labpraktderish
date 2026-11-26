import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme/spacing';

interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function AppInput({ label, error, style, ...inputProps }: AppInputProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.wrapper}>
            {label ? (
                <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
            ) : null}
            <TextInput
                placeholderTextColor={colors.textSecondary}
                style={[
                    styles.input,
                    { color: colors.text, borderColor: error ? colors.danger : colors.border },
                    style,
                ]}
                {...inputProps}
            />
            {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: spacing.md },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 7 },
    input: {
        borderWidth: 1,
        borderRadius: radius.md,
        paddingHorizontal: 13,
        height: 48,
        fontSize: 15,
    },
    error: { fontSize: 13, marginTop: spacing.xs },
});