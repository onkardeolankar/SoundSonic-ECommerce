import { useContext, useState } from "react";
import {
  FaCartPlus,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { Context } from "../../utils/context";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

import "./SingleProduct.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const context = useContext(Context);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) return 1;
      return prevQuantity - 1;
    });
  };

  // fetch the product based on prodId
  let prodData = useFetch(`/api/products/${id}?populate=*`);

  if (!prodData) return; // won't proceed further until recieve the product response
  prodData = prodData.data;

  // getting product img data from prodData
  let prodImg = prodData.attributes.img.data[0].attributes;

  // getting product category data from prodData.attributes
  let catgData = prodData.attributes.categories.data[0];

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={process.env.REACT_APP_STRAPI_DEV_APP_URL + prodImg.url}
              alt=""
            />
          </div>
          <div className="right">
            <span className="name">{prodData.attributes.title}</span>
            <span className="price">{"₹" + prodData.attributes.price}</span>
            <span className="desc">{prodData.attributes.desc}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <div
                className="add-to-cart-button"
                onClick={() => {
                  context.handleAddToCart(prodData, quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </div>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category:
                <span> {catgData.attributes.title}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={15} />
                  <FaTwitter size={15} />
                  <FaInstagram size={15} />
                  <FaLinkedinIn size={15} />
                  <FaPinterest size={15} />
                </span>
              </span>
            </div>
          </div>
        </div>

        <RelatedProducts categoryId={catgData.id} productId={id} />
      </div>
    </div>
  );
};

export default SingleProduct;
