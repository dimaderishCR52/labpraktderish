import React, { useEffect } from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';

export default function AnimatedChevron({ expanded }: { expanded: boolean }) {
    const { colors } = useTheme();
    const rotation = useSharedValue(expanded ? 1 : 0);

    useEffect(() => {
        rotation.value = withSpring(expanded ? 1 : 0, { damping: 14, stiffness: 160 });
    }, [expanded, rotation]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }],
    }));

    return (
        <Animated.Text
            style={[{ color: colors.accent, fontSize: 16, marginLeft: spacing.xs }, animatedStyle]}
        >
            ▾
        </Animated.Text>
    );
}