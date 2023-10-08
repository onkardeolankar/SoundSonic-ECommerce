import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import "./Search.scss";

const Search = ({ setShowSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  let searchResponse = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${searchQuery}`
  );

  if (!searchQuery.length) {
    searchResponse = [];
  }
  // console.log("search response");
  // console.log(searchResponse);

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for product"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <MdClose onClick={() => setShowSearch(false)} />
      </div>

      <div className="search-result-content">
        <div className="search-results">
          {searchResponse?.data?.map((item) => (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => {
                navigate(`/product/${item.id}`);
                setShowSearch(false);
              }}
            >
              <div className="img-container">
                <img
                  src={
                    process.env.REACT_APP_STRAPI_DEV_APP_URL +
                    item.attributes.img.data[0].attributes.url
                  }
                  alt=""
                />
              </div>
              <div className="prod-details">
                <span className="name">{item.attributes.title}</span>
                <span className="desc">{item.attributes.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
