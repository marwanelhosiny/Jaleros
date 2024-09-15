import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Untitled-2 1 1.png";
import "./footer.scss";
import { t } from "i18next";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="flex">
          <div className="part1">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <p>
              {t(
                "Web Platform to empower users to create digital business cardsthat include personal and business information. It facilitates interaction and evaluation among users by providing a rating system"
              )}
            </p>
          </div>
          <div className="part2">
            <h1>{t("Company")}</h1>
            <Link to={"/about"}>{t("About us")}</Link>
            <Link to={"/contact"}>{t("Contact us")}</Link>
            <Link to={"/FAQ"}>{t("FAQ")}</Link>
          </div>
          <div className="smallShow">
            <h1>{t("Resources")}</h1>
            <Link to={"/blog"}>{t("Blogs")}</Link>
          </div>
          <div className="part3">
            <h1>{t("Keep updated with our website deals")}</h1>
            <div className="sub">
              <input type="text" placeholder={t("Add your email here")} />
              <button>{t("Subscribe")}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="social">
        <i className="fa-brands fa-facebook-f"></i>
        <i className="fa-brands fa-x-twitter"></i>
        <i className="fa-brands fa-tiktok"></i>
      </div>
      <div className="end">
        <div className="container">
          <h1>{t("Copyright @Glarous,INC")}</h1>
          <div className="links">
            <Link>{t("Terms of Service")}</Link>
            <Link>{t("Privacy Policy")}</Link>
            <Link>{t("Warranty")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
