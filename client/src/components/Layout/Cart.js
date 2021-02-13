import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../../SessionContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {

    const [cart, setCart] = useState([])
    const [cartFetched, setCartFetched] = useState(false)

    const [cartTotal, setCartTotal] = useState(0);

    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null)

    const sessionInfo = useContext(SessionContext);

    const orderFood = async () => {
        const reduceBody = cart.map((food) => { return { id: food._id, amount: food.amount } });

        try {
            await fetch("/api/order/createOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reduceBody: [...reduceBody], cartTotal: cartTotal, email: sessionInfo.email })
            }).then(answer => answer.json())
                .then(data => {
                    if (data.success) {
                        localStorage.removeItem("cart");
                        setOrderId(data.orderId)
                        setSuccess(true);
                        setCart([]);
                    }
                });
        }
        catch (err) {
            console.error(err);
        }
    }

    const calculateTotal = () => {
        setCartTotal(cart.reduce((cTotal, food) => { return food.price * food.amount + cTotal }, 0).toFixed(2));
    }

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    }

    const getCart = () => {
        let cartCurrent = JSON.parse(localStorage.getItem("cart"));
        if (!cartCurrent) {
            cartCurrent = [];
        }
        else {
            calculateTotal();
            setCart(cartCurrent);
        }
        setCartFetched(true);
    }

    const changeItemAmount = (fId, changeBy) => {
        //console.log("Change ", fId, " by ", changeBy);
        if (cart.find(food => { return food._id === fId }).amount + changeBy > 0) {
            setCart(prevCart => {
                return prevCart.map((food) => {
                    if (food._id === fId) {
                        return { ...food, amount: food.amount + changeBy };
                    }
                    return food;
                })
            })
        }
        else {
            setCart(prevCart => {
                return prevCart.filter((food) => { return food._id !== fId })
            })
        }

    }

    useEffect(() => {
        getCart();
    }, [])

    useEffect(() => {
        if (cart.length > 0) {
            calculateTotal();
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    if (success) {
        return (
            <div className="cart-container">
                <img className="delivery-man" src="https://www.pngkey.com/png/full/428-4282931_uber-for-food-delivery-food-delivery.png"></img>
                <p className="info-msg">Your food is on the way! Check the status of your order <a href={"/profile/orders/" + orderId}>here</a>.</p>
            </div>
        )
    }
    else {
        if (cart.length > 0) {
            return (
                <div className="cart-container">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th className="table-image-column">&nbsp;</th>
                                <th className="table-title-column">Product</th>
                                <th className="table-small-column">Amount</th>
                                <th className="table-small-column">Price</th>
                                <th className="table-small-column">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((food) =>
                                <tr key={food._id}>
                                    <td><img src={food.image} /></td>
                                    <td>{food.name}</td>
                                    <td>
                                        <FontAwesomeIcon onClick={() => changeItemAmount(food._id, -1)} className="change-cart-amount" icon={faMinus} />
                                        <span className="cart-item-amount">{food.amount}</span>
                                        <FontAwesomeIcon onClick={() => changeItemAmount(food._id, 1)} className="change-cart-amount" icon={faPlus} />
                                    </td>
                                    <td>{food.price}</td>
                                    <td>{parseFloat(food.amount * food.price).toFixed(2)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="cart-total-container">
                        <p><b>Products:</b> ${cartTotal}</p>
                        <p><b>+ Delivery:</b> FREE</p>
                        <h3>Total: ${cartTotal}</h3>
                    </div>
                    {sessionInfo.logged ?
                        <div className="order-button-container">
                            <button className="clear-cart-button" onClick={() => clearCart()}>Clear cart</button>
                            <button className="submit-order-button" onClick={() => orderFood()}>Order</button>
                        </div>
                        :
                        <p className="info-msg">
                            Please log in <a href="/login">here</a> before ordering. Don't have an account yet? Create one <a href="/register">here</a>.
                     </p>}
                </div>
            )
        }
        else {
            if (cartFetched) {
                return (
                    <div className="cart-container">
                        <img className="empty-plate" src="https://webstockreview.net/images/dinner-clipart-empty-plate-4.png"></img>
                        <p className="info-msg">Oh no... Your plate is empty. Grab something to eat <a href="/">here</a>.</p>
                    </div>
                )
            }
        }
    }


    return null;

}

export default Cart
