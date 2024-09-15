import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./preview.scss";
import { useGlarusContext } from "../../Context/Glarus_Context";
import Loader from "../../components/Loader/Loader";
import apiAxios from "../../utils/apiAxios";
import BasicCard from "../../components/BasicCard/BasicCard";
import CardProfile from "../../components/CardProfile/CardProfile";

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

function PreviewCard() {
  const { id } = useParams();
  const [card, setCard] = useState();
  const { loading, setLoading } = useGlarusContext();
  const getCard = async () => {
    try {
      setLoading(true);
      const {
        data: { card },
      } = await apiAxios.get(`card/${id}`);
      setCard(card);
    } catch (e) {}
    setLoading(false);
  };
  useEffect(() => {
    id && getCard();
  }, []);
  return (
    <div className="preview">
      {card && card.type == "basic" ? (
        <BasicCard card={card} forPreview={true} />
      ) : (
        <CardProfile card={card} forPreview={true} />
      )}
      {loading && <Loader />}
    </div>
  );
}

export default PreviewCard;
