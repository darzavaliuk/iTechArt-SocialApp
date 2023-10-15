import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {styles} from "./style";
import Animated from "react-native-reanimated";
import {displayErrorMessage} from "../utils/displayMessage";
import {RootState} from "../../redux/reducers/rootReducer";
import {AnimatedBackground} from "./AnimatedBackground";

export const CodeVerify = () => {
    const [codeActual, setCode] = useState(["", "", "", ""])
    const navigation = useNavigation();
    const {code} = useSelector((state: RootState) => state.user);
    const inputs: React.RefObject<(TextInput | null)[]> = useRef([]);

    const submitHandler = () => {
        console.log(codeActual, code)
        if (codeActual.join("") === code) {
            navigation.navigate('ResetPassword' as never)
        } else {
            displayErrorMessage('Code not match!')
        }
    }

    const handleChange = (text: string, index: number) => {
        const newCodeValues = [...codeActual];
        newCodeValues[index] = text;
        setCode(newCodeValues);
        if (text.length === 1 && index < 3 && inputs?.current) {
            const nextInput = inputs.current[index + 1] as { focus: () => void };
            nextInput.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Code: </Text>
                <View style={styles.codeView}>
                    <AnimatedBackground/>
                    {Array.from({length: 4}, (_, index) => (
                        <TextInput style={styles.code}
                                   key={index}
                                   ref={(ref) => (inputs.current ? inputs.current[index] = ref : null)}
                                   value={codeActual[index]}
                                   maxLength={1}
                                   onChangeText={text => {
                                       handleChange(text, index)
                                   }}/>
                    ))}
                </View>
                <TouchableOpacity style={styles.verifyCodeButton}>
                    <Text
                        style={styles.verifyCodeText}
                        onPress={submitHandler}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
