import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./SkeletonLoader.styled";

export const SkeletonLoader = () => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, [opacity]);

    return (
        <View style={styles.card} testID="skeleton-loader">
            <Animated.View style={[styles.header, { opacity }]} />
            <Animated.View style={[styles.line, { opacity }]} />
            <Animated.View style={[styles.line, styles.lastLine, { opacity }]} />
        </View>
    );
};
