import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image, StyleSheet,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from "../../redux/actions/loginAction";
import {loadUser} from "../../redux/actions/loadUser";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Formik} from "formik";
import {loginValidationSchema} from "./validationScheme";
import Animated from 'react-native-reanimated';
import {RootState} from "../../redux/reducers/rootReducer";
import {AnimatedText} from "./AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";
import {Loader} from "../../components/Loader/Loader";
import {resetErrorRequest} from "../../redux/actions/resetError";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";
import ToastContext from "../../context/toasterContext";
import {ToastType} from "../../../constants/toastTypes/toastTypes";
import {selectError, selectIsAuthenticated, selectLoading} from "../../redux/selectors";

export const LoginScreen = () => {
    const {showToast} = useContext(ToastContext);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSubmit = (values: { email: string, password: string }) => {
        loginUser(values.email, values.password)(dispatch);
    };

    const error = useSelector(selectError);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectLoading);

    useFocusEffect(
        useCallback(() => {
            if (error) {
                showToast(ToastType.ERROR, error, 3000);
                dispatch(resetErrorRequest);
            }
            if (isAuthenticated) {
                loadUser()(dispatch);
                showToast(ToastType.SUCCESS, 'Login successful!', 3000);
            }
        }, [isAuthenticated, error, dispatch, navigation])
    );

    return (
        <View style={styles.wrapper}>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{email: '', password: ''}}
                        onSubmit={handleSubmit}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                              touched
                          }) => (<>
                            <Animated.View style={styles.container}>
                                <AnimatedBackground/>
                                <View style={{flex: 1}}>
                                    <AnimatedText text={"Login"} typingSpeed={500}/>
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
                                    {touched.email && errors.email &&
                                        <Text style={styles.error}>{errors.email}</Text>
                                    }
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Image source={require("../../../assets/images/password.png")}
                                               style={styles.image}/>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            secureTextEntry={true}
                                            id="password"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                        />
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={styles.error}>{errors.password}</Text>
                                    }
                                    <Text style={styles.forgetText}
                                          onPress={() => navigation.navigate('ForgetPassword' as never)}>
                                        Forget password?
                                    </Text>
                                </View>
                            </Animated.View>
                            <View style={{display: "flex", alignItems: 'center'}}>
                                <TouchableOpacity style={styles.loginButton}>
                                    <Text style={styles.loginText} disabled={!isValid}
                                          onPress={handleSubmit}>
                                        Login
                                    </Text>
                                </TouchableOpacity>

                                <Text style={styles.signUpText}
                                      onPress={() => navigation.navigate('Signup' as never)}>
                                    Don't have an account?
                                    <Text style={styles.signUpButton}> Sign up</Text>
                                </Text>
                            </View>
                        </>)}
                    </Formik>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.WHITEBLUE
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


