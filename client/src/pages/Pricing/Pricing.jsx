import { Switch } from "@chakra-ui/react";
import { t } from "i18next";
import React, { useState } from "react";
import "./pricing.scss";
import user from "../../assets/images/Pricing/UserPlane.png";

// box-1
import tiktok from "../../assets/images/Pricing/box-1/tik.png";
import instagram from "../../assets/images/Pricing/box-1/ins.png";
import snap from "../../assets/images/Pricing/box-1/snap.png";
// box-1

// common
import star from "../../assets/images/Pricing/Star.png";
import share from "../../assets/images/Pricing/box-2/share.png";
import qrcode from "../../assets/images/Pricing/qrcode.png";
// common

// box-2
import tiktokBox2 from "../../assets/images/Pricing/box-2/tik.png";
import instagramBox2 from "../../assets/images/Pricing/box-2/ins.png";
import snapBox2 from "../../assets/images/Pricing/box-2/snap.png";
import map from "../../assets/images/Pricing/box-2/map.png";
// box-2

// box-3
import tiktokBox3 from "../../assets/images/Pricing/box-3/tik.png";
import instagramBox3 from "../../assets/images/Pricing/box-3/ins.png";
import snapBox3 from "../../assets/images/Pricing/box-3/snap.png";
import share3 from "../../assets/images/Pricing/box-3/share-line.png";
import map_2 from "../../assets/images/Pricing/box-3/map-3.png";
// box-3
import { Link, useNavigate } from "react-router-dom";
import { useGlarusContext } from "../../Context/Glarus_Context";

function Pricing() {
  const [checked, setChecked] = useState(false);
  const [hasCard, setHasCard] = useState({
    type: "0",
    confirm: false,
  });
  const { LoginFirstHandler } = useGlarusContext();
  const navigate = useNavigate();
  const { token } = localStorage;
  return (
    <div className="pricing">
      <div className="container">
        <h1 className="titleSection">{t("Simple, Easy and Fast")}</h1>
        <h3 className="small">{t("No contract, no surprise fees")}</h3>
        <div className="switch">
          <p>{t("Monthly")}</p>
          <Switch
            id="type"
            isChecked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <p>{t("Yearly")}</p>
          <h5 className="dis">{t("10% discount")}</h5>
        </div>
        <div className="plans">
          <div className="box">
            <div className="info">
              <p>{t("Basic")}</p>
              <h5>$0</h5>
            </div>
            <div className="benifits">
              <p>{t("Forever free")}</p>
              <p>{t("1 Digital Card")}</p>
              <p>{t("Personal Photo")}</p>
              <p>{t("Cover Photo")}</p>
              <p>{t("1 Editable Template")}</p>
              <p>{t("3 Social Media Links")}</p>
              <p>{t("Technical Support within (48h)")}</p>
            </div>
            <div className="card">
              <img src={user} alt="" />
              <div className="con">
                <h3>John Smith</h3>
                <p>CEO and Founder</p>
                <div className="scoial">
                  <img src={tiktok} alt="" />
                  <img src={instagram} alt="" />
                  <img src={snap} alt="" />
                </div>
                <img src={share} alt="" className="share" />
              </div>
            </div>
            {!hasCard.confirm ? (
              <button
                className="create"
                onClick={() =>
                  LoginFirstHandler({ token, navigate, path: "/Create_Card" })
                }
              >
                {t("Create Free Account")}
              </button>
            ) : (
              <button>{t("Your Cuurent Plan")}</button>
            )}
          </div>
          <div className="box">
            <div className="info">
              <p>{t("Premium")}</p>
              <h5>{t("$39/m")}</h5>
            </div>
            <div className="benifits">
              <p>{t("For the basics")}</p>
              <p>{t("3+ Digital Card")}</p>
              <p>{t("Personal Photo")}</p>
              <p>{t("Cover Photo")}</p>
              <p>{t("3 Editable Template")}</p>
              <p>{t("Unlimited Social Media Links")}</p>
              <p>{t("QR Code")}</p>
              <p>{t("Google Maps")}</p>
              <p>{t("Card Rate")}</p>
              <p>{t("Technical Support within (24h)")}</p>
            </div>
            <div className="card">
              <div className="img">
                <img src={user} alt="" />
                <div className="rate">
                  <img src={star} alt="" />
                  <p>4.5</p>
                </div>
              </div>
              <div className="con">
                <h3>John Smith</h3>
                <p>CEO and Founder</p>
                <div className="location">
                  <img src={map} alt="" />
                  <p>Riadh , Saudia</p>
                </div>
                <div className="scoial">
                  <img src={tiktokBox2} alt="" />
                  <img src={instagramBox2} alt="" />
                  <img src={snapBox2} alt="" />
                </div>
              </div>
              <img src={share} alt="" className="share" />
              <img src={qrcode} alt="" className="qr" />
            </div>
            {!hasCard.confirm ? (
              <button>{t("Get Start")}</button>
            ) : (
              <button>{t("Your Cuurent Plan")}</button>
            )}
          </div>
          <div className="box">
            <div className="info">
              <p>{t("Professional")}</p>
              <h5>{t("$89/m")}</h5>
            </div>
            <div className="benifits">
              <p>{t("For the Prof.")}</p>
              <p>{t("3+ Digital Card")}</p>
              <p>{t("5 Editable Template")}</p>
              <p>{t("Unlimited Social Media Links")}</p>
              <p>{t("Monthly Reports")}</p>
              <p>{t("Personal Video")}</p>
              <p>{t("QR Code")}</p>
              <p>{t("Google Maps")}</p>
              <p>{t("Card Rate")}</p>
              <p>{t("Chat Support")}</p>
            </div>
            <div className="card">
              <div className="img">
                <img src={user} alt="" />
                <div className="rate">
                  <img src={star} alt="" />
                  <p>4.5</p>
                </div>
              </div>
              <div className="con">
                <h3>John Smith</h3>
                <p>CEO and Founder</p>
                <div className="location">
                  <img src={map_2} alt="" />
                  <p>Riadh , Saudia</p>
                </div>
                <div className="scoial">
                  <img src={tiktokBox3} alt="" />
                  <img src={instagramBox3} alt="" />
                  <img src={snapBox3} alt="" />
                </div>
              </div>
              <img src={share3} alt="" className="share" />
              <img src={qrcode} alt="" className="qr" />
            </div>
            {!hasCard.confirm ? (
              <button>{t("Get Start")}</button>
            ) : (
              <button>{t("Your Cuurent Plan")}</button>
            )}
          </div>
        </div>
        <h3 className="link">
          {t("Need help? feel free to")}{" "}
          <Link to={"/contact"}>{t("contact us")}</Link>
        </h3>
      </div>
    </div>
  );
}

export default Pricing;
