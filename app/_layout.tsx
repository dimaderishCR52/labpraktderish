import React from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { AppProvider, useApp } from '../src/context/AppContext';

function RootNavigator() {
    const { theme, isReady } = useApp();

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f3f5' }}>
                <ActivityIndicator size="large" color="#222222" />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: theme === 'light' ? '#ffffff' : '#202124' },
                headerTintColor: theme === 'light' ? '#222222' : '#ffffff',
                contentStyle: { backgroundColor: theme === 'light' ? '#f2f3f5' : '#121212' },
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
        <AppProvider>
            <RootNavigator />
        </AppProvider>
    );
}
