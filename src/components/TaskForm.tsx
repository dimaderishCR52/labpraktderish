import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DRAFT_STORAGE_KEY } from '../storage/storage';
import { Task, TaskPriority } from '../types/task';

type Draft = { title: string; subject: string; priority: TaskPriority };

export default function TaskForm({
                                     theme,
                                     initialTask,
                                     onSave,
                                 }: {
    theme: 'light' | 'dark';
    initialTask?: Task;
    onSave: (title: string, subject: string, priority: TaskPriority) => Promise<void> | void;
}) {
    const isEdit = Boolean(initialTask);
    const [title, setTitle] = useState(initialTask?.title ?? '');
    const [subject, setSubject] = useState(initialTask?.subject ?? '');
    const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'medium');
    const [saving, setSaving] = useState(false);
    const [draftLoaded, setDraftLoaded] = useState(isEdit);
    const dark = theme === 'dark';
    const colors = { background: dark ? '#121212' : '#f2f3f5', card: dark ? '#202124' : '#ffffff', text: dark ? '#ffffff' : '#222222', secondary: dark ? '#c1c1c1' : '#555555', border: dark ? '#555555' : '#cccccc', button: dark ? '#eeeeee' : '#222222', buttonText: dark ? '#222222' : '#ffffff' };

    useEffect(() => {
        if (isEdit) return;
        let active = true;
        AsyncStorage.getItem(DRAFT_STORAGE_KEY).then((raw) => {
            if (!active) return;
            if (!raw) {
                setDraftLoaded(true);
                return;
            }
            const draft = JSON.parse(raw) as Draft;
            if (!draft.title && !draft.subject) {
                setDraftLoaded(true);
                return;
            }
            Alert.alert('Восстановить черновик?', 'Найден сохранённый черновик формы.', [
                {
                    text: 'Не восстанавливать',
                    style: 'cancel',
                    onPress: () => {
                        AsyncStorage.removeItem(DRAFT_STORAGE_KEY).catch(() => {});
                        setDraftLoaded(true);
                    },
                },
                {
                    text: 'Восстановить',
                    onPress: () => {
                        setTitle(draft.title ?? '');
                        setSubject(draft.subject ?? '');
                        setPriority(draft.priority ?? 'medium');
                        setDraftLoaded(true);
                    },
                },
            ]);
        }).catch(() => { if (active) setDraftLoaded(true); });
        return () => { active = false; };
    }, [isEdit]);

    useEffect(() => {
        if (isEdit || !draftLoaded) return;
        const draft: Draft = { title, subject, priority };
        AsyncStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft)).catch(() => {});
    }, [title, subject, priority, isEdit, draftLoaded]);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название задачи.');
            return;
        }
        if (!subject.trim()) {
            Alert.alert('Ошибка', 'Введите название предмета.');
            return;
        }
        setSaving(true);
        try {
            await onSave(title.trim(), subject.trim(), priority);
            if (!isEdit) await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch {
            Alert.alert('Ошибка', 'Не удалось сохранить задачу.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={[styles.form, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.text }]}>{isEdit ? 'Редактировать задачу' : 'Создать задачу'}</Text>
                <Text style={[styles.label, { color: colors.secondary }]}>Название задачи</Text>
                <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} placeholder="Например, сделать лабораторную" placeholderTextColor={colors.secondary} value={title} onChangeText={setTitle} />
                <Text style={[styles.label, { color: colors.secondary }]}>Предмет</Text>
                <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} placeholder="Например, Программирование" placeholderTextColor={colors.secondary} value={subject} onChangeText={setSubject} />
                <Text style={[styles.label, { color: colors.secondary }]}>Приоритет</Text>
                <View style={styles.priorities}>
                    {([
                        ['low', 'Низкий'],
                        ['medium', 'Средний'],
                        ['high', 'Высокий'],
                    ] as [TaskPriority, string][]).map(([value, label]) => (
                        <TouchableOpacity key={value} onPress={() => setPriority(value)} style={[styles.priorityButton, { borderColor: colors.border, backgroundColor: priority === value ? colors.button : colors.card }]}>
                            <Text style={{ color: priority === value ? colors.buttonText : colors.text, fontSize: 12, fontWeight: '600' }}>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity disabled={saving} style={[styles.saveButton, { backgroundColor: colors.button, opacity: saving ? 0.6 : 1 }]} onPress={handleSave}>
                    <Text style={{ color: colors.buttonText, fontSize: 16, fontWeight: '700' }}>{saving ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать задачу'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, flexGrow: 1 },
    form: { borderRadius: 14, padding: 18 },
    title: { fontSize: 23, fontWeight: '800', marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 7 },
    input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, height: 48, marginBottom: 16, fontSize: 15 },
    priorities: { flexDirection: 'row', gap: 8, marginBottom: 20 },
    priorityButton: { flex: 1, borderWidth: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
    saveButton: { borderRadius: 10, padding: 15, alignItems: 'center' },
});
