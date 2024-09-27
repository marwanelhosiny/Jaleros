import React, { useEffect, useState } from "react";
import basicBG from "../../assets/images/card/BAckground Image.png";
import blacKBallCard from "../../assets/images/card/blackBallCard.png";
import goldBallCard from "../../assets/images/card/goldBallCard.png";
import greenBallCard from "../../assets/images/card/greenBallCard.png";
import whiteBallCard from "../../assets/images/card/whiteBallCard.png";
import link from "../../assets/images/card/Link.png";
import linkBlack from "../../assets/images/LinkWhite.png";
import share from "../../assets/images/Pricing/box-2/share.png";
import shareBlack from "../../assets/images/shareBlack.png";
import star from "../../assets/images/Pricing/Star.png";
import qr from "../../assets/images/Pricing/qrcode.png";
import shape from "../../assets/images/card/Vector.png";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./CardProfile.scss";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import QRCode from "qrcode";
import { Rating } from "@mui/material";
import { useGlarusContext } from "../../Context/Glarus_Context";
import apiAxios from "../../utils/apiAxios";

const socialIcons = {
  email: <i class="fa-solid fa-envelope"></i>,
  facebook: <i class="fa-brands fa-facebook-f"></i>,
  youtube: <i class="fa-brands fa-youtube"></i>,
  instagram: <i class="fa-brands fa-square-instagram"></i>,
  X: <i class="fa-brands fa-x-twitter"></i>,
  tikTok: <i class="fa-brands fa-tiktok"></i>,
  snapchat: <i class="fa-brands fa-snapchat"></i>,
  linkedin: <i class="fa-brands fa-linkedin-in"></i>,
  telegram: <i class="fa-brands fa-telegram"></i>,
  reddit: <i class="fa-brands fa-reddit-alien"></i>,
  pinterest: <i class="fa-brands fa-pinterest-p"></i>,
  custom1: <i class="fa-solid fa-user-secret"></i>,
  custom2: <i class="fa-solid fa-users-viewfinder"></i>,
  custom3: <i class="fa-solid fa-user-astronaut"></i>,
};

const baseProfile =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

function CardProfile({ card, forPreview = false }) {
  const [socialLinks, setSocialLinks] = useState([]);
  const [givenRate, setGivenRate] = useState(1);
  const [customFields, setCustomFields] = useState([]);
  const [mode, setMode] = useState(localStorage.modeCard || "default");
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [toggle, setToggle] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const { direction, token } = localStorage;
  const { setLoading } = useGlarusContext();
  const handleSocialLinks = () => {
    const social = card?.social;
    for (const key in social) {
      if (
        social[key] !== null &&
        social[key] !== "null" &&
        social[key] !== " " &&
        key !== "id" &&
        key !== "storeLink" &&
        social[key] !== "undefined" &&
        key !== "cardId"
      ) {
        setSocialLinks((prev) => [
          ...prev,
          { link: social[key], platform: key },
        ]);
      }
    }
  };

  const handleCustomFileds = () => {
    if (card) var Data = JSON.parse(card?.customFields);
    for (const key in Data) {
      if (Data[key].name != null && Data[key].link != null) {
        setCustomFields((prev) => [
          ...prev,
          { name: Data[key].name, link: Data[key].link },
        ]);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://jaleros.com/${card?.username}`
      );
      toast({
        isClosable: true,
        position: "top",
        duration: 3000,
        title: t("Copy Done"),
        status: "success",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownloadQrCode = async () => {
    const link = `https://jaleros.com/${card?.username}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(link, { width: 300 });
      const a = document.createElement("a");
      a.href = qrCodeDataUrl;
      a.download = "qr-code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Clean up the anchor element
    } catch (error) {
      console.error("Failed to generate QR Code:", error);
    }
  };

  const handleChangeTheme = (e) => {
    const { mode } = e.target.dataset;
    localStorage.modeCard = mode;
    setMode(mode);
  };

  const handleRateCard = async () => {
    try {
      if (givenRate == null)
        return toast({
          isClosable: true,
          position: "top",
          duration: 3000,
          title: t("Give it at least 1 star"),
          status: "info",
        });
      setLoading(true);
      await apiAxios.post(
        `card/rate/${card?.id}`,
        { rate: givenRate },
        { headers: { accesstoken: token } }
      );
      toast({
        isClosable: true,
        position: "top",
        duration: 3000,
        title: t("Successful Operation"),
        status: "success",
      });
    } catch (e) {}
    setLoading(false);
  };

  const handleFollowUnFollow = async () => {
    if (!token) {
      toast({
        isClosable: true,
        position: "top",
        duration: 3000,
        title: t("Login First"),
        status: "info",
      });
      navigate("/");
      return;
    }
    try {
      setLoading(true);
      const { data } = await apiAxios.post(
        `follow/${card?.userId}`,
        {},
        { headers: { accesstoken: token } }
      );
      toast({
        isClosable: true,
        position: "top",
        duration: 3000,
        title: t("Successful Operation"),
        status: "success",
      });
      setFollowers(data?.followers);
      setToggle(!toggle);
    } catch (e) {
      const { error } = e?.response?.data;
      toast({
        isClosable: true,
        position: "top",
        duration: 3000,
        title: t(error),
        status: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSocialLinks();
    handleCustomFileds();
    if (card) {
      setFollowers(card.Followers);
      setFollowing(card.Following);
      setToggle(card.isFollowed);
    }
  }, [card]);

  return (
    <div className={`cardProfile ${mode}`}>
      <div className="backImg">
        <img src={card?.coverPic || basicBG} alt="" loading="lazy" />
      </div>
      <div className="all">
        <div className="profile">
          <div className="mega">
            <div className="pic">
              <div className="followers">
                <p>{followers || "0"}</p>
                <p>{t("Followers")}</p>
              </div>
              <img
                src={card?.profilePic || baseProfile}
                alt=""
                loading="lazy"
              />
              <div className="followers two">
                <p>{following || "0"}</p>
                <p>{t("Following")}</p>
              </div>
            </div>
            <div className={`info`}>
              <Link target="blank" to={`https://jaleros.com/${card?.username}`}>
                {card?.name || "Jemy"}
              </Link>
              <h3>{card?.role || "FullStack Developer"}</h3>
              <h3 className="location">
                <i className="fa-solid fa-location-dot"></i>{" "}
                {card?.location || "No Location"}
              </h3>
              {card?.social?.storeLink && (
                <a
                  href={card?.social?.storeLink}
                  target="blank"
                  className={`${mode == "white" && "white"} store`}
                >
                  <img src={mode == "white" ? linkBlack : link} alt="" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="info_operations">
          <div className="part-1">
            <div className="mode">
              <p>{t("mode")}</p>
              <div className="imgs">
                <img
                  src={blacKBallCard}
                  alt=""
                  data-mode={"black"}
                  onClick={(e) => handleChangeTheme(e)}
                />
                <img
                  src={whiteBallCard}
                  alt=""
                  data-mode={"white"}
                  onClick={(e) => handleChangeTheme(e)}
                />
                <img
                  src={greenBallCard}
                  alt=""
                  data-mode={"green"}
                  onClick={(e) => handleChangeTheme(e)}
                />
                <img
                  src={goldBallCard}
                  alt=""
                  data-mode={"gold"}
                  onClick={(e) => handleChangeTheme(e)}
                />
                <div
                  className="defaultBall"
                  data-mode={"default"}
                  onClick={(e) => handleChangeTheme(e)}
                ></div>
              </div>
            </div>
            <div className="flex">
              <img
                src={mode == "white" ? shareBlack : share}
                alt=""
                onClick={handleCopy}
              />
              <img src={qr} alt="" onClick={handleDownloadQrCode} />
            </div>
          </div>
          <div className="part-2">
            <div className="rate">
              <Popover placement={direction == "ltr" ? "top-end" : "top-start"}>
                <PopoverTrigger>
                  <Button className="trigger">
                    <img src={star} alt="" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={`${mode == "white" && "white"}`}>
                  <PopoverArrow />
                  <PopoverHeader>{t("Rate this card")}</PopoverHeader>
                  <PopoverBody>
                    <Rating
                      name="simple-controlled"
                      value={givenRate}
                      onChange={(e, newVal) => {
                        console.log(newVal);
                        setGivenRate(newVal);
                      }}
                    />
                    <Button onClick={handleRateCard}>{t("Submit")}</Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <p>{card?.rate || "4.5"}</p>
            </div>
            {forPreview ? (
              toggle ? (
                <button className="normal" onClick={handleFollowUnFollow}>
                  {t("UnFollow")}
                </button>
              ) : (
                <button className="normal" onClick={handleFollowUnFollow}>
                  {t("Follow")}
                </button>
              )
            ) : (
              <button
                className="normal"
                onClick={() =>
                  navigate(`/Edit_Card/${card?.username}/${card?.id}`)
                }
              >
                {t("Edit")}
              </button>
            )}
          </div>
        </div>
        <div className="links">
          {socialLinks &&
            socialLinks.map(({ platform, link }) => {
              const iconElement = socialIcons[platform];
              return (
                <a
                  href={link}
                  key={platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {iconElement && iconElement}
                </a>
              );
            })}
          {card?.email && (
            <a href={`mailto:${card?.email}`}>{socialIcons["email"]}</a>
          )}
        </div>
        <div className="customFields">
          <Swiper
            pagination={{
              clickable: true,
            }}
            grabCursor={true}
            autoplay={true}
            loopFillGroupWithBlank={true}
            loop={true}
            freeMode={true}
            slidesPerView={"auto"}
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
          >
            {customFields.length &&
              customFields.map((obj, i) => {
                return (
                  <SwiperSlide key={i}>
                    <a
                      target="blank"
                      href={obj.link}
                      className={`customLink ${mode == "white" && "white"}`}
                    >
                      {obj.name}
                    </a>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="about">
          <h1>{t("About me")}</h1>
          <p>{card?.about}</p>
        </div>
        <div className="gallery">
          <h1>{t("Gallery")}</h1>
          <Swiper
            watchSlidesProgress={true}
            pagination={{
              clickable: true,
            }}
            grabCursor={true}
            autoplay={true}
            loopFillGroupWithBlank={true}
            breakpoints={{
              140: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1.6,
                spaceBetween: 10,
              },
              1030: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
            }}
            loop={true}
            spaceBetween={40}
            modules={[Autoplay, Pagination]}
          >
            {card?.gallery?.map((src, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={src} alt="" loading="lazy" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <img src={shape} alt="" className="shape" />
    </div>
  );
}

export default CardProfile;
