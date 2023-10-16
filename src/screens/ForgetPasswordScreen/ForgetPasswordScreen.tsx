import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {forgetPassword} from "../../redux/actions/forgetPassword";
import {useNavigation} from "@react-navigation/native";
import {emailValidationSchema} from "../LoginScreen/validationScheme";
import {Formik} from "formik";
import {styles} from "./styles";
import {Loader} from "../../components/Loader";
import {displayErrorMessage} from "../../utils/displayMessage";
import {RootState} from "../../redux/reducers/rootReducer";
import {AnimatedText} from "./AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";

export const ForgetPasswordScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false)
    const {error} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        console.log(error)
        if (error) {
            displayErrorMessage('Email not exist!')
        }
    }, [error]);

    const handleSubmit = (values: { email: string }) => {
        setLoading(true)
        console.log("submit")
        console.log(values)
        forgetPassword(values.email)(dispatch).then(() => {
                setLoading(false);
                if (!error)
                    navigation.navigate('CodeVerify' as never)
            }
        )
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




