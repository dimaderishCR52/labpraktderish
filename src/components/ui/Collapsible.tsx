import React, { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface CollapsibleProps {
    expanded: boolean;
    children: ReactNode;
}

export default function Collapsible({ expanded, children }: CollapsibleProps) {
    const progress = useSharedValue(expanded ? 1 : 0);
    const contentHeight = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(expanded ? 1 : 0, { duration: 260 });
    }, [expanded, progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: contentHeight.value * progress.value,
        opacity: progress.value,
    }));

    return (
        <Animated.View
            style={[styles.clip, { pointerEvents: expanded ? 'auto' : 'none' }, animatedStyle]}
        >
            {/* Внутренний блок лежит абсолютно, чтобы его высоту можно было измерить в любом состоянии. */}
            <View
                style={styles.inner}
                onLayout={(event) => {
                    contentHeight.value = event.nativeEvent.layout.height;
                }}
            >
                {children}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    clip: { overflow: 'hidden' },
    inner: { position: 'absolute', top: 0, left: 0, right: 0 },
});