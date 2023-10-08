import Product from "./Product/Product";
import "./Products.scss";
const Products = ({ products, innerPage, headingText }) => {
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products?.data?.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            prodData={product.attributes}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
