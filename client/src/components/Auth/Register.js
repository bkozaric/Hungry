import React, { Fragment, useEffect, useState, useContext } from 'react';

import { useSessionInfo } from "../../SessionContext";

import Logout from "./Logout"

import { Formik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const sessionInfo = useSessionInfo();

    const [success, setSuccess] = useState(null);
    const [registrationMessage, setRegistrationMessage] = useState(null)

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required('Please enter your email address'),
        emailAgain: Yup.string()
            .required('Please enter your email address again')
            .oneOf([Yup.ref('email'), null], "Email addresses do not match"),
        password: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .required('Please enter a password'),
        passwordAgain: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .required('Please enter a password')
            .oneOf([Yup.ref('password'), null], "Passwords do not match"),
        firstName: Yup.string()
            .required('Please enter your first name'),
        lastName: Yup.string()
            .required('Please enter your last name'),
        phone: Yup.number()
            .min(100000, "Please enter a valid phone number")
            .required('Please enter your phone number')
            .integer("Please enter a valid phone number")
            .typeError("Please enter a valid phone number"),
        address: Yup.string()
            .required('Please enter your address'),
        city: Yup.string()
            .required('Please enter your city'),
        zipcode: Yup.string()
            .required("Please enter your zip code")
            .min(3, "Please enter a valid zip code")
    });

    const register = async (values) => {
        setSuccess(null);
        try {
            const body = { ...values };
            await fetch("/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(answer => answer.json())
                .then(data => {
                    if (data.success === 1) {
                        setSuccess(true);
                        setRegistrationMessage("Registration successful! A link has been sent to  your email. Please verify your account before loging in.");
                        setTimeout(() => {
                            window.location = "/";
                        }, 5000);
                    }
                    else {
                        setSuccess(false);
                        setRegistrationMessage(data.message);
                    }
                });
        }
        catch (err) {
            console.error(err);
        }
    }

    if (sessionInfo.logged === 1) {
        return <Logout />
    }
    else if (sessionInfo.logged === 0) {
        return (
            <div className="auth-container">
                <Formik
                    initialValues={{
                        email: "",
                        emailAgain: "",
                        password: "",
                        passwordAgain: "",
                        firstName: "",
                        lastName: "",
                        city: "",
                        zipcode: "",
                        address: "",
                        phone: ""
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        register(values);
                    }}
                >
                    {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                        <form className="input-info-container" onSubmit={handleSubmit}>
                            <div className="input-row">
                                <div className="input-column">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        value={values.email}
                                        onChange={(e) => setFieldValue("email", e.target.value)}
                                        className={errors.email && touched.email ? "form-input-error" : null}
                                        type="email" name="email" required />
                                </div>
                                {errors.email && touched.email ? (
                                    <Fragment><span>{errors.email}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <label htmlFor="emailAgain">Repeat Email:</label>
                                    <input
                                        value={values.emailAgain}
                                        onChange={(e) => setFieldValue("emailAgain", e.target.value)}
                                        className={errors.emailAgain && touched.emailAgain ? "form-input-error" : null}
                                        type="email" name="emailAgain" required />
                                </div>
                                {errors.emailAgain && touched.emailAgain ? (
                                    <Fragment><span>{errors.emailAgain}</span></Fragment>
                                ) : null}
                                <div className="input-column increase-tmargin">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        value={values.password}
                                        onChange={(e) => setFieldValue("password", e.target.value)}
                                        className={errors.password && touched.password ? "form-input-error" : null}
                                        type="password" name="password" required />
                                </div>
                                {errors.password && touched.password ? (
                                    <Fragment><span>{errors.password}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <label htmlFor="passwordAgain">Repeat Password:</label>
                                    <input
                                        value={values.passwordAgain}
                                        onChange={(e) => setFieldValue("passwordAgain", e.target.value)}
                                        className={errors.passwordAgain && touched.passwordAgain ? "form-input-error" : null}
                                        type="password" name="passwordAgain" required />
                                </div>
                                {errors.passwordAgain && touched.passwordAgain ? (
                                    <Fragment><span>{errors.passwordAgain}</span></Fragment>
                                ) : null}
                                <div className="input-column increase-tmargin">
                                    <label htmlFor="firstName">First name:</label>
                                    <input
                                        value={values.firstName}
                                        onChange={(e) => setFieldValue("firstName", e.target.value)}
                                        className={errors.firstName && touched.firstName ? "form-input-error" : null}
                                        type="text" name="firstName" required />
                                </div>
                                {errors.firstName && touched.firstName ? (
                                    <Fragment><span>{errors.firstName}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <label htmlFor="lastName">Last name:</label>
                                    <input
                                        value={values.lastName}
                                        onChange={(e) => setFieldValue("lastName", e.target.value)}
                                        className={errors.lastName && touched.lastName ? "form-input-error" : null}
                                        type="text" name="lastName" required />
                                </div>
                                {errors.lastName && touched.lastName ? (
                                    <Fragment><span>{errors.lastName}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <label htmlFor="address">Address:</label>
                                    <input
                                        value={values.address}
                                        onChange={(e) => setFieldValue("address", e.target.value)}
                                        className={errors.address && touched.address ? "form-input-error" : null}
                                        type="text" name="address" required />
                                </div>
                                {errors.address && touched.address ? (
                                    <Fragment><span>{errors.address}</span></Fragment>
                                ) : null}
                            </div>
                            <div className="input-row">
                                <div className="input-column">
                                    <label htmlFor="zipcode">Zipcode & City:</label>
                                    <div className="double-input-container">
                                        <input
                                            value={values.zipcode}
                                            onChange={(e) => setFieldValue("zipcode", e.target.value)}
                                            className={errors.zipcode && touched.zipcode ? "form-input-error" : null}
                                            className="input-1q" type="text" name="zipcode" required />
                                        <input
                                            value={values.city}
                                            onChange={(e) => setFieldValue("city", e.target.value)}
                                            className={errors.city && touched.city ? "form-input-error" : null}
                                            className="input-3q" type="text" name="city" required />
                                    </div>
                                </div>
                                {errors.zipcode && touched.zipcode ? (
                                    <Fragment><span>{errors.zipcode}</span></Fragment>
                                ) : null}
                                {errors.city && touched.city ? (
                                    <Fragment><span>{errors.city}</span></Fragment>
                                ) : null}
                            </div>
                            <div className="input-row">
                                <div className="input-column">
                                    <label htmlFor="phone">Phone number:</label>
                                    <input
                                        value={values.phone}
                                        onChange={(e) => setFieldValue("phone", e.target.value)}
                                        className={errors.phone && touched.phone ? "form-input-error" : null}
                                        type="tel" name="phone" required />
                                </div>
                                {errors.phone && touched.phone ? (
                                    <Fragment><span>{errors.phone}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <button className="submit-button" type="submit">Register</button>
                                    <p className="auth-note">Already have an account? Login <a href="/login">here</a></p>
                                </div>
                            </div>
                            {success === false ? <p className="error-msg">{registrationMessage}</p> : null}
                            {success === true ? <p className="success-msg">{registrationMessage}</p> : null}
                        </form>
                    )}
                </Formik>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Register
