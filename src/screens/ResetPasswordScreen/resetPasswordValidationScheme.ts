import * as yup from "yup";

export const resetPasswordValidationScheme = yup.object().shape({
    password: yup
        .string()
        .min(8, ({min}) => `Password must be at least ${min} characters`)
        .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
        .matches(/[0-9]/, 'Password must contain at least 1 digit')
        .required('Password is required'),
    passwordRepeat: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please repeat your password'),
})
