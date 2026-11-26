import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../src/context/AppContext';

export default function SettingsScreen() {
    const { theme, setTheme } = useApp();
    const dark = theme === 'dark';
    const background = dark ? '#121212' : '#f2f3f5';
    const card = dark ? '#202124' : '#ffffff';
    const text = dark ? '#ffffff' : '#222222';
    const secondary = dark ? '#c1c1c1' : '#666666';

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text style={[styles.title, { color: text }]}>Тема интерфейса</Text>
            <Text style={[styles.subtitle, { color: secondary }]}>Выберите оформление приложения. Выбор сохранится после перезапуска.</Text>
            <View style={[styles.card, { backgroundColor: card }]}>
                <TouchableOpacity style={[styles.option, theme === 'light' && styles.selected]} onPress={() => setTheme('light')}>
                    <Text style={[styles.optionTitle, { color: text }]}>☀ Светлая тема</Text>
                    <Text style={{ color: secondary }}>Светлый фон и тёмный текст</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, theme === 'dark' && styles.selected]} onPress={() => setTheme('dark')}>
                    <Text style={[styles.optionTitle, { color: text }]}>☾ Тёмная тема</Text>
                    <Text style={{ color: secondary }}>Тёмный фон и светлый текст</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: secondary, marginTop: 14 }}>Текущая тема: {dark ? 'тёмная' : 'светлая'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: '800' },
    subtitle: { fontSize: 14, lineHeight: 20, marginTop: 8, marginBottom: 18 },
    card: { borderRadius: 14, padding: 10 },
    option: { padding: 15, borderRadius: 10, marginVertical: 4, borderWidth: 1, borderColor: 'transparent' },
    selected: { borderColor: '#6d8be8' },
    optionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 5 },
});
