import React from "react";
import "./blog.scss";
import { t } from "i18next";
import Main from "../../assets/images/Blog/Main.png";
import Ball from "../../assets/images/Blog/Ball.png";
import Ball2 from "../../assets/images/Blog/Ball2.png";
import art_1 from "../../assets/images/Blog/art-1.png";
import art_2 from "../../assets/images/Blog/art-2.png";
import art_3 from "../../assets/images/Blog/art-3.png";
import Facebook from "../../assets/images/Blog/facebook.png";
import Twitter from "../../assets/images/Blog/twitter.png";
import Linkedin from "../../assets/images/Blog/linkedin.png";

function Blog() {
  return (
    <div className="blog">
      <div className="container">
        <div className="part-1">
          <div className="img">
            <img className="main" src={Main} alt="" />
            <div className="con">
              <div className="digital">
                <img src={Ball} alt="" />
                <p>{t("Digital Cards")}</p>
              </div>
              <h3>
                {t(
                  "The Importance of Digital Cards in the Modern Technological Era"
                )}
              </h3>
              <h5>Oct 19 . 10 min read</h5>
            </div>
          </div>
          <div className="intro">
            <h1 className="titleSection">{t("Introduction")}</h1>
            <p>
              {t(
                "In today’s fast-paced world, where technology has become the backbone of almost every aspect of our lives, digitalization has transformed how we interact, communicate, and conduct business. Among the numerous innovations that have emerged, digital cards stand out as a significant advancement in the way we share and manage personal and professional information. Unlike traditional paper cards, digital cards offer a versatile, eco-friendly, and highly efficient means of networking and staying connected. As we delve deeper into the digital age, the relevance and necessity of digital cards continue to grow, making them a crucial tool in both personal and professional settings."
              )}
            </p>
          </div>
          <div className="intro">
            <h1 className="titleSection">
              {t("The Evolution of Business Cards: From Paper to Digital")}
            </h1>
            <p>
              {t(
                "Business cards have long been a staple in professional interactions, serving as a convenient way to exchange contact information during meetings, conferences, and networking events. However, traditional business cards have several limitations. They can be easily lost or damaged, are limited in the amount of information they can contain, and are not environmentally friendly due to the paper and ink used in their production. The introduction of digital cards marks a significant evolution in this domain. Digital cards are not confined to the physical limitations of paper. They can be easily shared through various digital platforms, updated instantly without the need for reprinting, and can include much more information than traditional cards, such as links to social media profiles, websites, and even multimedia content like videos or presentations."
              )}
            </p>
          </div>
          <div className="beni">
            <h1 className="titleSection">
              {t("Benefits of Digital Cards for Individuals and Businesses")}
            </h1>
            <div className="small">
              <h3>{t("1. Eco-Friendly and Sustainable")}</h3>
              <p>
                {t(
                  "One of the most compelling advantages of digital cards is their contribution to sustainability. In an era where environmental consciousness is increasingly important, reducing paper waste is a crucial step. Digital cards eliminate the need for printing, thereby conserving resources and reducing carbon footprints."
                )}
              </p>
            </div>
            <div className="small">
              <h3>{t("2. Cost-Effective")}</h3>
              <p>
                {t(
                  "For businesses and individuals alike, the cost of printing and reprinting traditional business cards can add up over time. Digital cards, on the other hand, can be created and distributed at a fraction of the cost. Additionally, because they can be updated instantly, there is no need to worry about reprinting costs due to changes in contact information or branding."
                )}
              </p>
            </div>
            <div className="small">
              <h3>{t("3. Convenient and Easily Shareable")}</h3>
              <p>
                {t(
                  "Digital cards can be shared with anyone, anywhere, at any time. Whether you’re in a meeting, at a conference, or networking online, you can send your digital card through email, social media, or even via QR codes. This convenience ensures that your contact information is always at the recipient’s fingertips."
                )}
              </p>
            </div>
            <div className="small">
              <h3>{t("4. Customizable and Dynamic")}</h3>
              <p>
                {t(
                  "Digital cards offer a level of customization that traditional cards simply cannot match. You can tailor your digital card to reflect your personal or brand identity, incorporating colors, logos, fonts, and other design elements that align with your style. Furthermore, digital cards can include dynamic content such as links to portfolios, videos, or social media profiles, providing recipients with a more comprehensive view of your professional or personal brand."
                )}
              </p>
            </div>
            <div className="small">
              <h3>{t("5. Real-Time Updates")}</h3>
              <p>
                {t(
                  "One of the biggest challenges with traditional business cards is keeping the information up-to-date. With digital cards, this problem is solved. You can update your card’s information in real-time, ensuring that your contacts always have the most current details without the need for reprinting or redistributing."
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="part-2">
          <div className="head smallHide">
            <p>{t("Share with your community!")}</p>
            <div className="social">
              <div className="flex">
                <img src={Facebook} alt="" />
                <img src={Twitter} alt="" />
                <img src={Linkedin} alt="" />
              </div>
            </div>
          </div>
          <div className="Art">
            <h1 className="smallTitle">{t("In this article")}</h1>
            <p className="border">
              {t(
                "The evolution of business cards from traditional paper to digital formats."
              )}
            </p>
            <p>
              {t(
                "The role of digital cards in enhancing networking opportunities and driving business growth."
              )}
            </p>
            <p>
              {t("Future trends and innovations in the digital card industry.")}
            </p>
            <p>{t("The numerous benefits that digital cards offer")}</p>
          </div>
          <div className="ralted">
            <h1 className="titleSection">{t("Related Articles")}</h1>
            <div className="box">
              <img src={art_1} alt="" />
              <div className="digital">
                <img src={Ball2} alt="" />
                <p>{t("Digital Cards")}</p>
              </div>
              <h3>{t("How Digital Business Cards Are Changing Networking")}</h3>
              <h5>Oct 19 . 10 min read</h5>
            </div>
            <div className="box">
              <img src={art_2} alt="" />
              <div className="digital">
                <img src={Ball2} alt="" />
                <p>{t("Digital Cards")}</p>
              </div>
              <h3>{t("How Digital Business Cards Are Changing Networking")}</h3>
              <h5>Oct 19 . 10 min read</h5>
            </div>
            <div className="box">
              <img src={art_3} alt="" />
              <div className="digital">
                <img src={Ball2} alt="" />
                <p>{t("Digital Cards")}</p>
              </div>
              <h3>{t("How Digital Business Cards Are Changing Networking")}</h3>
              <h5>Oct 19 . 10 min read</h5>
            </div>
          </div>
          <div className="head smallShow">
            <p>{t("Share with your community!")}</p>
            <div className="social">
              <div className="flex">
                <img src={Facebook} alt="" />
                <img src={Twitter} alt="" />
                <img src={Linkedin} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
