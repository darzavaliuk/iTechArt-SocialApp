import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../redux/actions/resetPassword";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Formik} from "formik";
import {styles} from "./style";
import {resetPasswordValidationScheme} from "./resetPasswordValidationScheme";
import {RootState} from "../../redux/reducers/rootReducer";
import {displayErrorMessage} from "../../utils/displayMessage";
import {resetError} from "../../redux/actions/resetError";
import {Loader} from "../../components/Loader/Loader";

export const ResetPasswordScreen = () => {
    const selectEmail = (state: RootState) => state.user.email;
    const email = useSelector(selectEmail);
    const navigation = useNavigation();
    const selectError = (state: RootState) => state.user.error;
    const error = useSelector(selectError);
    const selecLoading = (state: RootState) => state.user.loading;
    const loading = useSelector(selecLoading);

    const handleSubmit = (values: { password: string, passwordRepeat: string }) => {
        console.log(values.password, email)
        resetPassword(email, values.password)(dispatch).then(() => {
            if (!error) {
                navigation.navigate('Login' as never)
            }
        })

    }

    useFocusEffect(
        useCallback(() => {
            console.log("here >> forget")
            // if (code) {
            //     navigation.navigate('Login' as never)
            // }
            if (error) {
                displayErrorMessage(error)
                console.log("here >> forget >> error")
                resetError()(dispatch);
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

