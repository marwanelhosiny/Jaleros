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
  const [myCards, setMyCards] = useState([]);
  const [wait, setWait] = useState(true);
  const { token } = localStorage;
  const { loading, setLoading } = useGlarusContext();
  const [toggler , setToggler] = useState("1")
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await apiAxios.get("card/mycards", {
        headers: { accesstoken: token },
      });
      setWait(false);
      setMyCards(data.cards);
      setLoading(false);
    })();
    if(!token) navigate("/")
  }, []);

  if (myCards?.length < 1 && !wait)
    return (
      <div className="profilePage">
        <div className="NoCards">
          <h1>{t("You Did not Have Cards Yet")}</h1>
          <Link to={"/Create_Card"}>{t("Create Now")}</Link>
        </div>
      </div>
    );

  return (
    <div className="profilePage">
      <div className="contentPage">
        {myCards.length &&
          myCards.map((card , i) => {
            return (
              <div className={`box ${(i + 1) == toggler && "active"}`} key={i}>
                {card.type == "basic" ? (
                  <BasicCard card={card} forPreview={false} />
                ) : (
                  <CardProfile card={card} forPreview={false} />
                )}
              </div>
            );
          })}
        <div className="pagi">
          {[...Array(myCards.length)].map((_, i) => {
            return <span className={`${(i + 1) == toggler && "active"}`} onClick={()=>setToggler(i + 1)}>{i +1}</span>;
          })}
        </div>
        <button className="Create" onClick={() => navigate("/Create_card")}>
          {t("Create Another")}
        </button>
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default Profile;
