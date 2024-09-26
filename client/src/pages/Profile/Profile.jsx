import React, { useEffect, useState } from "react";
import { useGlarusContext } from "../../Context/Glarus_Context";
import apiAxios from "../../utils/apiAxios";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "./profile.scss";
import CardProfile from "../../components/CardProfile/CardProfile";
import Loader from "../../components/Loader/Loader";
import BasicCard from "../../components/BasicCard/BasicCard";

function Profile() {
  const [myCard, setMyCard] = useState();
  const { token } = localStorage;
  const { loading, setLoading } = useGlarusContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const {
        data: { card },
      } = await apiAxios.get("card/mycards", {
        headers: { accesstoken: token },
      });
      setMyCard(card);
      setLoading(false);
    })();
    if (!token) navigate("/");
  }, []);

  return (
    <div className="profilePage">
      {!myCard?.username ? (
        <div className="NoCards">
          <h1>{t("You Did not Have Cards Yet")}</h1>
          <Link to={"/Create_Card"}>{t("Create Now")}</Link>
        </div>
      ) : (
        <div className="contentPage">
          {myCard?.type == "basic" ? (
            <BasicCard card={myCard} forPreview={false} />
          ) : (
            <CardProfile card={myCard} forPreview={false} />
          )}
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}

export default Profile;
