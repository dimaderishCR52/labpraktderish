import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';

interface ScreenProps {
    children: ReactNode;
    scroll?: boolean;
}

export default function Screen({ children, scroll = false }: ScreenProps) {
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={[styles.safe, { backgroundColor: colors.background }]}
            edges={['bottom', 'left', 'right']}
        >
            {scroll ? (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={styles.content}>{children}</View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    content: { flex: 1, padding: spacing.md },
    scrollContent: { flexGrow: 1, padding: spacing.md },
});