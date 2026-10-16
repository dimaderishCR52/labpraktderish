import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { TaskPriority } from '../types/task';

interface TaskFormProps {
    onAdd: (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [priority, setPriority] =
        useState<TaskPriority>('medium');

    const handleAdd = () => {
        const trimmedTitle = title.trim();
        const trimmedSubject = subject.trim();

        if (!trimmedTitle) {
            Alert.alert(
                'Ошибка',
                'Введите название учебной задачи.'
            );
            return;
        }

        if (!trimmedSubject) {
            Alert.alert(
                'Ошибка',
                'Введите название предмета.'
            );
            return;
        }

        onAdd(
            trimmedTitle,
            trimmedSubject,
            priority
        );

        setTitle('');
        setSubject('');
        setPriority('medium');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>
                Новая задача
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Название задачи"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Предмет"
                placeholderTextColor="#888"
                value={subject}
                onChangeText={setSubject}
            />

            <Text style={styles.label}>
                Приоритет
            </Text>

            <View style={styles.priorityContainer}>
                <TouchableOpacity
                    style={[
                        styles.priorityButton,
                        priority === 'low' &&
                        styles.selectedPriority,
                    ]}
                    onPress={() => setPriority('low')}
                >
                    <Text
                        style={[
                            styles.priorityText,
                            priority === 'low' &&
                            styles.selectedPriorityText,
                        ]}
                    >
                        Низкий
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.priorityButton,
                        priority === 'medium' &&
                        styles.selectedPriority,
                    ]}
                    onPress={() => setPriority('medium')}
                >
                    <Text
                        style={[
                            styles.priorityText,
                            priority === 'medium' &&
                            styles.selectedPriorityText,
                        ]}
                    >
                        Средний
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.priorityButton,
                        priority === 'high' &&
                        styles.selectedPriority,
                    ]}
                    onPress={() => setPriority('high')}
                >
                    <Text
                        style={[
                            styles.priorityText,
                            priority === 'high' &&
                            styles.selectedPriorityText,
                        ]}
                    >
                        Высокий
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdd}
            >
                <Text style={styles.addButtonText}>
                    Добавить задачу
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    formTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 14,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        color: '#222222',
        backgroundColor: '#fafafa',
        marginBottom: 12,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#444444',
        marginBottom: 8,
    },

    priorityContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },

    priorityButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },

    selectedPriority: {
        backgroundColor: '#333333',
        borderColor: '#333333',
    },

    priorityText: {
        fontSize: 13,
        color: '#444444',
        fontWeight: '600',
    },

    selectedPriorityText: {
        color: '#ffffff',
    },

    addButton: {
        backgroundColor: '#222222',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },

    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});