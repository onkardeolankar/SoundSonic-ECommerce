import { useNavigate } from "react-router-dom";

import "./Product.scss";

const Product = ({ id, prodData }) => {
  const navigate = useNavigate();

  // console.log("prodData in products");
  // console.log(prodData);

  return (
    <div className="product-card" onClick={() => navigate("/product/" + id)}>
      <div key={id} className="thumbnail">
        <img
          src={
            process.env.REACT_APP_STRAPI_DEV_APP_URL +
            prodData.img.data[0].attributes.url
          }
          alt=""
        />
      </div>
      <div className="prod-details">
        <span className="name">{prodData.title}</span>
        <span className="price"> {`₹ ${prodData.price}`}</span>
      </div>
    </div>
  );
};

export default Product;
