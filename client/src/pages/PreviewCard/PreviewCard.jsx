import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./preview.scss";
import { useGlarusContext } from "../../Context/Glarus_Context";
import Loader from "../../components/Loader/Loader";
import apiAxios from "../../utils/apiAxios";
import BasicCard from "../../components/BasicCard/BasicCard";
import CardProfile from "../../components/CardProfile/CardProfile";

function PreviewCard() {
  const { userName } = useParams();
  const [card, setCard] = useState();
  const { loading, setLoading, user } = useGlarusContext();
  const {id} = JSON.parse(localStorage.user)
  const {token} = localStorage
  
  const getCard = async () => {
    try {
      setLoading(true);
      const {
        data: { card },
      } = await apiAxios.get(`card/${userName}/?authenticatedId=${token ? id : undefined}`);
      setCard(card);
    } catch (e) {}
    setLoading(false);
  };
  useEffect(() => {
    userName && getCard();
  }, []);
  return (
    <div className="preview">
      <div className="preview_background"></div>
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
