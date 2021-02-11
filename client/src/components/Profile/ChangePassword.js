import React, { useState, Fragment } from 'react'

import { Formik } from 'formik';
import * as Yup from 'yup';


const ChangePassword = () => {

    const [success, setSuccess] = useState(true);

    const newPassowordSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .required('Please enter your old password'),
        oldPasswordAgain: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .required('Please enter your old password')
            .oneOf([Yup.ref('oldPassword'), null], "Passwords do not match"),
        newPassword: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .notOneOf([Yup.ref('oldPassword'), null], "Your new password can't match the old password")
            .required('Please enter your new password'),
        newPasswordAgain: Yup.string()
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .required('Please enter your new password')
            .oneOf([Yup.ref('newPassword'), null], "Passwords do not match"),
    });

    const changePassword = async (values) => {
        console.log(values);
    }


    return (
        <div className="user-info-section">
            <div className="change-password-form">
                <Formik
                    initialValues={{
                        oldPassword: "",
                        oldPasswordAgain: "",
                        newPassword: "",
                        newPasswordAgain: ""
                    }}
                    validationSchema={newPassowordSchema}
                    onSubmit={(values) => {
                        changePassword(values);
                    }}
                >
                    {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                        <form className="input-info-container" onSubmit={handleSubmit}>
                            <div className="input-row">
                                <div className="input-column increase-tmargin">
                                    <label htmlFor="oldPassword">Old Password:</label>
                                    <input
                                        value={values.oldPassword}
                                        onChange={(e) => setFieldValue("oldPassword", e.target.value)}
                                        className={errors.oldPassword && touched.oldPassword ? "form-input-error" : null}
                                        type="password" name="oldPassword" required />
                                </div>
                                {errors.oldPassword && touched.oldPassword ? (
                                    <Fragment><span>{errors.oldPassword}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <label htmlFor="oldPasswordAgain">Repeat Old Password:</label>
                                    <input
                                        value={values.oldPasswordAgain}
                                        onChange={(e) => setFieldValue("oldPasswordAgain", e.target.value)}
                                        className={errors.oldPasswordAgain && touched.oldPasswordAgain ? "form-input-error" : null}
                                        type="password" name="oldPasswordAgain" required />
                                </div>
                                {errors.oldPasswordAgain && touched.oldPasswordAgain ? (
                                    <Fragment><span>{errors.oldPasswordAgain}</span></Fragment>
                                ) : null}
                                <div className="input-column increase-tmargin">
                                    <label htmlFor="newPassword">New Password:</label>
                                    <input
                                        value={values.newPassword}
                                        onChange={(e) => setFieldValue("newPassword", e.target.value)}
                                        className={errors.newPassword && touched.newPassword ? "form-input-error" : null}
                                        type="password" name="newPassword" required />
                                </div>
                                {errors.newPassword && touched.newPassword ? (
                                    <Fragment><span>{errors.newPassword}</span></Fragment>
                                ) : null}
                                <div className="input-column">
                                    <label htmlFor="newPasswordAgain">Repeat Old Password:</label>
                                    <input
                                        value={values.newPasswordAgain}
                                        onChange={(e) => setFieldValue("newPasswordAgain", e.target.value)}
                                        className={errors.newPasswordAgain && touched.newPasswordAgain ? "form-input-error" : null}
                                        type="password" name="newPasswordAgain" required />
                                </div>
                                {errors.newPasswordAgain && touched.newPasswordAgain ? (
                                    <Fragment><span>{errors.newPasswordAgain}</span></Fragment>
                                ) : null}
                            </div>
                            <div className="input-row increase-bmargin">
                                <div className="input-column">
                                    <button className="confirm-password-change-button" type="submit">Change password</button>
                                </div>
                                {!success && <p className="error-msg">Hey</p>}
                            </div>

                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ChangePassword
