import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { clamp01 } from '../../utils/task';

interface ProgressBarProps {
    value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
    const { colors } = useTheme();
    const progress = useSharedValue(0);
    const target = clamp01(value);
    const startColor = colors.accent;
    const endColor = colors.success;

    useEffect(() => {
        progress.value = withTiming(target, { duration: 600 });
    }, [target, progress]);

    const fillStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%` as `${number}%`,
        backgroundColor: interpolateColor(progress.value, [0, 1], [startColor, endColor]),
    }));

    return (
        <View style={[styles.track, { backgroundColor: colors.border }]}>
            <Animated.View style={[styles.fill, fillStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: { height: 10, borderRadius: 5, overflow: 'hidden' },
    fill: { height: '100%', borderRadius: 5 },
});