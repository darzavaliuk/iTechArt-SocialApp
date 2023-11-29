import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useContext, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {AnimatedBackground} from "./AnimatedBackground";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_SIZES} from "../../../constants/fontSizes/fontSizes";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";
import ToastContext from "../../context/toasterContext";
import {ToastType} from "../../../constants/toastTypes/toastTypes";
import {selectCode} from "../../redux/selectors";

export const CodeVerify = () => {
    const [codeActual, setCode] = useState(["", "", "", ""])
    const navigation = useNavigation();
    const {showToast} = useContext(ToastContext);

    const code = useSelector(selectCode);
    const inputs: React.RefObject<(TextInput | null)[]> = useRef([]);

    const submitHandler = () => {
        const isCodeMatch = codeActual.join("") === code;

        if (isCodeMatch) {
            navigation.navigate('ResetPassword' as never);
        } else {
            showToast(ToastType.ERROR, 'Code does not match!', 3000);
        }
    };

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITEBLUE
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    codeView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    code: {
        backgroundColor: COLORS.WHITE,
        fontSize: FONT_SIZES.SUBTITLE,
        letterSpacing: -1,
        fontFamily: FONT_FAMILY.REGULAR,
        marginVertical: 5,
        margin: 5,
        borderRadius: 20,
        width: 60,
        textAlign: "center",
        borderColor: COLORS.LIGHTGREY,
        borderWidth: 1
    },
    submitButton: {
        alignSelf: "center",
        backgroundColor: COLORS.WHITE,
        borderRadius: 50,
        padding: 20,
        borderWidth: 2,
        borderColor: "black"
    },
    text: {
        fontSize: FONT_SIZES.NORMAL,
        color: "black"
    },
    title: {
        color: COLORS.DARKBLUE,
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: FONT_SIZES.TITLE,
        alignSelf: "center",
        zIndex: 1,
    },
    verifyCodeText: {
        fontFamily: FONT_FAMILY.REGULAR,
        fontWeight: "900",
        color: COLORS.WHITE,
        fontSize: FONT_SIZES.BUTTON,
    },
    verifyCodeButton: {
        backgroundColor: COLORS.DARKBLUE,
        width: 140,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        alignSelf: "center",
        margin: 20
    }
})

