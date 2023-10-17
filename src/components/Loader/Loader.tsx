import Spinner from "react-native-spinkit";
import React from "react";
import {COLORS} from "../../../constants/colors/colors";
import {StyleSheet} from "react-native";

export const Loader = () => {
    return (
        <Spinner type={"WanderingCubes"} style={styles.loader} size={150} color={COLORS.BLUE}/>
    )
}
export const styles = StyleSheet.create({
    loader: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center", flex: 1
    }
})
