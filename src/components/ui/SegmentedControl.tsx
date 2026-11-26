import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';

interface SegmentedControlProps<T extends string> {
    options: { value: T; label: string }[];
    value: T;
    onChange: (value: T) => void;
}

export default function SegmentedControl<T extends string>({
                                                               options,
                                                               value,
                                                               onChange,
                                                           }: SegmentedControlProps<T>) {
    const { colors } = useTheme();

    return (
        <View style={styles.row}>
            {options.map((option) => {
                const selected = option.value === value;
                return (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        style={[
                            styles.item,
                            {
                                borderColor: colors.border,
                                backgroundColor: selected ? colors.primary : colors.card,
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: selected ? colors.onPrimary : colors.text,
                                fontWeight: '600',
                                fontSize: 12,
                            }}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
    item: {
        flex: 1,
        paddingVertical: 11,
        borderWidth: 1,
        borderRadius: 9,
        alignItems: 'center',
    },
});