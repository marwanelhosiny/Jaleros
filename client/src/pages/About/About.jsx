import React from "react";

import imgAbout from "../../assets/images/About.png"

import img from "../../assets/images/achievements/Services-(1).png";
import img2 from "../../assets/images/achievements/Services-(2).png";
import img3 from "../../assets/images/achievements/Services-(3).png";
import img4 from "../../assets/images/achievements/Services-(4).png";
import "./about.scss";
import { t } from "i18next";

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="part1">
          <div className="box">
            <h1 className="titleSection">{t("About Us")}</h1>
            <p>
              {t(
                "Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions,Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region."
              )}
            </p>
            <p className="two">
              {t(
                "Exclusive has more than 1 Million products to offer, growing at avery fast. Exclusive offers a diverse assotment in categories ranging from consumer."
              )}
            </p>
          </div>
          <div className="img">
            <img src={imgAbout} alt="" />
          </div>
        </div>
        <div className="part2">
          <h1 className="titleSection">{t("Our achievements")}</h1>
          <div className="grid">
            <div className="box">
              <img src={img} alt="" />
              <div className="con">
                <h3>10.5 {t("K")}</h3>
                <p>{t("Sallers active our site")}</p>
              </div>
            </div>
            <div className="box">
              <img src={img2} alt="" />
              <div className="con">
                <h3>33 {t("K")}</h3>
                <p>{t("Mopnthly Product Sale")}</p>
              </div>
            </div>
            <div className="box">
              <img src={img3} alt="" />
              <div className="con">
                <h3>45.5 {t("K")}</h3>
                <p>{t("Customer active in our site")}</p>
              </div>
            </div>
            <div className="box">
              <img src={img4} alt="" />
              <div className="con">
                <h3>25 {t("K")}</h3>
                <p>{t("Anual gross sale in our site")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
