import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {forgetPassword} from "../../redux/actions/forgetPassword";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {emailValidationSchema} from "../LoginScreen/validationScheme";
import {Formik} from "formik";
import {styles} from "./styles";
import {Loader} from "../../components/Loader/Loader";
import {RootState} from "../../redux/reducers/rootReducer";
import {AnimatedText} from "./AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";
import {resetError} from "../../redux/actions/resetError";
import {displayMessage} from "../../utils/displayMessage";

export const ForgetPasswordScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const selecLoading = (state: RootState) => state.user.loading;
    const loading = useSelector(selecLoading);
    const selectCode = (state: RootState) => state.user.code;
    const code = useSelector(selectCode);
    const selectError = (state: RootState) => state.user.error;
    const error = useSelector(selectError);

    // useEffect(() => {
    //     resetError()(dispatch);
    // }, [])

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("here >> forget >> resetError")
    //         resetError()(dispatch);
    //     }, [])
    // );

    useFocusEffect(
        useCallback(() => {
            console.log("here >> forget")
            if (code) {
                navigation.navigate('CodeVerify' as never)
            }
            if (error) {
                displayMessage(error)
                console.log("here >> forget >> error")
                resetError()(dispatch);
            }

        }, [code, error])
    );

    // useFocusEffect(() => {
    //     if (code) {
    //         navigation.navigate('CodeVerify' as never)
    //     }
    //     if (error) {
    //         displayErrorMessage(error)
    //         console.log("here >> forget")
    //     }
    // }, []);

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




