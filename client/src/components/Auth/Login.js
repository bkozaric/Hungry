import React, { Fragment, useState, useContext } from 'react';
import { useSessionInfo } from "../../SessionContext";
import Logout from "./Logout"

import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const sessionInfo = useSessionInfo();
    const [success, setSuccess] = useState(true);
    const [loginMessage, setLoginMessage] = useState(null)

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .min(4, 'E-mail too short')
            .max(50, 'E-mail too long')
            .required('Please enter a email'),
        password: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .required('Please enter a password'),
    });

    const login = async (values) => {
        setSuccess(true);
        try {
            const body = { email: values.email, password: values.password };
            await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(answer => answer.json())
                .then(data => {
                    if (data.login === 1) {
                        window.location = "/";
                    }
                    else {
                        setLoginMessage(data.message);
                        setSuccess(false);
                    }
                });
        }
        catch (err) {
            console.error(err);
        }
    };

    if (sessionInfo.logged === 1) {
        return <Logout />
    }
    else if (sessionInfo.logged === 0) {
        return <div className="auth-container">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={SigninSchema}
                onSubmit={(values) => {
                    login(values);
                }}
            >
                {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                    <form className="input-info-container login-form" onSubmit={handleSubmit}>
                        <div className="input-row">
                            <div className="input-column">
                                <label htmlFor="email">Email:</label>
                                <input
                                    name="email"
                                    type="email"
                                    className={errors.email && touched.email ? "form-input-error" : null}
                                    value={values.email}
                                    onChange={(e) => setFieldValue("email", e.target.value)}
                                />
                            </div>
                            {errors.email && touched.email ? (
                                <Fragment><span>{errors.email}</span></Fragment>
                            ) : null}
                        </div>

                        <div className="input-row">
                            <div className="input-column">
                                <label htmlFor="password">Password:</label>
                                <input
                                    name="password"
                                    type="password"
                                    className={errors.password && touched.password ? "form-input-error" : null}
                                    value={values.password}
                                    onChange={(e) => setFieldValue("password", e.target.value)}
                                    required

                                />
                            </div>
                            {errors.password && touched.password ? (
                                <Fragment><span>{errors.password}</span></Fragment>
                            ) : null}
                        </div>
                        <div className="input-row">
                            <button className="submit-button" type="submit">Login</button>
                        </div>
                        <p className="auth-note">Don't have an account? Register <a href="/register">here</a></p>
                        {!success && <p className="error-msg">{loginMessage}</p>}


                    </form>)}
            </Formik>
        </div>
    }
    else {
        return null;
    }
}

export default Login;
