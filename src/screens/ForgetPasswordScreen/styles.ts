import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.WHITEBLUE
    },
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        paddingHorizontal: 20,
    },
    title: {
        color: COLORS.DARKBLUE,
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 60,
        alignSelf: "flex-end"
    },
    input: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 40,
        paddingLeft: 45,
        paddingRight: 10,
        marginRight: 0,
        marginHorizontal: -20,
        fontSize: 20,
        letterSpacing: -1,
        fontFamily: FONT_FAMILY.REGULAR,
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
        fontFamily: FONT_FAMILY.REGULAR,
        letterSpacing: -0.3,
        color: "red",
        marginLeft: 45
    },
    signUpText: {
        color: COLORS.DARKBLUE,
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "center"
    },
    signUpButton: {
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "black",
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 16,

    },
    loginText: {
        fontFamily: FONT_FAMILY.REGULAR,
        fontWeight: "900",
        color: COLORS.WHITE,
        fontSize: 24
    },
    loginButton: {
        backgroundColor: COLORS.DARKBLUE,
        width: 160,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: COLORS.WHITEBLUE,
        margin: 10,
        alignSelf: "flex-end"
    },
    circleBig: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: '#0a1e51',
        position: 'absolute',
        top: 250,
        left: -170,
    },
    circleLittle: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#52d3fc',
        position: 'absolute',
        top: -0,
        right: -100,
    },
    circleDown: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#4b37bc',
        position: 'absolute',
        top: 750,
        right: 50,
    },
})
