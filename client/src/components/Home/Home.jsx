import { useContext, useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";

import "./Home.scss";
import { Context } from "../../utils/context";
import Category from "./Category/Category";
const Home = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);

  useEffect(() => {
    getCategories();
    getProducts();
  });

  const getCategories = () => {
    // using query parameter populate=* to fetch all attributes related to the category
    // this parameter is related to strapi
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      // console.log("categories response: ");
      // console.log(res);
      setCategories(res);
    });
  };

  const getProducts = () => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      // console.log("product response : ");
      // console.log(res);
      setProducts(res);
    });
  };

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products products={products} headingText="Popular Products" />
        </div>
      </div>
    </div>
  );
};

export default Home;
