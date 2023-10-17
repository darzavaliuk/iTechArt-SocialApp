import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    circleLittle: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#4b37bc',
        position: 'absolute',
        top: -40,
        left: -40,
    },
    animatedContainer: {
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 5,
        // alignSelf: "center"
    },
    circleBig: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: '#0a1e51',
        position: 'absolute',
        top: 250,
        right: -130,
    },
    circleDown: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#52d3fc',
        position: 'absolute',
        top: 600,
        left: -120,
    },
    title: {
        color: COLORS.DARKBLUE,
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 60,

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
        zIndex: 100,
        top: 18,
        left: 15,
    },
    loginText: {
        fontFamily: FONT_FAMILY.REGULAR,
        fontWeight: "900",
        color: COLORS.WHITE,
        fontSize: 24
    },
    loginButton: {
        position: "absolute",
        backgroundColor: COLORS.DARKBLUE,
        width: 160,
        bottom: 100,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: COLORS.WHITEBLUE
    },
    signUpText: {
        color: COLORS.DARKBLUE,
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "center"
    },
    forgetText: {
        color: COLORS.DARKBLUE,
        fontSize: 16,
        marginLeft: 45
    },
    signUpButton: {
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "black",
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 16,

    },
    error: {
        fontSize: 12,
        fontFamily: FONT_FAMILY.REGULAR,
        letterSpacing: -0.3,
        color: "red",
        marginLeft: 45
    }
})
