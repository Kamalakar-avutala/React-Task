import * as yup from 'yup';


const emailField = yup
  .string()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address')
  .email('Please enter a valid email')
  .required('Email is required');

const passwordField = yup
  .string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');


const userNameField = yup
    .string()
    .min(6, 'Username must be at least 6 characters long')
    .max(24, 'Username not more than 24 characters')
    .required('Username is required');


//loginschema
const loginSchema = yup.object().shape({
  email: emailField,
  password: passwordField,
});

//signupschema
const signupSchema = yup.object().shape({
  email: emailField,
  password: passwordField,
  userName: userNameField,
});

//expense schema
export const expenseSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(6, 'Title must be at least 6 characters')
    .max(24, 'Title not more than 24 characters'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(0, 'Amount must be greater than 0'),
  category: yup
    .string()
    .required('Category is required'),
  date: yup
    .date()
    .nullable()
    .typeError('Invalid date')
    .required('Date is required'),
});

const Validations = {
  loginSchema,
  signupSchema,
  expenseSchema
};

export default Validations;




   




