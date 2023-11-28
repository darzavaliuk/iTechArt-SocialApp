import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../redux/actions/resetPassword";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Formik} from "formik";
import {resetPasswordValidationScheme} from "./resetPasswordValidationScheme";
import {RootState} from "../../redux/reducers/rootReducer";
import {resetErrorRequest} from "../../redux/actions/resetError";
import {Loader} from "../../components/Loader/Loader";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";
import {ToastType} from "../../../constants/toastTypes/toastTypes";
import ToastContext from "../../context/toasterContext";

const selectLoading = (state: RootState) => state.user.loading;
const selectError = (state: RootState) => state.user.error;
const selectEmail = (state: RootState) => state.user.email;

export const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const {showToast} = useContext(ToastContext);

    const email = useSelector(selectEmail);
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);

    const handleSubmit = async (values: { password: string, passwordRepeat: string }) => {
        await resetPassword(email, values.password)(dispatch)
        if (!error) {
            navigation.navigate('Login' as never)
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (error) {
                showToast(ToastType.ERROR, error, 3000);
                dispatch(resetErrorRequest);
            }
        }, [error])
    );

    const dispatch = useDispatch();

    return (
        <View style={styles.wrapper}>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <Formik
                        validationSchema={resetPasswordValidationScheme}
                        initialValues={{passwordRepeat: '', password: ''}}
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
                                <Text style={styles.title}>New Password</Text>
                                <View style={{display: "flex", flexDirection: "row"}}>
                                    <Image source={require("../../../assets/images/password.png")}
                                           style={styles.image}/>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        id="password"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        keyboardType="visible-password"
                                    />
                                </View>
                                {errors.password &&
                                    <Text style={styles.error}>{errors.password}</Text>
                                }
                                <View style={{display: "flex", flexDirection: "row"}}>
                                    <Image source={require("../../../assets/images/password.png")}
                                           style={styles.image}/>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Repeat password"
                                        id="passwordRepeat"
                                        onChangeText={handleChange('passwordRepeat')}
                                        onBlur={handleBlur('passwordRepeat')}
                                        value={values.passwordRepeat}

                                    />
                                </View>
                                {errors.passwordRepeat &&
                                    <Text style={styles.error}>{errors.passwordRepeat}</Text>
                                }
                                <TouchableOpacity style={styles.loginButton}>
                                    <Text style={styles.loginText} disabled={!isValid}
                                          onPress={handleSubmit}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>)}
                    </Formik>)}
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
    title: {
        color: COLORS.DARKBLUE,
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 46,
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
        // color: "#f0f6fc",
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
        margin: 10
    },
})


