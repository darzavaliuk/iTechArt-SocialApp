import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";
import {FONT_SIZES} from "../../../constants/fontSizes/fontSizes";

export const styles = StyleSheet.create({
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
    },
    circleUp: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: COLORS.BLUE,
        position: 'absolute',
        top: 260,
        zIndex: 0,
        left: 170,
    },
    circleDown: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: COLORS.LIGHTBLUE,
        position: 'absolute',
        bottom: 260,
        zIndex: 0,
        borderColor: COLORS.DARKBLUE,
        left: 0,
    },
})
