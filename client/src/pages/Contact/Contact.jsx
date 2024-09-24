import React, { useState } from "react";
import "./contact.scss";
import Banner from "../../components/banner/Banner.component";
import Auth from "../../components/Auth_Component/Auth";
import StackForm from "../../components/stackForm/StackForm";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { t } from "i18next";

function Contact() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="contact">
      <Banner title={"Contact Us"} />
      <div className="container">
        <div className="con">
          <h1 className="titleSection">{t("Let’s talk with us")}</h1>
          <p>
            {t(
              "Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly."
            )}
          </p>
          <div className="scoial">
            <div className="flex">
              <i className="fa-solid fa-location-dot"></i>
              <p>{t("1055 Arthur ave Elk Groot, 67. New Palmas South Carolina")}</p>
            </div>
            <div className="flex">
              <i className="fa-solid fa-phone-volume"></i>
              <p>+1 234 678 9108 99</p>
            </div>
            <div className="flex">
              <i className="fa-regular fa-envelope"></i>
              <p>Contact@moralizer.com</p>
            </div>
          </div>
        </div>
        <div className="form">
          <Auth>
            <div className="flex_auth">
              <StackForm
                stackType={"input"}
                label={t("First name")}
                placeholderInput={t("Enter first name")}
                error={error}
              />
              <StackForm
                stackType={"input"}
                label={t("Last name")}
                placeholderInput={t("Enter Last Name")}
                error={error}
              />
              <StackForm
                stackType={"input"}
                label={t("Email")}
                placeholderInput={t("Email")}
                error={error}
              />
            </div>
            <div className="custom">
              <h1 className="label">{t("Phone number")}</h1>
              <PhoneInput
                country={"sa"} // Default country saudi arabia
                value={phone}
                onChange={(phone) => setPhone(phone)}
                placeholder="00 000 000"
                specialLabel={false}
              />
            </div>
            <textarea
              name=""
              id=""
              placeholder={t("Your message...")}
            ></textarea>
            <button>{t("Submit")}</button>
          </Auth>
        </div>
      </div>
    </div>
  );
}

export default Contact;
