import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Dimensions, Text} from "react-native";
import {styles} from "./styles";
import React, {useEffect} from "react";

const {width} = Dimensions.get('window');
export const AnimatedText = () => {
    const text = 'Reset';

    const animatedValue = useSharedValue(width + 100);

    useEffect(() => {
        animatedValue.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.back(2)),
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: animatedValue.value}],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <Text style={styles.title}>{text}</Text>
        </Animated.View>
    )
}
