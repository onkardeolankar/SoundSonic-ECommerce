import Products from "../Products/Products";
import { useParams } from "react-router-dom";
import "./Category.scss";
import useFetch from "../../hooks/useFetch";
const Category = () => {
  const { id } = useParams();

  // Reference: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
  // filter products by category id
  const prodData = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );

  if (!prodData) return;

  // console.log("products filtered by category id ::");
  // console.log(prodData);

  // console.log(
  //   prodData.data.[0].attributes.categories.data.[0].attributes
  // );
  const title = prodData.data[0].attributes.categories.data[0].attributes.title;

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">{title}</div>
        <Products innerPage={true} products={prodData} />
      </div>
    </div>
  );
};

export default Category;
