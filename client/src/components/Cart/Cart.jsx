import { useContext } from "react";
import { BsCartX } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";

const Cart = ({ setShowCart }) => {
  const { cartItems, cartSubTotal } = useContext(Context);

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  // function to make payment via stripe plugin
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartItems,
      });
      console.log("stripe response");
      console.log(res);
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log("stripe error:");
      console.log(err);
    }
  };

  return (
    <div className="cart-panel">
      <div
        className="opac-layer"
        onClick={() => {
          setShowCart(false);
        }}
      ></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">Close</span>
          </span>
        </div>

        {!(cartSubTotal > 0) && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="return-cta" onClick={() => setShowCart(false)}>
              RETURN TO SHOP
            </button>
          </div>
        )}

        {cartSubTotal > 0 && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal: </span>
                <span className="text total"> {`₹ ${cartSubTotal}`}</span>
              </div>
              <div className="button">
                <button className="return-cta" onClick={handlePayment}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
