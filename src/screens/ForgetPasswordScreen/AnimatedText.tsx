import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Dimensions, StyleSheet, Text} from "react-native";
import React, {useEffect} from "react";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";

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

const styles = StyleSheet.create({
    title: {
        color: COLORS.DARKBLUE,
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 60,
        alignSelf: "flex-end"
    },
})
