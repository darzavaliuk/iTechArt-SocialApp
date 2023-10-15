import Spinner from "react-native-spinkit";
import React from "react";

export const Loader = () => {
    return (
        <Spinner type={"WanderingCubes"} style={{alignSelf: "center", justifyContent: "center", alignItems: "center", flex: 1}} size={150} color={"#4b37bc"}/>
    )
}
