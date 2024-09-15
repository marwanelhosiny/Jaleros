import React from "react";
import "./faq.scss";
import { t } from "i18next";
import minus from "../../assets/images/minus.png";
import plus from "../../assets/images/plus.png";
import { useState } from "react";

function FAQ() {
  const [open, setOpen] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });
  const handleActive = (e) => {
    const { id } = e.target;
    setOpen((prev) => {      
      return {
        ...Object.keys(prev).reduce((acc, key) => {          
          acc[key] = false;
          return acc;
        }, {}),
        [id]: !prev[id],
      };
    });
  };
  return (
    <div className="FAQ">
      <div className="container">
        <h1 className="titleSection">{t("Frequently Asked Questions")}</h1>
        <div className="questions">
          <div className={`item ${open?.one && "active"}`}>
            <div className="question">
              <h2>{t("What is a digital card, and how does it work?")}</h2>
              <p>
                {t(
                  "A digital card is an online profile that contains your personal or business information, such as your name, photo, and social media links. It can be shared via a link, allowing others to easily view your information without the need for a physical card."
                )}
              </p>
            </div>
            <img
              src={open.one ? minus : plus}
              id="one"
              onClick={(e) => handleActive(e)}
            />
          </div>
          <div className={`item ${open?.two && "active"}`}>
            <div className="question">
              <h2>
                {t(
                  "What is the difference between a Normal User and a Premium User?"
                )}
              </h2>
              <p>
                {t(
                  "A Normal User can create a basic digital card that includes their name, photo, and social media profiles. A Premium User can create a business-oriented digital card with additional features like business type, rating, and earning points based on user ratings."
                )}
              </p>
            </div>
            <img
              src={open.two ? minus : plus}
              id="two"
              onClick={(e) => handleActive(e)}
            />
          </div>
          <div className={`item ${open?.three && "active"}`}>
            <div className="question">
              <h2>{t("How can I create and customize my digital card?")}</h2>
              <p>
                {t(
                  "After signing up, you can create and customize your digital card through our user-friendly interface. You can upload your photo, fill in your personal or business details, and add links to your social media profiles. Premium users have additional customization options, such as adding a business type and enabling ratings."
                )}
              </p>
            </div>
            <img
              src={open.three ? minus : plus}
              id="three"
              onClick={(e) => handleActive(e)}
            />
          </div>
          <div className={`item ${open?.four && "active"}`}>
            <div className="question">
              <h2>{t("Can I search for other users' digital cards?")}</h2>
              <p>
                {t(
                  "Yes, our platform allows you to search for other users by name, location, and business type through the landing page. This makes it easy to find and connect with other individuals or businesses."
                )}
              </p>
            </div>
            <img
              src={open.four ? minus : plus}
              id="four"
              onClick={(e) => handleActive(e)}
            />
          </div>
          <div className={`item ${open?.five && "active"}`}>
            <div className="question">
              <h2>
                {t("Is my personal information secure on this platform?")}
              </h2>
              <p>
                {t(
                  "We take your privacy seriously and use secure encryption methods to protect your data. You have control over what information is displayed on your digital card, and you can update or delete your card at any time."
                )}
              </p>
            </div>
            <img
              src={open.five ? minus : plus}
              id="five"
              onClick={(e) => handleActive(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
