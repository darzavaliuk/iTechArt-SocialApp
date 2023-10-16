import {StyleSheet} from "react-native";
import {colors} from "../../../assets/colors/colors";
import {fontFamily} from "../../../assets/fontFamily/fontFamily";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.WHITEBLUE
    },
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        paddingHorizontal: 20,
    },
    title: {
        color: colors.DARKBLUE,
        fontFamily: fontFamily.EXTRABOLD,
        fontSize: 46,
    },
    input: {
        backgroundColor: colors.WHITE,
        borderRadius: 40,
        paddingLeft: 45,
        paddingRight: 10,
        marginRight: 0,
        marginHorizontal: -20,
        fontSize: 20,
        letterSpacing: -1,
        fontFamily: fontFamily.REGULAR,
        flex: 1,
        marginVertical: 5
    },
    image: {
        height: 20,
        width: 20,
        zIndex: 1000,
        top: 18,
        left: 15,
    },
    error: {
        fontSize: 12,
        fontFamily: fontFamily.REGULAR,
        letterSpacing: -0.3,
        color: "red",
        marginLeft: 45
    },
    signUpText: {
        color: colors.DARKBLUE,
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "center"
    },
    signUpButton: {
        // color: "#f0f6fc",
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "black",
        fontFamily: fontFamily.EXTRABOLD,
        fontSize: 16,

    },
    loginText: {
        fontFamily: fontFamily.REGULAR,
        fontWeight: "900",
        color: colors.WHITE,
        fontSize: 24
    },
    loginButton: {
        backgroundColor: colors.DARKBLUE,
        width: 160,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: colors.WHITEBLUE,
        margin: 10
    },
})
