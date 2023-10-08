import BannerImg from "../../../assets/banner-img.png";

import "./Banner.scss";

const Banner = () => {
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
            itaque recusandae a earum ab. Nesciunt nostrum quos eveniet
            molestias. Optio distinctio tempora praesentium!
          </p>
          <div className="ctas">
            <div className="banner-cta">Read More</div>
            <div className="banner-cta v2">Shop Now</div>
          </div>
        </div>
        <img src={BannerImg} alt="" className="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
