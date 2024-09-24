import React from "react";
import "./topRated.scss";

const baseSrc =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

import star from "../../assets/images/Pricing/Star.png";
import plusBall from "../../assets/images/PlusBall.png";
import { Link } from "react-router-dom";

function TopRatedBox({ card }) {
  return (
    <div className="TopRatedBox">
      <div className="info">
        <Link target="blank" to={`https://jaleros.com/${card?.username}`}>
          <img src={card?.profilePic || baseSrc} alt="" />
        </Link>
        <div className="con">
          <h1>{card?.title || "Jemy"}</h1>
          <h3>{card?.role || "FullStack Developer"}</h3>
        </div>
      </div>
      <div className="about">
        <p>{card?.about}</p>
      </div>
      <img src={plusBall} alt="" className="plus" />
      <div className="rate">
        <p>{card?.rate || "4.5"}</p>
        <div className="flexer">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TopRatedBox;
