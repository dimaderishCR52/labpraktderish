import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({
                                     task,
                                     onToggle,
                                     onDelete,
                                 }: TaskCardProps) {
    const getPriorityText = () => {
        switch (task.priority) {
            case 'low':
                return 'Низкий';
            case 'medium':
                return 'Средний';
            case 'high':
                return 'Высокий';
        }
    };

    return (
        <View
            style={[
                styles.card,
                task.isCompleted && styles.completedCard,
            ]}
        >
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        task.isCompleted && styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={styles.subject}>
                    Предмет: {task.subject}
                </Text>

                <Text style={styles.priority}>
                    Приоритет: {getPriorityText()}
                </Text>

                <Text style={styles.status}>
                    Статус:{' '}
                    {task.isCompleted ? 'Выполнено' : 'Активная'}
                </Text>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => onToggle(task.id)}
                >
                    <Text style={styles.buttonText}>
                        {task.isCompleted ? '↩' : '✓'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(task.id)}
                >
                    <Text style={styles.buttonText}>✕</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    completedCard: {
        opacity: 0.55,
    },

    content: {
        flex: 1,
        marginRight: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 6,
    },

    completedTitle: {
        textDecorationLine: 'line-through',
    },

    subject: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 4,
    },

    priority: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 4,
    },

    status: {
        fontSize: 13,
        color: '#777777',
    },

    buttons: {
        flexDirection: 'row',
        gap: 8,
    },

    completeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },

    deleteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E53935',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
    },
});