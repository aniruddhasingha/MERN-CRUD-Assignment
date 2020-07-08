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
    email: '',
    password: ''
}
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string().required('Password is required')
});
function Login() {
    const authContext = useContext(AuthContext)
    const [loginSuccess, setloginSuccess] = useState();
    const [loginError, setloginError] = useState();
    const [loginLoading, setLoginLoading] = useState(false);
    const [redirectOnLogin, setRedirectOnLogin] = useState(false)
    const submitCredentials = async credentials => {
        try {
            // console.log(`credentials ${JSON.stringify(credentials)}`)
            setLoginLoading(true);
            const { data } = await publicFetch.post('authenticate', credentials)

            authContext.setAuthState(data);
            // console.log(data)
            setloginSuccess(data.message)
            setloginError('');
            setTimeout(() => {
                setRedirectOnLogin(true)
            }, 700);
            // redirect to dashboard

        } catch (error) {
            setLoginLoading(false);
            const { data } = error.response;
            setloginError(data.message);
            setloginSuccess('');
            // console.log('error ho gaya hain')
        }
    };
    return (
        <>
            {redirectOnLogin && <Redirect to='/userDetails' />}
            <h1>Login Form</h1>
            <Formik initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values) => submitCredentials(values)}>
                <Form>
                    {loginSuccess && <FormSuccess text={loginSuccess} />}
                    {loginError && <FormError text={loginError} />}
                    <label htmlFor='email'>Email</label>
                    <Field type='email'
                        name='email'
                        id="signin-email"
                        placeholder="Email"
                        style={{
                            'width': '20%',
                            'padding': '12px 20px',
                            'margin': '8px 8px',
                            'box-sizing': 'border-box'
                        }}
                    />
                    <br />
                    <ErrorMessage name='email' />
                    <br />
                    <label htmlFor='password'>Password</label>
                    <Field
                        type="password"
                        id="signin-password"
                        placeholder="Password"
                        name="password"
                        style={{
                            'width': '20%',
                            'padding': '12px 20px',
                            'margin': '8px 8px',
                            'box-sizing': 'border-box'
                        }}
                    />
                    <br />
                    <ErrorMessage name='password' />
                    <br />
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
                    >Log In</button>
                </Form>
            </Formik >
            <br />
            <Link to="/signup">Dont Have an Account Click here to SignUp</Link>
        </>
    )
}

export default Login



