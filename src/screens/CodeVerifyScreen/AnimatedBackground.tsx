import Animated from "react-native-reanimated";
import {styles} from "./style";
import React from "react";

export const AnimatedBackground = () => {
    return (
        <>
            <Animated.View style={[styles.circleUp]}/>
            <Animated.View style={[styles.circleDown]}/>
        </>
    )
}
