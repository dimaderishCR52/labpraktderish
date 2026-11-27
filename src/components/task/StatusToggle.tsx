import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

interface StatusToggleProps {
    completed: boolean;
    onPress: () => void;
}

export default function StatusToggle({ completed, onPress }: StatusToggleProps) {
    const { colors } = useTheme();
    const progress = useSharedValue(completed ? 1 : 0);
    const scale = useSharedValue(1);
    const isFirstRender = useRef(true);

    useEffect(() => {
        progress.value = withTiming(completed ? 1 : 0, { duration: 250 });

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // Реакция на действие пользователя: «пружинка» иконки.
        scale.value = 0.6;
        scale.value = withSpring(1, { damping: 7, stiffness: 220 });
    }, [completed, progress, scale]);

    const cardColor = colors.card;
    const borderColor = colors.border;
    const successColor = colors.success;

    const circleStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, [0, 1], [cardColor, successColor]),
        borderColor: interpolateColor(progress.value, [0, 1], [borderColor, successColor]),
        transform: [{ scale: scale.value }],
    }));

    const checkStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [
            { scale: interpolate(progress.value, [0, 1], [0.3, 1], Extrapolation.CLAMP) },
        ],
    }));

    return (
        <Pressable
            onPress={onPress}
            hitSlop={8}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
        >
            <Animated.View style={[styles.circle, circleStyle]}>
                <Animated.Text style={[styles.check, { color: colors.onPrimary }, checkStyle]}>
                    ✓
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    check: { fontSize: 16, fontWeight: '800' },
});