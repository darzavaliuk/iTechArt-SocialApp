import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({min}) => `Password must be at least ${min} characters`)
        .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
        .matches(/[0-9]/, 'Password must contain at least 1 digit')
        .required('Password is required'),
})

export const emailValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
})
