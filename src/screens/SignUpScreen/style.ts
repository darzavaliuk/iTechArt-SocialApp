import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "#0e1c4c",
        fontFamily: "CodeNext-ExtraBold",
        fontSize: 60,
    },
    input: {
        backgroundColor: "#f0f6fc",
        borderRadius: 40,
        paddingLeft: 45,
        paddingRight: 10,
        marginRight: 0,
        marginHorizontal: -20,
        fontSize: 20,
        letterSpacing: -1,
        fontFamily: "CodeNext-Trial-Regular",
        flex: 1,
        marginVertical: 5,

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
        fontFamily: "CodeNext-Trial-Regular",
        letterSpacing: -0.3,
        color: "red",
    },
    signUpText: {
        color: "#0e1c4c",
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    signUpButton: {
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "black",
        fontFamily: "CodeNext-ExtraBold",
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        fontFamily: "CodeNext-Trial-Regular",
        fontWeight: "900",
        color: "#f0f6fc",
        fontSize: 24
    },
    loginButton: {
        backgroundColor: "#0e1c4c",
        width: 160,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "#dbe9f6",
        margin: 10,
    },
    circleLittle: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#4b37bc', //#b8c5d5
        position: 'absolute',
        top: -40,
        right: -160,
    },
    circleBig: {
        width: 300,
        height: 300,
        borderRadius: 300,
        backgroundColor: '#0a1e51', //#b8c5d5
        position: 'absolute',
        top: 250,
        left: -170,
    },
    circleDown: {
        width: 200,
        height: 200,
        borderRadius: 300,
        backgroundColor: '#52d3fc', //#b8c5d5
        position: 'absolute',
        top: 600,
        right: -80,
    },
    animatedContainer: {
        height: 80,
    },
})
