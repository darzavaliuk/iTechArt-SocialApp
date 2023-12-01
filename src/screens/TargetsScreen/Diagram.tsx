import CircularProgress from "react-native-circular-progress-indicator";
import React, {useState} from "react";

export const Diagram = ({el, value}) => {
    return (
        <CircularProgress key={el.text} value={value / el.maxValue * 100}/>
    )
}
