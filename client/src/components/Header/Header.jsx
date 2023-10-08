import { useContext, useEffect, useState } from "react";
import { BiCart, BiHeart, BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import Cart from "../Cart/Cart";
import Search from "../Header/Search/Search";

import "./Header.scss";
import { Context } from "../../utils/context";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { cartCount } = useContext(Context);

  const navigate = useNavigate();

  const handleScrolled = () => {
    const scrollOffset = window.scrollY;
    if (scrollOffset > 200) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrolled);
  }, []);

  return (
    <>
      <header className={`main-header ${scrolled ? "stickyHeader" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li>About</li>
            <li>Categories</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            Sound Sonic
          </div>
          <div className="right">
            <BiSearch onClick={() => setShowSearch(!showSearch)} />
            <BiHeart />
            <span className="cart-icon" onClick={() => setShowCart(!showCart)}>
              <BiCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
