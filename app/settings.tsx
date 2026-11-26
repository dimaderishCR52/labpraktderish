import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../src/components/ui/Screen';
import { useTheme } from '../src/hooks/useTheme';
import { radius, spacing } from '../src/theme/spacing';
import { ThemeName } from '../src/theme/colors';

const THEME_OPTIONS: { value: ThemeName; title: string; description: string }[] = [
    { value: 'light', title: '☀ Светлая тема', description: 'Светлый фон и тёмный текст' },
    { value: 'dark', title: '☾ Тёмная тема', description: 'Тёмный фон и светлый текст' },
];

export default function SettingsScreen() {
    const { theme, colors, setTheme } = useTheme();

    return (
        <Screen scroll>
            <Text style={[styles.title, { color: colors.text }]}>Тема интерфейса</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Выберите оформление приложения. Выбор сохранится после перезапуска.
            </Text>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
                {THEME_OPTIONS.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.option,
                            { borderColor: theme === option.value ? colors.selected : 'transparent' },
                        ]}
                        onPress={() => setTheme(option.value)}
                    >
                        <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                        <Text style={{ color: colors.textSecondary }}>{option.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={{ color: colors.textSecondary, marginTop: 14 }}>
                Текущая тема: {theme === 'dark' ? 'тёмная' : 'светлая'}
            </Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 24, fontWeight: '800' },
    subtitle: { fontSize: 14, lineHeight: 20, marginTop: spacing.sm, marginBottom: 18 },
    card: { borderRadius: radius.lg, padding: 10 },
    option: {
        padding: 15,
        borderRadius: 10,
        marginVertical: spacing.xs,
        borderWidth: 1,
    },
    optionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 5 },
});