import Animated from "react-native-reanimated";
import React from "react";
import {COLORS} from "../../../constants/colors/colors";
import {StyleSheet} from "react-native";

export const AnimatedBackground = () => {
    return (
        <>
            <Animated.View style={[styles.circleUp]}/>
            <Animated.View style={[styles.circleDown]}/>
        </>
    )
}

const styles = StyleSheet.create({
    circleUp: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: COLORS.BLUE,
        position: 'absolute',
        top: 260,
        zIndex: 0,
        left: 170,
    },
    circleDown: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: COLORS.LIGHTBLUE,
        position: 'absolute',
        bottom: 260,
        zIndex: 0,
        borderColor: COLORS.DARKBLUE,
        left: 0,
    }
})
