import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import { t } from "i18next";
import searchimg from "../../assets/images/Home/search.png";
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
import filter from "../../assets/images/Filter.png";
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
import { Categories, getUserData } from "../../utils/Commn";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function Home() {
  const [sponserdCards, setSponserdCards] = useState([]);
  const [Cards, setCards] = useState([]);
  const [page, setPage] = useState("1");
  const [lengthCards, setLengthCards] = useState();
  const { loading, setLoading, LoginFirstHandler } = useGlarusContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { token } = localStorage;
  const [open, setOpen] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });
  const [search, setSearch] = useState({
    name: "",
    city: "",
    country: "",
  });
  const [category, setCategory] = useState("");
  const user = getUserData();
  const allRef = useRef();
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
  const handleChange = (e) => {
    const { id, value } = e.target;
    setSearch((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  const handleChangeCategory = (e) => {
    const { value } = e.target.dataset;
    setCategory(value);
    const { childNodes } = e.target.parentElement;
    childNodes.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const getCards = async () => {
    try {
      setLoading(true);
      const { name, city, country } = search;
      const { data } = await apiAxios.post(
        `card/search/?limit=6&page=${page}`,
        {
          name,
          city,
          country,
          category,
        }
      );
      setCards(data?.cards);
      setSearch({
        name : "",
        city : "" ,
        country : ""
      })
      setCategory("")
      onClose();
    } catch (e) {}
    setLoading(false);
  };

  const closeFilter = () => {
    setCategory("");
    onClose();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await apiAxios.get(
        `card/sponsored/?authenticatedId=${token ? user?.id : undefined}`
      );
      setSponserdCards(data?.cards);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    getCards();
  }, [page]);

  return (
    <div className="home">
      <div className="container">
        <div className="main">
          <div className="box">
            <h1>
              {t(
                "An innovative digital platform that enables users to create digital cards"
              )}
            </h1>
          </div>
          <div className="combo">
            <img className="blackBall" src={blackBall} alt="" loading="lazy" />
            <img
              className="blackHeart"
              src={blackHeart}
              alt=""
              loading="lazy"
            />
            <img
              className="blackPause"
              src={blackPause}
              alt=""
              loading="lazy"
            />
            <img className="blackStar" src={blackStar} alt="" loading="lazy" />
            <img
              className="blackStar two"
              src={blackStar}
              alt=""
              loading="lazy"
            />
            <div className="circle">
              <img src={circle} alt="" loading="lazy" />
              <img src={circle} alt="" loading="lazy" />
              <img src={circle} alt="" loading="lazy" />
            </div>
            <img className="greenBall" src={greenBall} alt="" loading="lazy" />
            <img
              className="greenBall two"
              src={greenBall}
              alt=""
              loading="lazy"
            />
            <img
              className="greenLocation"
              src={greenLocation}
              alt=""
              loading="lazy"
            />
            <img
              className="greenShare"
              src={greenShare}
              alt=""
              loading="lazy"
            />
            <img className="temp" src={tempCard} alt="" loading="lazy" />
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
        </div>
        <div className="sponserd">
          <h1>{t("Sponsored")}</h1>
          {sponserdCards.length ? (
            <div className="grid">
              {sponserdCards.map((card) => {
                return card?.type == "basic" ? (
                  <BasicCard card={card} forPreview={true} key={card.id} />
                ) : (
                  <CardProfile card={card} forPreview={true} key={card.id} />
                );
              })}
            </div>
          ) : (
            <div className="msg">{t("No sponserd Cards Yet")}</div>
          )}
        </div>
        <div className="search">
          <div className="quick">
            <img src={searchimg} alt="" loading="lazy" onClick={getCards} />
            <p>{t("Quick Search")}</p>
          </div>
          <input
            type="text"
            placeholder={t("Search By Name")}
            id="name"
            value={search.name}
            onChange={(e) => handleChange(e)}
          />
          <img
            src={filter}
            alt=""
            loading="lazy"
            className="filter"
            onClick={onOpen}
          />
        </div>
        <div className="topRated">
          <h1>{t("Top Rated")}</h1>
          <p>{t("Meet the skilled and experienced users")}</p>
          {Cards.length ? (
            <div className="grid">
              {Cards.map((card) => {
                return <TopRatedBox card={card} key={card.id} />;
              })}
            </div>
          ) : (
            <div className="msg">{t("No Cards Yet")}</div>
          )}
        </div>
        <div className="process">
          <h1>{t("Our Working Process")}</h1>
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
                  <img
                    id="one"
                    src={open.one ? minus : plus}
                    alt=""
                    loading="lazy"
                  />
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
                  <img
                    id="two"
                    src={open.two ? minus : plus}
                    alt=""
                    loading="lazy"
                  />
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
                  <img
                    id="three"
                    src={open.three ? minus : plus}
                    alt=""
                    loading="lazy"
                  />
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
                  <img
                    id="four"
                    src={open.four ? minus : plus}
                    alt=""
                    loading="lazy"
                  />
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
                  <img
                    id="five"
                    src={open.five ? minus : plus}
                    alt=""
                    loading="lazy"
                  />
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
                  <h3>{t("Create comprehensive digital cards")}</h3>
                </div>
                <img src={service1} alt="" loading="lazy" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box">
              <div className="flexer">
                <div className="con">
                  <h3>{t("Visibility Enhancement")}</h3>
                </div>
                <img src={service2} alt="" loading="lazy" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box ">
              <div className="flexer">
                <div className="con">
                  <h3>{t("Business rating system")}</h3>
                </div>
                <img src={service3} alt="" loading="lazy" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box backGround">
              <div className="flexer">
                <div className="con">
                  <h3>{t("CV and Portfolio")}</h3>
                </div>
                <img src={service4} alt="" loading="lazy" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box">
              <div className="flexer">
                <div className="con">
                  <h3 className="fade">{t("Technical Support")}</h3>
                </div>
                <img src={service5} alt="" loading="lazy" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
            <div className="box">
              <div className="flexer">
                <div className="con">
                  <h3 className="fade">{t("Analytics and Tracking")}</h3>
                </div>
                <img src={service6} alt="" loading="lazy" />
              </div>
              <div className="more">
                <i className="fa-solid fa-location-arrow"></i>
                <p>{t("Learn more")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeFilter} isCentered>
        <ModalOverlay />
        <ModalContent className="popUpFilter">
          <ModalHeader>
            <h1>{t("Cards Filter")}</h1>
            <p
              onClick={() => {
                setSearch({
                  name: "",
                  city: "",
                  country: "",
                });
                setCategory("");
                allRef.current.childNodes.forEach((ele) => {
                  ele.classList.remove("active");
                });
              }}
            >
              {t("Reset all")}
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="location">
              <h3>{t("Location")}</h3>
              <div className="inputs">
                <input
                  type="text"
                  placeholder={t("Search by country")}
                  id="country"
                  value={search.country}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  placeholder={t("Search by city")}
                  id="city"
                  value={search.city}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="categories">
              <h3>{t("Category")}</h3>
              <div className="all" ref={allRef}>
                {Categories.map((cate, i) => {
                  return (
                    <div
                      className="cate"
                      key={i}
                      onClick={(e) => handleChangeCategory(e)}
                      data-value={cate.value}
                    >
                      {cate.name}
                    </div>
                  );
                })}
              </div>
              <div className="search">
                <button onClick={getCards}>{t("Search")}</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {loading && <Loader />}
    </div>
  );
}

export default Home;
