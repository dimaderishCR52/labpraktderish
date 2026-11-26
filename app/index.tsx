import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import TaskCard from '../src/components/TaskCard';
import { useApp } from '../src/context/AppContext';

type FilterType = 'all' | 'active' | 'completed';

export default function HomeScreen() {
    const { tasks, theme } = useApp();
    const [filter, setFilter] = useState<FilterType>('all');
    const dark = theme === 'dark';

    const completedCount = tasks.filter((task) => task.isCompleted).length;
    const activeCount = tasks.length - completedCount;
    const filteredTasks = useMemo(() => tasks.filter((task) => {
        if (filter === 'active') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
    }), [tasks, filter]);

    const colors = {
        background: dark ? '#121212' : '#f2f3f5',
        card: dark ? '#202124' : '#ffffff',
        text: dark ? '#ffffff' : '#222222',
        secondary: dark ? '#c1c1c1' : '#777777',
        border: dark ? '#555555' : '#cccccc',
        button: dark ? '#eeeeee' : '#222222',
        buttonText: dark ? '#222222' : '#ffffff',
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        theme={theme}
                        onPress={() => router.push({ pathname: '/task/[id]', params: { id: item.id } })}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Campus Planner</Text>
                        <Text style={[styles.subtitle, { color: colors.secondary }]}>Планировщик учебных задач</Text>
                        <View style={[styles.stats, { backgroundColor: colors.card }]}>
                            <Stat value={tasks.length} label="Всего" textColor={colors.text} secondary={colors.secondary} />
                            <Stat value={completedCount} label="Выполнено" textColor={colors.text} secondary={colors.secondary} />
                            <Stat value={activeCount} label="Активных" textColor={colors.text} secondary={colors.secondary} />
                        </View>
                        <View style={styles.filters}>
                            {([
                                ['all', 'Все'],
                                ['active', 'Активные'],
                                ['completed', 'Выполненные'],
                            ] as [FilterType, string][]).map(([value, label]) => (
                                <TouchableOpacity
                                    key={value}
                                    style={[
                                        styles.filterButton,
                                        { borderColor: colors.border, backgroundColor: filter === value ? colors.button : colors.card },
                                    ]}
                                    onPress={() => setFilter(value)}
                                >
                                    <Text style={{ color: filter === value ? colors.buttonText : colors.text, fontWeight: '600', fontSize: 12 }}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={[styles.mainButton, { backgroundColor: colors.button }]}
                            onPress={() => router.push('/task/new')}
                        >
                            <Text style={{ color: colors.buttonText, fontWeight: '700', fontSize: 16 }}>+ Добавить задачу</Text>
                        </TouchableOpacity>
                        <View style={styles.sectionRow}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Список задач</Text>
                            <TouchableOpacity onPress={() => router.push('/settings')}>
                                <Text style={{ color: dark ? '#b8c7ff' : '#3157a4', fontWeight: '600' }}>Настройки</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={[styles.empty, { backgroundColor: colors.card }]}>
                        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 17 }}>Список пока пуст</Text>
                        <Text style={{ color: colors.secondary, marginTop: 5 }}>Добавьте задачу или выберите другой фильтр</Text>
                    </View>
                }
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

function Stat({ value, label, textColor, secondary }: { value: number; label: string; textColor: string; secondary: string }) {
    return (
        <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: textColor }]}>{value}</Text>
            <Text style={{ color: secondary, fontSize: 12 }}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: 16, paddingBottom: 32 },
    title: { fontSize: 30, fontWeight: '800' },
    subtitle: { fontSize: 15, marginTop: 4, marginBottom: 18 },
    stats: { flexDirection: 'row', justifyContent: 'space-around', borderRadius: 14, paddingVertical: 18, marginBottom: 16, elevation: 2 },
    statItem: { alignItems: 'center', gap: 3 },
    statNumber: { fontSize: 24, fontWeight: '800' },
    filters: { flexDirection: 'row', gap: 8, marginBottom: 14 },
    filterButton: { flex: 1, paddingVertical: 11, borderWidth: 1, borderRadius: 9, alignItems: 'center' },
    mainButton: { borderRadius: 11, paddingVertical: 14, alignItems: 'center', marginBottom: 18 },
    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 21, fontWeight: '700' },
    empty: { alignItems: 'center', paddingVertical: 35, borderRadius: 14 },
});
