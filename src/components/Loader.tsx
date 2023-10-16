import Spinner from "react-native-spinkit";
import React from "react";
import {colors} from "../../assets/colors/colors";

export const Loader = () => {
    return (
        <Spinner type={"WanderingCubes"} style={{alignSelf: "center", justifyContent: "center", alignItems: "center", flex: 1}} size={150} color={colors.BLUE}/>
    )
}
