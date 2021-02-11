import React, { useState, Fragment } from 'react'

import { Formik } from 'formik';
import * as Yup from 'yup';

const ChangeUserInfo = ({ sessionInfo }) => {

    const [success, setSuccess] = useState(null)
    const [cuiMessage, setCuiMessage] = useState(null)

    const SignupSchema = Yup.object().shape({
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

    const changeUserInfo = async (values) => {
        setSuccess(null);
    }

    return (
        <div className="user-info-section">
            <div className="change-user-info-form">
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        city: "",
                        zipcode: "",
                        address: "",
                        phone: ""
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        changeUserInfo(values);
                    }}
                >
                    {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                        <form className="input-info-container" onSubmit={handleSubmit}>
                            <div className="input-row">
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
                                    <button className="submit-button" type="submit">Save changes</button>
                                    {success === true ? <p className="success-msg">{cuiMessage}</p> : null}
                                    {success === false ? <p className="error-msg">{cuiMessage}</p> : null}
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ChangeUserInfo
