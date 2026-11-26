import React from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '../src/context/ThemeContext';
import { TasksProvider } from '../src/context/TasksContext';
import { useTheme } from '../src/hooks/useTheme';
import { useTasks } from '../src/hooks/useTasks';

function RootNavigator() {
    const { colors, isReady: themeReady } = useTheme();
    const { isReady: tasksReady } = useTasks();

    if (!themeReady || !tasksReady) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.background,
                }}
            >
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: colors.card },
                headerTintColor: colors.text,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Campus Planner' }} />
            <Stack.Screen name="task/new" options={{ title: 'Новая задача' }} />
            <Stack.Screen name="task/[id]" options={{ title: 'Детали задачи' }} />
            <Stack.Screen name="task/edit/[id]" options={{ title: 'Редактирование' }} />
            <Stack.Screen name="settings" options={{ title: 'Настройки' }} />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <TasksProvider>
                <RootNavigator />
            </TasksProvider>
        </ThemeProvider>
    );
}