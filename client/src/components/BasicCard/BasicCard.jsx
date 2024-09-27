import React, { useEffect, useState } from "react";
import basicBG from "../../assets/images/card/BAckground Image.png";
import share from "../../assets/images/Pricing/box-2/share.png";
import shape from "../../assets/images/card/Vector.png";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./basic.scss";
import { useToast } from "@chakra-ui/react";

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

function BasicCard({ card, forPreview = false }) {
  const [socialLinks, setSocialLinks] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const { token } = localStorage;
  const navigate = useNavigate();
  const toast = useToast();
  const handleSocialLinks = () => {
    const social = card?.social;
    for (const key in social) {
      if (
        social[key] !== null &&
        social[key] !== " " &&
        social[key] !== "null" &&
        social[key] !== "undefined" &&
        key !== "id" &&
        key !== "storeLink" &&
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
        `https://jaleros.com/${card.username}`
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
      await apiAxios.post(
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
  }, [card]);

  return (
    <div className={`cardBasic default`}>
      <div className="backImg">
        <img src={card?.coverPic || basicBG} alt="" loading="lazy" />
      </div>
      <div className="all">
        <div className="profile">
          <div className="mega">
            <div className="pic">
              <div className="followers">
                <p>{card?.Followers < 0 ? card?.Followers : "0"}</p>
                <p>{t("Followers")}</p>
              </div>
              <img
                src={card?.profilePic || baseProfile}
                alt=""
                loading="lazy"
              />
              <div className="followers two">
                <p>{card?.Following < 0 ? card?.Following : "0"}</p>
                <p>{t("Following")}</p>
              </div>
            </div>
            <div className={`info`}>
              <Link target="blank" to={`https://jaleros.com/${card?.username}`}>
                {card?.name || "Jemy"}
              </Link>
              <h3>{card?.role || "FullStack Developer"}</h3>
            </div>
          </div>
        </div>
        <div className="info_operations">
          <img src={share} alt="" onClick={handleCopy} />
          {forPreview ? (
            card?.isFollowed ? (
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
              onClick={() =>
                navigate(`/Edit_Card/${card?.username}/${card?.id}`)
              }
            >
              {t("Edit")}
            </button>
          )}
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

export default BasicCard;
