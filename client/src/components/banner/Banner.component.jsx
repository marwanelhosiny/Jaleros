import React from "react";
import "./banner.scss";
import { t } from "i18next";

const Banner = ({ title }) => {
  return (
    <div className="banner_page ">
      <div className="container">{<h1 className="titleSection">{t(title)}</h1>}</div>
    </div>
  );
};

export default Banner;
