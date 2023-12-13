import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .required('Password is required'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please repeat your password'),
  name: yup.string().min(5, 'Name must be at least 5 characters').required('Name is required'),
});
