import React from "react";
import "./loader.scss";

const Loader = ({ plainBackground = true }) => { 
  return (
    <div
      className={`container_loader ${
        plainBackground ? "plain_background" : ""
      }`}
    >
      <div className="custom-loader"></div>
    </div>
  );
};

export default Loader;
