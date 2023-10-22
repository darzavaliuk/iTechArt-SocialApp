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
import {displayMessage} from "../../utils/displayMessage";
import {resetErrorRequest} from "../../redux/actions/resetError";

const selectLoading = (state: RootState) => state.user.loading;
const selectCode = (state: RootState) => state.user.code;
const selectError = (state: RootState) => state.user.error;

export const ForgetPasswordScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const loading = useSelector(selectLoading);
    const code = useSelector(selectCode);
    const error = useSelector(selectError);

    useFocusEffect(
        useCallback(() => {
            if (code) {
                navigation.navigate('CodeVerify' as never)
            }
            if (error) {
                displayMessage(error)
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




