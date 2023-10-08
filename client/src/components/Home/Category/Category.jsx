import { useNavigate } from "react-router-dom";
import "./Category.scss";

const Category = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories?.data?.map((category) => (
          <div
            key={category.id}
            className="category"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <img
              src={
                process.env.REACT_APP_STRAPI_DEV_APP_URL +
                category.attributes.img.data.attributes.url
              }
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
