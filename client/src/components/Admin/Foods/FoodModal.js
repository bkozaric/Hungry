
import React, { Fragment, useState } from 'react'
import ReactDom from 'react-dom'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const FoodModal = ({ isOpen, callClose, sessionInfo, callParentUpdate, editMode, editFoodItem }) => {

    const [imageCheck, setImageCheck] = useState(null);

    const FoodSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Name too short')
            .max(50, 'Name too long')
            .required('Please enter a name'),
        description: Yup.string()
            .min(10, 'Description too short')
            .max(100, 'Description too long')
            .required('Please enter a description'),
        price: Yup.number()
            .min(1, "Price can't be lower than $1")
            .max(1000, "Price can't be higher than $1000")
            .required('Please enter the price')
            .typeError("Please enter the price"),
        image: Yup.string()
            .required('An image is required'),
    });

    const addFood = async (values) => {
        try {
            await checkImage(values.image).then(async (isImage) => {
                if (isImage) {
                    const body = { ...values, uId: sessionInfo.userId };
                    await fetch("/api/food/addFood", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }).then(answer => answer.json())
                        .then(data => {
                            if (data?.success === 1) {
                                callParentUpdate();
                                callClose();
                            }
                        });
                }
                else {
                    setImageCheck(false);
                }
            }
            )
        }
        catch (err) {
            console.error(err);
        }
    }

    const editFood = async (values) => {
        try {
            const body = {
                name: values.name,
                description: values.description,
                price: values.price,
                image: values.image,
                fId: editFoodItem._id,
                uId: sessionInfo.userId
            };
            await checkImage(values.image).then(async (isImage) => {
                if (isImage) {
                    await fetch("/api/food/editFood/", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }).then(answer => answer.json())
                        .then(data => {
                            if (data?.success === 1) {
                                callParentUpdate();
                                callClose();
                            }
                        });
                }
                else {
                    setImageCheck(false);
                }
            })

        }
        catch (err) {
            console.error(err);
        }
    }

    const checkImage = async (imgUrl) => {
        let isImage = false;
        setImageCheck(null);
        if (imgUrl.trim().length > 0) {
            await fetch("/api/food/checkImage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: imgUrl })
            }).then(answer => answer.json())
                .then(data => {
                    if (data.isImage === 1) {
                        isImage = true;
                    }
                });
        }
        return isImage;
    }

    if (!isOpen) return null

    if (editMode) {
        return ReactDom.createPortal(
            <>
                <div className="modal-overlay" />
                <div className="modal-container">
                    <div className="new-food-form">
                        <Formik
                            initialValues={{
                                name: editFoodItem.name,
                                description: editFoodItem.description,
                                image: editFoodItem.image,
                                price: editFoodItem.price
                            }}
                            validationSchema={FoodSchema}
                            onSubmit={(values) => {
                                editFood(values);
                            }}
                        >
                            {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                                <form className="input-info-container" onSubmit={handleSubmit}>
                                    <div className="input-row">
                                        <div className="input-column">
                                            <label htmlFor="name">Name:</label>
                                            <input
                                                name="name"
                                                type="text"
                                                className={errors.name && touched.name ? "form-input-error" : null}
                                                value={values.name}
                                                onChange={(e) => setFieldValue("name", e.target.value)}
                                            />
                                        </div>
                                        {errors.name && touched.name ? (
                                            <Fragment><span>{errors.name}</span></Fragment>
                                        ) : null}
                                    </div>
                                    <div className="input-row">
                                        <div className="input-column">
                                            <label htmlFor="description">Description:</label>
                                            <input
                                                name="description"
                                                type="text"
                                                className={errors.description && touched.description ? "form-input-error" : null}
                                                value={values.description}
                                                onChange={(e) => setFieldValue("description", e.target.value)}
                                                required

                                            />
                                        </div>
                                        {errors.description && touched.description ? (
                                            <Fragment><span>{errors.description}</span></Fragment>
                                        ) : null}
                                    </div>
                                    <div className="input-row">
                                        <div className="input-column">
                                            <label htmlFor="price">Price:</label>
                                            <input
                                                name="price"
                                                type="number"
                                                className={errors.price && touched.price ? "form-input-error" : null}
                                                value={values.price}
                                                onChange={(e) => setFieldValue("price", e.target.value)}
                                                required

                                            />
                                        </div>
                                        {errors.price && touched.price ? (
                                            <Fragment><span>{errors.price}</span></Fragment>
                                        ) : null}
                                    </div>
                                    <div className="input-row">
                                        <div className="input-column">
                                            <label htmlFor="image">Image:</label>
                                            <input
                                                name="image"
                                                type="text"
                                                className={errors.image && touched.image ? "form-input-error" : null}
                                                value={values.image}
                                                onChange={(e) => setFieldValue("image", e.target.value)}
                                                required
                                            />
                                        </div>
                                        {errors.image && touched.image ? (
                                            <Fragment><span>{errors.image}</span></Fragment>
                                        ) : null}
                                    </div>

                                    <div className="input-row">
                                        <button className="submit-button" type="submit">Edit</button>
                                    </div>
                                    {imageCheck === false ? <p className="error-msg">Please enter a URL to an image</p> : null}
                                </form>)}
                        </Formik>
                    </div>
                    <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
            </>,
            document.getElementById('portal')
        )
    }
    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" />
            <div className="modal-container">
                <div className="new-food-form">
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            image: "",
                            price: 0
                        }}
                        validationSchema={FoodSchema}
                        onSubmit={(values) => {
                            addFood(values);
                        }}
                    >
                        {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                            <form className="input-info-container" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <div className="input-column">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            name="name"
                                            type="text"
                                            className={errors.name && touched.name ? "form-input-error" : null}
                                            value={values.name}
                                            onChange={(e) => setFieldValue("name", e.target.value)}
                                        />
                                    </div>
                                    {errors.name && touched.name ? (
                                        <Fragment><span>{errors.name}</span></Fragment>
                                    ) : null}
                                </div>
                                <div className="input-row">
                                    <div className="input-column">
                                        <label htmlFor="description">Description:</label>
                                        <input
                                            name="description"
                                            type="text"
                                            className={errors.description && touched.description ? "form-input-error" : null}
                                            value={values.description}
                                            onChange={(e) => setFieldValue("description", e.target.value)}
                                            required

                                        />
                                    </div>
                                    {errors.description && touched.description ? (
                                        <Fragment><span>{errors.description}</span></Fragment>
                                    ) : null}
                                </div>
                                <div className="input-row">
                                    <div className="input-column">
                                        <label htmlFor="price">Price:</label>
                                        <input
                                            name="price"
                                            type="number"
                                            className={errors.price && touched.price ? "form-input-error" : null}
                                            value={values.price}
                                            onChange={(e) => setFieldValue("price", e.target.value)}
                                            required

                                        />
                                    </div>
                                    {errors.price && touched.price ? (
                                        <Fragment><span>{errors.price}</span></Fragment>
                                    ) : null}
                                </div>
                                <div className="input-row">
                                    <div className="input-column">
                                        <label htmlFor="image">Image:</label>
                                        <input
                                            name="image"
                                            type="text"
                                            className={errors.image && touched.image ? "form-input-error" : null}
                                            value={values.image}
                                            onChange={(e) => setFieldValue("image", e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.image && touched.image ? (
                                        <Fragment><span>{errors.image}</span></Fragment>
                                    ) : null}
                                </div>

                                <div className="input-row">
                                    <button className="submit-button" type="submit">Add</button>
                                </div>
                                {imageCheck === false ? <p className="error-msg">Please enter a URL to an image</p> : null}
                            </form>)}
                    </Formik>
                </div>
                <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default FoodModal