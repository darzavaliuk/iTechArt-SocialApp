import {StyleSheet} from "react-native";
import {colors} from "../../../assets/colors/colors";
import {fontFamily} from "../../../assets/fontFamily/fontFamily";
import {fontSizes} from "../../../assets/fontSizes/fontSizes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITEBLUE
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
        backgroundColor: colors.WHITE,
        fontSize: fontSizes.SUBTITLE,
        letterSpacing: -1,
        fontFamily: fontFamily.REGULAR,
        marginVertical: 5,
        margin: 5,
        borderRadius: 20,
        width: 60,
        textAlign: "center",
        borderColor: colors.LIGHTGREY,
        borderWidth: 1
    },
    submitButton: {
        alignSelf: "center",
        backgroundColor: colors.WHITE,
        borderRadius: 50,
        padding: 20,
        borderWidth: 2,
        borderColor: "black"
    },
    text: {
        fontSize: fontSizes.NORMAL,
        color: "black"
    },
    title: {
        color: colors.DARKBLUE,
        fontFamily: fontFamily.EXTRABOLD,
        fontSize: fontSizes.TITLE,
        alignSelf: "center",
        zIndex: 1,
    },
    verifyCodeText: {
        fontFamily: fontFamily.REGULAR,
        fontWeight: "900",
        color: colors.WHITE,
        fontSize: fontSizes.BUTTON,
    },
    verifyCodeButton: {
        backgroundColor: colors.DARKBLUE,
        width: 140,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        alignSelf: "center",
        margin: 20
    },
    circleUp: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: colors.BLUE,
        position: 'absolute',
        top: 260,
        zIndex: 0,
        left: 170,
    },
    circleDown: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: colors.LIGHTBLUE,
        position: 'absolute',
        bottom: 260,
        zIndex: 0,
        borderColor: colors.DARKBLUE,
        left: 0,
    },
})
