import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../SessionContext';

const Cart = () => {

    const [cart, setCart] = useState([])
    const [cartFetched, setCartFetched] = useState(false)

    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null)

    const sessionInfo = useContext(SessionContext);

    const orderFood = async () => {
        const reduceBody = cart.map((food) => { return { id: food._id, amount: food.amount } });

        try {
            await fetch("/api/order/createOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reduceBody)
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


    const getCart = () => {
        let cartCurrent = JSON.parse(localStorage.getItem("cart"));
        if (!cartCurrent) {
            cartCurrent = [];
        }
        else {
            setCart(cartCurrent);
        }
        setCartFetched(true);
    }

    useEffect(() => {
        getCart();
    }, [])

    if (success) {
        return (
            <div className="cart-container">
                <img className="delivery-man" src="https://www.pngkey.com/png/full/428-4282931_uber-for-food-delivery-food-delivery.png"></img>
                <p className="info-msg">Your order is on the way! Check order status <a href={"/profile/orders/" + orderId}>here</a>.</p>
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
                                    <td>{food.amount}</td>
                                    <td>{food.price}</td>
                                    <td>{food.amount * food.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="cart-total-container">
                        <p><b>Products:</b> $579,94</p>
                        <p><b>+ Delivery:</b> $739,88</p>
                        <h3>Total: $599,94</h3>
                    </div>
                    {sessionInfo.logged ?
                        <div className="order-button-container">
                            <button className="submit-button" onClick={() => orderFood()}>Order</button>
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
