import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { CreateTaskInput, Task, TaskPriority } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { useTaskDraft } from '../../hooks/useTaskDraft';
import { radius } from '../../theme/spacing';
import { formatDateForDisplay, parseDisplayDate, PRIORITY_OPTIONS } from '../../utils/task';
import AppButton from '../ui/AppButton';
import AppInput from '../ui/AppInput';
import Screen from '../ui/Screen';
import SegmentedControl from '../ui/SegmentedControl';

interface TaskFormProps {
    initialTask?: Task;
    onSave: (input: CreateTaskInput) => Promise<void> | void;
}

interface FormErrors {
    title?: string;
    subject?: string;
    dueDate?: string;
}

function validate(title: string, subject: string, dueDate: string): FormErrors {
    const errors: FormErrors = {};
    if (!title.trim()) errors.title = 'Введите название задачи.';
    if (!subject.trim()) errors.subject = 'Введите название предмета.';
    if (dueDate.trim() && !parseDisplayDate(dueDate)) {
        errors.dueDate = 'Введите существующую дату в формате ДД.ММ.ГГГГ.';
    }
    return errors;
}

export default function TaskForm({ initialTask, onSave }: TaskFormProps) {
    const { colors } = useTheme();
    const isEdit = Boolean(initialTask);

    const [title, setTitle] = useState(initialTask?.title ?? '');
    const [subject, setSubject] = useState(initialTask?.subject ?? '');
    const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'medium');
    const [dueDate, setDueDate] = useState(
        initialTask?.dueDate ? formatDateForDisplay(initialTask.dueDate) : '',
    );
    const [description, setDescription] = useState(initialTask?.description ?? '');
    const [errors, setErrors] = useState<FormErrors>({});
    const [saving, setSaving] = useState(false);

    const { removeDraft } = useTaskDraft(
        !isEdit,
        { title, subject, priority, dueDate, description },
        (draft) => {
            setTitle(draft.title);
            setSubject(draft.subject);
            setPriority(draft.priority);
            setDueDate(draft.dueDate);
            setDescription(draft.description);
        },
    );

    const handleSave = async () => {
        const found = validate(title, subject, dueDate);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setSaving(true);
        try {
            await onSave({
                title: title.trim(),
                subject: subject.trim(),
                priority,
                dueDate: parseDisplayDate(dueDate) ?? undefined,
                description: description.trim() || undefined,
            });
            if (!isEdit) await removeDraft();
        } catch {
            Alert.alert('Ошибка', 'Не удалось сохранить задачу.');
        } finally {
            setSaving(false);
        }
    };

    const buttonTitle = saving
        ? 'Сохранение...'
        : isEdit
            ? 'Сохранить изменения'
            : 'Создать задачу';

    return (
        <Screen scroll>
            <View style={[styles.form, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {isEdit ? 'Редактировать задачу' : 'Создать задачу'}
                </Text>

                <AppInput
                    label="Название задачи"
                    placeholder="Например, сделать лабораторную"
                    value={title}
                    onChangeText={setTitle}
                    error={errors.title}
                />
                <AppInput
                    label="Предмет"
                    placeholder="Например, Программирование"
                    value={subject}
                    onChangeText={setSubject}
                    error={errors.subject}
                />
                <AppInput
                    label="Срок выполнения (необязательно)"
                    placeholder="ДД.ММ.ГГГГ"
                    value={dueDate}
                    onChangeText={setDueDate}
                    error={errors.dueDate}
                    autoCapitalize="none"
                    keyboardType="numbers-and-punctuation"
                />
                <AppInput
                    label="Описание (необязательно)"
                    placeholder="Что нужно сделать"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    style={styles.multiline}
                />

                <Text style={[styles.label, { color: colors.textSecondary }]}>Приоритет</Text>
                <SegmentedControl options={PRIORITY_OPTIONS} value={priority} onChange={setPriority} />

                <AppButton title={buttonTitle} onPress={handleSave} disabled={saving} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    form: { borderRadius: radius.lg, padding: 18 },
    title: { fontSize: 23, fontWeight: '800', marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 7 },
    multiline: { height: 96, paddingTop: 12, textAlignVertical: 'top' },
});