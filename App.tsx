import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import TaskCard from './src/components/TaskCard';
import TaskForm from './src/components/TaskForm';
import {
    Task,
    TaskPriority,
} from './src/types/task';

type FilterType = 'all' | 'active' | 'completed';

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Подготовить лабораторную работу №1',
        subject: 'Программирование',
        priority: 'high',
        isCompleted: false,
    },
    {
        id: '2',
        title: 'Повторить тему по сетям',
        subject: 'Компьютерные сети',
        priority: 'medium',
        isCompleted: false,
    },
    {
        id: '3',
        title: 'Сделать презентацию',
        subject: 'Информационные технологии',
        priority: 'low',
        isCompleted: true,
    },
    {
        id: '4',
        title: 'Решить практические задания',
        subject: 'Математика',
        priority: 'high',
        isCompleted: false,
    },
];

export default function App() {
    const [tasks, setTasks] =
        useState<Task[]>(initialTasks);

    const [isFormVisible, setIsFormVisible] =
        useState(false);

    const [filter, setFilter] =
        useState<FilterType>('all');

    const completedCount = tasks.filter(
        (task) => task.isCompleted
    ).length;

    const activeCount =
        tasks.length - completedCount;

    const addTask = (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => {
        const newTask: Task = {
            id: String(Date.now()),
            title,
            subject,
            priority,
            isCompleted: false,
        };

        setTasks((currentTasks) => [
            newTask,
            ...currentTasks,
        ]);

        setIsFormVisible(false);
    };

    const toggleTask = (id: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        isCompleted: !task.isCompleted,
                    }
                    : task
            )
        );
    };

    const deleteTask = (id: string) => {
        Alert.alert(
            'Удаление задачи',
            'Вы действительно хотите удалить эту задачу?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        setTasks((currentTasks) =>
                            currentTasks.filter(
                                (task) => task.id !== id
                            )
                        );
                    },
                },
            ]
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') {
            return !task.isCompleted;
        }

        if (filter === 'completed') {
            return task.isCompleted;
        }

        return true;
    });

    const getFilterStyle = (
        currentFilter: FilterType
    ) => {
        return [
            styles.filterButton,
            filter === currentFilter &&
            styles.activeFilter,
        ];
    };

    const getFilterTextStyle = (
        currentFilter: FilterType
    ) => {
        return [
            styles.filterText,
            filter === currentFilter &&
            styles.activeFilterText,
        ];
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskCard
                            task={item}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    )}
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.title}>
                                Campus Planner
                            </Text>

                            <Text style={styles.subtitle}>
                                Планировщик учебных задач
                            </Text>

                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>
                                        {tasks.length}
                                    </Text>

                                    <Text style={styles.statLabel}>
                                        Всего задач
                                    </Text>
                                </View>

                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>
                                        {completedCount}
                                    </Text>

                                    <Text style={styles.statLabel}>
                                        Выполнено
                                    </Text>
                                </View>

                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>
                                        {activeCount}
                                    </Text>

                                    <Text style={styles.statLabel}>
                                        Активных
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.filters}>
                                <TouchableOpacity
                                    style={getFilterStyle('all')}
                                    onPress={() => setFilter('all')}
                                >
                                    <Text
                                        style={getFilterTextStyle('all')}
                                    >
                                        Все
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={getFilterStyle('active')}
                                    onPress={() =>
                                        setFilter('active')
                                    }
                                >
                                    <Text
                                        style={getFilterTextStyle('active')}
                                    >
                                        Активные
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={getFilterStyle('completed')}
                                    onPress={() =>
                                        setFilter('completed')
                                    }
                                >
                                    <Text
                                        style={getFilterTextStyle(
                                            'completed'
                                        )}
                                    >
                                        Выполненные
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {!isFormVisible && (
                                <TouchableOpacity
                                    style={styles.newTaskButton}
                                    onPress={() =>
                                        setIsFormVisible(true)
                                    }
                                >
                                    <Text
                                        style={styles.newTaskButtonText}
                                    >
                                        + Добавить задачу
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {isFormVisible && (
                                <TaskForm onAdd={addTask} />
                            )}

                            <Text style={styles.sectionTitle}>
                                Список задач
                            </Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyTitle}>
                                Список пока пуст
                            </Text>

                            <Text style={styles.emptyText}>
                                Добавьте первую учебную задачу
                            </Text>
                        </View>
                    }
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f3f5',
    },

    container: {
        flex: 1,
    },

    listContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#1f1f1f',
    },

    subtitle: {
        fontSize: 15,
        color: '#777777',
        marginTop: 4,
        marginBottom: 18,
    },

    statsContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        elevation: 2,
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    statItem: {
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#222222',
    },

    statLabel: {
        fontSize: 12,
        color: '#777777',
        marginTop: 3,
    },

    filters: {
        flexDirection: 'row',
        marginBottom: 14,
        gap: 8,
    },

    filterButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#ffffff',
        borderRadius: 9,
        paddingVertical: 10,
        alignItems: 'center',
    },

    activeFilter: {
        backgroundColor: '#222222',
        borderColor: '#222222',
    },

    filterText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#444444',
    },

    activeFilterText: {
        color: '#ffffff',
    },

    newTaskButton: {
        backgroundColor: '#222222',
        borderRadius: 11,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 18,
    },

    newTaskButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 12,
    },

    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 50,
        backgroundColor: '#ffffff',
        borderRadius: 14,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#444444',
        marginBottom: 6,
    },

    emptyText: {
        fontSize: 14,
        color: '#888888',
    },
});