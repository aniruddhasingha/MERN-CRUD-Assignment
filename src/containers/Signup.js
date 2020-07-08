import React, { useContext, useState } from 'react'
import { Redirect, Link } from "react-router-dom";
import { publicFetch } from "../util/fetch";

import { Form, Formik, Field, ErrorMessage } from "formik";
import FormSuccess from "../components/FormSuccess";
import FormError from "../components/FormError";
// import GradientButton from "../components/GradientButton";
import * as Yup from "yup";
import { AuthContext } from '../context/AuthContext';
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}
const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(
        'First name is required'
    ),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string().required('Password is required')
});
function Signup() {
    const authContext = useContext(AuthContext)
    const [signupSuccess, setSignupSuccess] = useState();
    const [signupError, setSignupError] = useState();
    const [loginLoading, setLoginLoading] = useState(false);
    const [redirectOnLogin, setRedirectOnLogin] = useState(false)
    const submitCredentials = async credentials => {
        try {
            // console.log(`credentials ${JSON.stringify(credentials)}`)
            setLoginLoading(true);
            const { data } = await publicFetch.post('signup', credentials)
            authContext.setAuthState(data);
            // console.log(data)
            setSignupSuccess(data.message)
            setSignupError('');
            setTimeout(() => {
                setRedirectOnLogin(true)
            }, 700);
            // redirect to dashboard

        } catch (error) {
            setLoginLoading(false);
            const { data } = error.response;
            setSignupError(data.message);
            setSignupSuccess('');
            // console.log('error ho gaya hain')
        }
    };
    return (
        <>
            {redirectOnLogin && <Redirect to='/userDetails' />}
            <h1>Signup Form</h1>
            <Formik initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={(values) => submitCredentials(values)}>
                <Form>
                    {signupSuccess && <FormSuccess text={signupSuccess} />}
                    {signupError && <FormError text={signupError} />}
                    <label htmlFor='firstName'>First name</label>
                    <Field style={{
                        'width': '20%',
                        'padding': '12px 20px',
                        'margin': '8px 8px',
                        'box-sizing': 'border-box'
                    }} type='text' id='firstname' name='firstName' placeholder="First Name" />
                    <br />
                    <ErrorMessage name='firstName' />
                    <br />
                    <label htmlFor='lastName'>Last name</label>
                    <Field style={{
                        'width': '20%',
                        'padding': '12px 20px',
                        'margin': '8px 8px',
                        'box-sizing': 'border-box'
                    }} type='text' id='lastName' name='lastName' placeholder="Last Name" />
                    <br />
                    <ErrorMessage name='lastName' />
                    <br />
                    <label htmlFor='email'>Email</label>
                    <Field style={{
                        'width': '20%',
                        'padding': '12px 20px',
                        'margin': '8px 8px',
                        'box-sizing': 'border-box'
                    }} type='email'
                        name='email'
                        id="signin-email"
                        placeholder="Email"
                    />
                    <br />
                    <ErrorMessage name='email' />
                    <label htmlFor='password'>Password</label>
                    <Field
                        style={{
                            'width': '20%',
                            'padding': '12px 20px',
                            'margin': '8px 8px',
                            'box-sizing': 'border-box'
                        }}
                        type="password"
                        id="signin-password"
                        placeholder="Password"
                        name="password" />
                    <ErrorMessage name='password' />

                    <button
                        type='submit'
                        onClick={loginLoading}
                        style={{

                            'backgroundColor': '#008CBA', /* Green */
                            'border': '1px solid black',
                            'color': 'white',
                            'padding': '10px 20px',
                            'text-align': 'center',
                            'text-decoration': 'none',
                            'display': 'inline-block',
                            'font-size': '10px'
                        }}
                    >Sign Up</button>
                </Form>
            </Formik >
            <br />
            <Link to="/login">Already have an account click here to go to login page</Link>
        </>
    )
}

export default Signup



