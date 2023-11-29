import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {forgetPassword} from "../../redux/actions/forgetPassword";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {emailValidationSchema} from "../LoginScreen/validationScheme";
import {Formik} from "formik";
import {Loader} from "../../components/Loader/Loader";
import {AnimatedText} from "./AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";
import {resetErrorRequest} from "../../redux/actions/resetError";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";
import {ToastType} from "../../../constants/toastTypes/toastTypes";
import ToastContext from "../../context/toasterContext";
import {selectCode, selectError, selectLoading} from "../../redux/selectors";

export const ForgetPasswordScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {showToast} = useContext(ToastContext);

    const loading = useSelector(selectLoading);
    const code = useSelector(selectCode);
    const error = useSelector(selectError);

    useFocusEffect(
        useCallback(() => {
            if (code) {
                navigation.navigate('CodeVerify' as never)
            }
            if (error) {
                showToast(ToastType.ERROR, error, 3000);
                dispatch(resetErrorRequest);
            }

        }, [code, error])
    );

    const handleSubmit = (values: { email: string }) => {
        forgetPassword(values.email)(dispatch)
    };

    return (
        <View style={styles.wrapper}>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <Formik
                        validationSchema={emailValidationSchema}
                        initialValues={{email: ''}}
                        onSubmit={handleSubmit}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                          }) => (<>
                                <View style={styles.container}>
                                    <AnimatedBackground/>
                                    <AnimatedText/>
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Image source={require("../../../assets/images/mail.png")}
                                               style={styles.image}/>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            id="email"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />
                                    </View>
                                    {errors.email &&
                                        <Text style={styles.error}>{errors.email}</Text>
                                    }
                                    <TouchableOpacity style={styles.loginButton}>
                                        <Text disabled={!isValid}
                                              style={styles.loginText}
                                              onPress={handleSubmit}>
                                            Send email
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </>
                        )}
                    </Formik>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
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

})





