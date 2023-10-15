import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {styles} from "./styles";
import React, {useEffect} from "react";

export const AnimatedBackground = () => {
    const circleSizeLittleCircle = useSharedValue(0);

    useEffect(() => {
        animateCircles();
    }, []);

    const animateCircles = () => {
        circleSizeLittleCircle.value = withTiming(200, {
            duration: 500,
            easing: Easing.linear,
        });
    };

    const animatedStyleLittleCircle = useAnimatedStyle(() => {
        return {
            width: circleSizeLittleCircle.value,
            height: circleSizeLittleCircle.value,
            borderRadius: circleSizeLittleCircle.value / 2,
        };
    });

    return (
        <>
            <Animated.View style={[styles.circleBig]}/>
            <Animated.View style={[styles.circleDown, animatedStyleLittleCircle]}/>
        </>
    )
}
