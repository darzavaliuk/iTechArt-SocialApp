import {View} from "react-native";
import {styles} from "./style";
import React from "react";
export const AnimatedBackground = () => {
    return (
        <>
            <View style={[styles.circleLittle]}/>
            <View style={[styles.circleDown]}/>
        </>
    )
}
