import {StyleSheet, View} from "react-native";
import React from "react";

export const AnimatedBackground = () => {
    return (
        <>
            <View style={[styles.circleLittle]}/>
            <View style={[styles.circleDown]}/>
        </>
    )
}

const styles = StyleSheet.create({
    circleLittle: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#4b37bc', //#b8c5d5
        position: 'absolute',
        top: -40,
        right: -160,
    },
    circleBig: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: '#0a1e51', //#b8c5d5
        position: 'absolute',
        top: 250,
        left: -170,
    },
    circleDown: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#52d3fc', //#b8c5d5
        position: 'absolute',
        top: 600,
        right: -80,
    },
})
