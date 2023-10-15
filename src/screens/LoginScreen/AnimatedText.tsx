import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {styles} from "./style";
import {Text} from "react-native";
import React, {useEffect} from "react";

interface AnimatedTextProps {
    typingSpeed: number;
    text: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({typingSpeed, text}) => {
    const containerWidth = useSharedValue(0);

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            width: `${containerWidth.value * 100}%`,
        };
    });

    useEffect(() => {
        startTypingAnimation();
    }, []);

    const startTypingAnimation = () => {
        const totalDuration = text.length * typingSpeed;
        containerWidth.value = withTiming(
            1,
            {
                duration: totalDuration,
                easing: Easing.linear,
            },
            () => {

            }
        );
    };

    return (
        <Animated.View style={[styles.animatedContainer, animatedContainerStyle]}>
            <Text style={styles.title}>{text}</Text>
        </Animated.View>
    )
}
