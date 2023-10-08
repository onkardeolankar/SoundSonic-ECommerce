import { useContext } from "react";
import { MdClose } from "react-icons/md";

import { Context } from "../../../utils/context";

import "./CartItem.scss";

const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);

  return (
    <div className="cart-products">
      {cartItems.map((product) => (
        <div key={product.id} className="cart-product">
          <div className="img-container">
            <img
              src={
                process.env.REACT_APP_STRAPI_DEV_APP_URL +
                product.attributes.img.data[0].attributes.url
              }
              alt=""
            />
          </div>
          <div className="prod-details">
            <span className="name">{product.attributes.title}</span>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(product)}
            />
            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", product)}>
                -
              </span>
              <span>{product.attributes.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", product)}>
                +
              </span>
            </div>

            <div className="text">
              <span>{product.attributes.quantity}</span>
              <span>x</span>
              <span className="highlight">
                {" "}
                {`₹ ${product.attributes.price}`}
              </span>
              <span>{` = ₹ ${
                product.attributes.quantity * product.attributes.price
              }`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
