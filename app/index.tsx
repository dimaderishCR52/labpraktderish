import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import TaskCard from '../src/components/task/TaskCard';
import TaskStats from '../src/components/task/TaskStats';
import AppButton from '../src/components/ui/AppButton';
import AppInput from '../src/components/ui/AppInput';
import EmptyState from '../src/components/ui/EmptyState';
import Screen from '../src/components/ui/Screen';
import SegmentedControl from '../src/components/ui/SegmentedControl';
import { useTasks } from '../src/hooks/useTasks';
import { useTheme } from '../src/hooks/useTheme';
import { spacing } from '../src/theme/spacing';
import { TaskFilter, TaskSort } from '../src/types/task';
import {
    FILTER_OPTIONS,
    filterByStatus,
    filterTasks,
    SORT_OPTIONS,
    sortByPriority,
} from '../src/utils/task';

export default function HomeScreen() {
    const { tasks } = useTasks();
    const { colors } = useTheme();
    const [filter, setFilter] = useState<TaskFilter>('all');
    const [sort, setSort] = useState<TaskSort>('newest');
    const [query, setQuery] = useState('');

    const visibleTasks = useMemo(() => {
        const result = filterTasks(filterByStatus(tasks, filter), query);
        return sort === 'priority' ? sortByPriority(result) : result;
    }, [tasks, filter, sort, query]);

    const isSearching = query.trim().length > 0;

    return (
        <Screen>
            <FlatList
                data={visibleTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => router.push({ pathname: '/task/[id]', params: { id: item.id } })}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Campus Planner</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Планировщик учебных задач
                        </Text>

                        <TaskStats tasks={tasks} />

                        <AppInput
                            placeholder="Поиск по названию или предмету"
                            value={query}
                            onChangeText={setQuery}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <SegmentedControl options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
                        <SegmentedControl options={SORT_OPTIONS} value={sort} onChange={setSort} />

                        <AppButton
                            title="+ Добавить задачу"
                            onPress={() => router.push('/task/new')}
                            style={styles.addButton}
                        />

                        <View style={styles.sectionRow}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Список задач</Text>
                            <TouchableOpacity onPress={() => router.push('/settings')}>
                                <Text style={{ color: colors.accent, fontWeight: '600' }}>Настройки</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    isSearching ? (
                        <EmptyState
                            icon="🔍"
                            title="Ничего не найдено"
                            description="Измените запрос или выберите другой фильтр"
                        />
                    ) : (
                        <EmptyState
                            icon="📝"
                            title="Список пока пуст"
                            description="Добавьте задачу или выберите другой фильтр"
                        />
                    )
                }
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { paddingBottom: spacing.xl },
    title: { fontSize: 30, fontWeight: '800' },
    subtitle: { fontSize: 15, marginTop: spacing.xs, marginBottom: 18 },
    addButton: { marginBottom: 18 },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: { fontSize: 21, fontWeight: '700' },
});