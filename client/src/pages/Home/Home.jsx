import React, { useEffect, useState } from "react";
import "./home.scss";
import { t } from "i18next";
import search from "../../assets/images/Home/search.png";
import blackBall from "../../assets/images/Home/blackBall.png";
import blackHeart from "../../assets/images/Home/blackHeart.png";
import blackPause from "../../assets/images/Home/blackPause.png";
import blackStar from "../../assets/images/Home/blackStar.png";
import circle from "../../assets/images/Home/circle.png";
import greenBall from "../../assets/images/Home/greenBall.png";
import greenLocation from "../../assets/images/Home/greenLocation.png";
import greenShare from "../../assets/images/Home/greenShare.png";
import tempCard from "../../assets/images/Home/tempCard.png";
import apiAxios from "../../utils/apiAxios";
import Loader from "../../components/Loader/Loader";
import minus from "../../assets/images/minus.png";
import plus from "../../assets/images/plus.png";
import service1 from "../../assets/images/Home/tokyo-selecting-a-value-in-the-browser-window 1.png";
import service2 from "../../assets/images/Home/tokyo-magnifier-web-search-with-elements 2.png";
import service3 from "../../assets/images/Home/tokyo-browser-window-with-emoticon-likes-and-stars-around 2.png";
import service4 from "../../assets/images/Home/tokyo-many-browser-windows-with-different-information 1.png";
import service5 from "../../assets/images/Home/tokyo-sending-messages-from-one-place-to-another 1.png";
import service6 from "../../assets/images/Home/tokyo-volumetric-analytics-of-different-types-in-web-browsers 2.png";
import { useGlarusContext } from "../../Context/Glarus_Context";
import TopRatedBox from "../../components/topRatedBox/TopRatedBox";
import { useNavigate } from "react-router-dom";
import CardProfile from "../../components/CardProfile/CardProfile";
import BasicCard from "../../components/BasicCard/BasicCard";

function Home() {
  const [sponserdCards, setSponserdCards] = useState([]);
  const [Cards, setCards] = useState([]);
  const { loading, setLoading, LoginFirstHandler } = useGlarusContext();
  const navigate = useNavigate();
  const { token } = localStorage;
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
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await apiAxios.get("/card");
      setSponserdCards(
        data.cards.filter((card) => {
          return card.id == 29 || card.id == 13 || card.id == 43;
        })
      );
      setCards(data.cards.slice(-6));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <div className="main">
          <div className="box ">
            <h1 className="">
              {t(
                "An innovative digital platform that enables users to create digital cards"
              )}
            </h1>
          </div>
          <div className="combo">
            <img className="blackBall" src={blackBall} alt="" />
            <img className="blackHeart" src={blackHeart} alt="" />
            <img className="blackPause" src={blackPause} alt="" />
            <img className="blackStar" src={blackStar} alt="" />
            <img className="blackStar two" src={blackStar} alt="" />
            <div className="circle">
              <img src={circle} alt="" />
              <img src={circle} alt="" />
              <img src={circle} alt="" />
            </div>
            <img className="greenBall" src={greenBall} alt="" />
            <img className="greenBall two" src={greenBall} alt="" />
            <img className="greenLocation" src={greenLocation} alt="" />
            <img className="greenShare" src={greenShare} alt="" />
            <img className="temp" src={tempCard} alt="" />
          </div>
        </div>
        <div className="con">
          <p>
            {t(
              "Enables users to create digital cards containing all their social media data, with the ability to Add a short profile. The goal of the platform is to facilitate the presentation of personal and professional information in an attractive and accessible manner."
            )}
          </p>
          <button
            className="create"
            onClick={() =>
              LoginFirstHandler({ token, navigate, path: "/Create_Card" })
            }
          >
            {t("Create Now")}
          </button>
          <div className="search">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder={t("Search By City , Name , Category")}
            />
          </div>
        </div>
        <div className="sponserd">
          <h1>{t("Sponsored ")}</h1>
          <div className="grid">
            {sponserdCards &&
              sponserdCards.map((card) => {
                return card.type == "basic" ? (
                  <BasicCard card={card} forPreview={true} />
                ) : (
                  <CardProfile card={card} forPreview={true} />
                );
              })}
          </div>
        </div>
        <div className="topRated">
          <h1>{t("Top Rated")}</h1>
          <p>{t("Meet the skilled and experienced users ")}</p>
          <div className="grid">
            {Cards &&
              Cards.map((card) => {
                return <TopRatedBox card={card} key={card.id} />;
              })}
          </div>
        </div>
        <div className="process">
          <h1>{t("Our Working Process ")}</h1>
          <p>{t("Step-by-Step Guide to Create your digital card")}</p>
          <div className="toggle">
            <div className={`item ${open?.one && "active"}`}>
              <div className="head">
                <div className="inside">
                  <p className="num">01</p>
                  <p className="info">{t("Register and Create an Account")}</p>
                </div>
                <div
                  className={`img ${open.one && "backGround"}`}
                  id="one"
                  onClick={(e) => handleActive(e)}
                >
                  <img id="one" src={open.one ? minus : plus} alt="" />
                </div>
              </div>
              <div className="con">
                <p>
                  {t(
                    "Create your account by visiting the platform’s website, choosing the Sign Up option if you're new, or Log In if you already have an account; you'll need to provide your name, email, and a password to get started."
                  )}
                </p>
              </div>
            </div>
            <div className={`item ${open?.two && "active"}`}>
              <div className="head">
                <div className="inside">
                  <p className="num">02</p>
                  <p className="info">
                    {t(
                      "Choose Your Card Type from Three Subscription Packages"
                    )}
                  </p>
                </div>
                <div
                  className={`img ${open.two && "backGround"}`}
                  id="two"
                  onClick={(e) => handleActive(e)}
                >
                  <img id="two" src={open.two ? minus : plus} alt="" />
                </div>
              </div>
              <div className="con">
                <p>
                  {t(
                    "Create your account by visiting the platform’s website, choosing the Sign Up option if you're new, or Log In if you already have an account; you'll need to provide your name, email, and a password to get started."
                  )}
                </p>
              </div>
            </div>
            <div className={`item ${open?.three && "active"}`}>
              <div className="head">
                <div className="inside">
                  <p className="num">03</p>
                  <p className="info">{t("Add Social Media Links")}</p>
                </div>
                <div
                  className={`img ${open.three && "backGround"}`}
                  id="three"
                  onClick={(e) => handleActive(e)}
                >
                  <img id="three" src={open.three ? minus : plus} alt="" />
                </div>
              </div>
              <div className="con">
                <p>
                  {t(
                    "Create your account by visiting the platform’s website, choosing the Sign Up option if you're new, or Log In if you already have an account; you'll need to provide your name, email, and a password to get started."
                  )}
                </p>
              </div>
            </div>
            <div className={`item ${open?.four && "active"}`}>
              <div className="head">
                <div className="inside">
                  <p className="num">04</p>
                  <p className="info">{t("Customize Your Card Design")}</p>
                </div>

                <div
                  className={`img ${open.four && "backGround"}`}
                  id="four"
                  onClick={(e) => handleActive(e)}
                >
                  <img id="four" src={open.four ? minus : plus} alt="" />
                </div>
              </div>
              <div className="con">
                <p>
                  {t(
                    "Create your account by visiting the platform’s website, choosing the Sign Up option if you're new, or Log In if you already have an account; you'll need to provide your name, email, and a password to get started."
                  )}
                </p>
              </div>
            </div>
            <div className={`item ${open?.five && "active"}`}>
              <div className="head">
                <div className="inside">
                  <p className="num">05</p>
                  <p className="info">{t("Save and Share Your Card")}</p>
                </div>
                <div
                  className={`img ${open.five && "backGround"}`}
                  id="five"
                  onClick={(e) => handleActive(e)}
                >
                  <img id="five" src={open.five ? minus : plus} alt="" />
                </div>
              </div>
              <div className="con">
                <p>
                  {t(
                    "Create your account by visiting the platform’s website, choosing the Sign Up option if you're new, or Log In if you already have an account; you'll need to provide your name, email, and a password to get started."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="services">
          <h1>{t("Services")}</h1>
          <p>
            {t(
              "At our platform , we offer a range of services to help businesses grow and succeed online. These services include:"
            )}
          </p>
          <div className="grid">
            <div className="box backGround">
              <div className="flexer">
                <div className="con">
                  <h3>{t("Create comprehensive")}</h3>
                  <p>{t("digital cards")}</p>
                </div>
                <img src={service1} alt="" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box">
              <div className="flexer">
                <div className="con">
                  <h3>{t("Visibility ")}</h3>
                  <p>{t("Enhancement")}</p>
                </div>
                <img src={service2} alt="" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box ">
              <div className="flexer">
                <div className="con">
                  <h3>{t("Business rating")}</h3>
                  <p>{t("system")}</p>
                </div>
                <img src={service3} alt="" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box backGround">
              <div className="flexer">
                <div className="con">
                  <h3>{t("CV and ")}</h3>
                  <p>{t("Portfolio")}</p>
                </div>
                <img src={service4} alt="" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box">
              <div className="flexer">
                <div className="con">
                  <h3 className="fade">{t("Technical ")}</h3>
                  <p className="fade">{t("Support")}</p>
                </div>
                <img src={service5} alt="" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box">
              <div className="flexer">
                <div className="con">
                  <h3 className="fade">{t("Analytics and")}</h3>
                  <p className="fade">{t("Tracking")}</p>
                </div>
                <img src={service6} alt="" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default Home;
