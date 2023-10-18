import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from "../../redux/actions/loginAction";
import {loadUser} from "../../redux/actions/loadUser";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Formik} from "formik";
import {styles} from "./style";
import {loginValidationSchema} from "./validationScheme";
import Animated from 'react-native-reanimated';
import {resetError} from "../../redux/actions/resetError";
import {displayMessage} from "../../utils/displayMessage";
import {RootState} from "../../redux/reducers/rootReducer";
import {AnimatedText} from "./AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";
import {COLORS} from "../../../constants/colors/colors";
import {Loader} from "../../components/Loader/Loader";

export const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSubmit = (values: { email: string, password: string }) => {
        console.log(values.email)
        loginUser(values.email, values.password)(dispatch);
    };
    const selectError = (state: RootState) => state.user.error;
    const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
    const error = useSelector(selectError);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const selecLoading = (state: RootState) => state.user.loading;
    const loading = useSelector(selecLoading);

    // useEffect(() => {
    //     console.log("here >> loginScreen")
    //     if (error) {
    //         displayErrorMessage(error)
    //     }
    //     if (isAuthenticated) {
    //         loadUser()(dispatch);
    //         displayErrorMessage('Login successful!')
    //     }
    // }, [isAuthenticated, error, dispatch]);

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("here >> login >> resetError")
    //         resetError()(dispatch);
    //     }, [])
    // );

    useFocusEffect(
        useCallback(() => {
            console.log("here >> loginScreen")
            if (error) {
                displayMessage(error)
                resetError()(dispatch);
            }
            if (isAuthenticated) {
                loadUser()(dispatch);
                displayMessage('Login successful!')
            }
        }, [isAuthenticated, error, dispatch, navigation])
    );

    return (
        <View style={{flex: 1, backgroundColor: COLORS.WHITEBLUE}}>
            {/*<Toast ref={toastRef}/>*/}
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
                                    {errors.email &&
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
                                    {errors.password &&
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


