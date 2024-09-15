import React, { useEffect, useState } from "react";
import AddEdit from "../../assets/images/CreateEdit.png";
import { t } from "i18next";
import Auth from "../../components/Auth_Component/Auth";
import { Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import StackForm from "../../components/stackForm/StackForm";
import "./addEdit.scss";
import plusIcon from "../../assets/images/Plus icon.png";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useGlarusContext } from "../../Context/Glarus_Context";
import Loader from "../../components/Loader/Loader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import apiAxios from "../../utils/apiAxios";
import { useParams } from "react-router-dom";

import axiosRetry from 'axios-retry';
axiosRetry(apiAxios, { retries: 3 });

function AddEditCard({ typePage }) {
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { id } = useParams();
  const [pics, setPics] = useState({
    profilePic: "",
    coverPic: "",
  });
  const [data, setData] = useState({
    about: null,
    name: null,
    role: null,
    storeLink: null,
    cv: null,
    portfolio: null,
    email: null,
    country: null,
    city: null,
    location: null,
    X: null,
    instagram: null,
    facebook: null,
    tikTok: null,
    snapchat: null,
    linkedin: null,
    reddit: null,
    pinterest: null,
    custom1: null,
    custom2: null,
    custom3: null,
  });
  const [gallery, setGallery] = useState({
    img1: { flag: false, src: null, base: null },
    img2: { flag: false, src: null, base: null },
    img3: { flag: false, src: null, base: null },
    img4: { flag: false, src: null, base: null },
    img5: { flag: false, src: null, base: null },
    img6: { flag: false, src: null, base: null },
    img7: { flag: false, src: null, base: null },
    img8: { flag: false, src: null, base: null },
  });
  const { loading, setLoading } = useGlarusContext();
  const { token } = localStorage;
  const toast = useToast();

  const getCard = async () => {
    try {
      setLoading(true);
      const {
        data: { card },
      } = await apiAxios.get(`card/${id}`);
      setData((prev) => {
        return {
          ...prev,
          name: card?.name,
          email: card?.email,
          about: card?.about,
          country: card?.country,
          city: card?.city,
          location: card?.location,
          X: card?.social?.X,
          instagram: card?.social?.instagram,
          facebook: card?.social?.facebook,
          tikTok: card?.social?.tikTok,
          snapchat: card?.social?.snapchat,
          linkedin: card?.social?.linkedin,
          custom1: card?.custom1,
          custom2: card?.custom2,
          custom3: card?.custom3,
          reddit: card?.reddit,
          pinterest: card?.pinterest,
        };
      });
      setPhoneNumber(card?.phoneNumber);
      const {gallery} = card
      gallery.forEach((src , i)=> {
        setGallery((prev)=> {
          return {
            ...prev,
            [`img${i+1}`] : {flag : true , src , base : null}
          }
        })
      })
    } catch (e) {}
    setLoading(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  const handleGalleryChange = (e, type) => {
    if (type === "add") {
      const { id } = e.target;
      const img = e.target.files[0];
      setGallery((prev) => {
        const url = URL.createObjectURL(img);
        return {
          ...prev,
          [id]: { flag: true, src: url, base: img },
        };
      });
    } else {
      const { cell } = e.target.dataset;
      setGallery((prev) => {
        return {
          ...prev,
          [cell]: { flag: false, src: null, base: null },
        };
      });
    }
  };
  const handleMainPicsChange = (e) => {
    const { id } = e.target;
    const img = e.target.files[0];
    setPics((prev) => {
      return {
        ...prev,
        [id]: img,
      };
    });
  };
  const handleCreateCard = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in data) {
        formData.append(String(key), data[key]);
      }
      for (const key in pics) {
        formData.append(String(key), pics[key]);
      }
      for (const key in gallery) {
        if (gallery[key]?.base !== null) {
          formData.append("gallery", gallery[key]?.base);
        }
      }
      formData.append("phoneNumber", phoneNumber);
      const { data: response } = await apiAxios.post("card", formData, {
        headers: { accesstoken: token },
      });
      console.log(response);
      toast({
        isClosable: true,
        duration: 5000,
        title: t(response.message),
        position: "top",
        status : 'success'
      });
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    id && getCard();
  }, []);
  return (
    <div className="AddEdit">
      <div className="img">
        <img src={AddEdit} alt="" />
      </div>
      <div className="container">
        <div className="textarea">
          <p>{t("Description")}</p>
          <textarea
            name=""
            id="about"
            onChange={(e) => handleChange(e)}
            value={data.about}
          ></textarea>
        </div>
        <div className="gender">
          <p>{t("Gender")}</p>
          <RadioGroup onChange={setGender} value={gender}>
            <Stack direction="row" gap={"40px"}>
              <Radio value="Female">{t("Female")}</Radio>
              <Radio value="Male">{t("Male")}</Radio>
            </Stack>
          </RadioGroup>
        </div>
        <Auth>
          <div className="flex_auth">
            <StackForm
              stackType={"input"}
              idInput={"name"}
              label={t("name")}
              valueInput={data.name}
              placeholderInput={t("Enter name")}
              onChangeInput={handleChange}
            />
            <StackForm
              stackType={"input"}
              idInput={"email"}
              label={t("email")}
              valueInput={data.email}
              placeholderInput={t("Email")}
              onChangeInput={handleChange}
            />
            <div className="custom stackform">
              <h1 className="label">{t("Phone number")}</h1>
              <PhoneInput
                country={"sa"} // Default country saudi arabia
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                placeholder="00 000 000"
                specialLabel={false}
                cl
              />
            </div>
            <StackForm
              stackType={"input"}
              idInput={"role"}
              label={t("role")}
              placeholderInput={t("add your job title")}
              valueInput={data.role}
              onChangeInput={handleChange}
            />
            <StackForm
              stackType={"input"}
              idInput={"profilePic"}
              label={t("profile Photo")}
              typeInput={"file"}
              onChangeInput={handleMainPicsChange}
            />
            <StackForm
              stackType={"input"}
              idInput={"coverPic"}
              label={t("cover Photo")}
              typeInput={"file"}
              onChangeInput={handleMainPicsChange}
            />
            <StackForm
              stackType={"input"}
              idInput={"cv"}
              label={t("cv")}
              valueInput={data.cv}
              placeholderInput={t("add your cv")}
              onChangeInput={handleChange}
            />
            <StackForm
              stackType={"input"}
              idInput={"portfolio"}
              label={t("portfolio")}
              valueInput={data.portfolio}
              placeholderInput={t("add your portfolio")}
              onChangeInput={handleChange}
            />
            <StackForm
              stackType={"input"}
              idInput={"storeLink"}
              label={t("storeLink")}
              valueInput={data.storeLink}
              placeholderInput={t("add your storeLink")}
              onChangeInput={handleChange}
              icon={"fa-solid fa-shop"}
            />
            <StackForm
              stackType={"input"}
              idInput={"X"}
              label={t("X user")}
              valueInput={data.X}
              placeholderInput={t("add your X user")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-x-twitter"}
            />
            <StackForm
              stackType={"input"}
              idInput={"linkedin"}
              label={t("linkedin")}
              valueInput={data.linkedin}
              placeholderInput={t("add your linkedin")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-linkedin"}
            />
            <StackForm
              stackType={"input"}
              idInput={"instagram"}
              label={t("instagram")}
              valueInput={data.instagram}
              placeholderInput={t("add your instagram")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-instagram"}
            />
            <StackForm
              stackType={"input"}
              idInput={"facebook"}
              label={t("facebook")}
              valueInput={data.facebook}
              placeholderInput={t("add your facebook")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-facebook"}
            />
            <StackForm
              stackType={"input"}
              idInput={"tikTok"}
              label={t("tikTok")}
              valueInput={data.tikTok}
              placeholderInput={t("add your tikTok")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-tiktok"}
            />
            <StackForm
              stackType={"input"}
              idInput={"snapchat"}
              label={t("snapchat")}
              valueInput={data.snapchat}
              placeholderInput={t("add your snapchat")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-snapchat"}
            />
            <StackForm
              stackType={"input"}
              idInput={"pinterest"}
              label={t("pinterest")}
              valueInput={data.pinterest}
              placeholderInput={t("add your pinterest")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-pinterest-p"}
            />
            <StackForm
              stackType={"input"}
              idInput={"reddit"}
              label={t("reddit")}
              valueInput={data.reddit}
              placeholderInput={t("add your reddit")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-reddit-alien"}
            />
            <StackForm
              stackType={"input"}
              idInput={"custom1"}
              label={t("custom1")}
              valueInput={data.custom1}
              placeholderInput={t("add any link")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-intercom"}
            />
            <StackForm
              stackType={"input"}
              idInput={"custom2"}
              label={t("custom2")}
              valueInput={data.custom2}
              placeholderInput={t("add any link")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-intercom"}
            />
            <StackForm
              stackType={"input"}
              idInput={"custom3"}
              label={t("custom3")}
              valueInput={data.custom3}
              placeholderInput={t("add any link")}
              onChangeInput={handleChange}
              icon={"fa-brands fa-intercom"}
            />
            <StackForm
              stackType={"input"}
              idInput={"country"}
              label={t("country")}
              valueInput={data.country}
              placeholderInput={t("add your country")}
              onChangeInput={handleChange}
              icon={"fa-solid fa-earth-asia"}
            />
            <StackForm
              stackType={"input"}
              idInput={"city"}
              label={t("city")}
              valueInput={data.city}
              placeholderInput={t("add your city")}
              onChangeInput={handleChange}
              icon={"fa-solid fa-city"}
            />
            <StackForm
              stackType={"input"}
              idInput={"location"}
              label={t("location")}
              valueInput={data.location}
              placeholderInput={t("add your location")}
              onChangeInput={handleChange}
              icon={"fa-solid fa-location-dot"}
            />
          </div>
          <div className="gallery">
            <h1>{t("Gallery")}</h1>
            <Swiper
              watchSlidesProgress={true}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                140: {
                  slidesPerView: 1.3,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1030: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              loop={true}
              spaceBetween={40}
              modules={[Pagination]}
            >
              <SwiperSlide>
                {gallery?.img1?.flag ? (
                  <div className="img">
                    <img src={gallery?.img1?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img1"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img1">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img1"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img2?.flag ? (
                  <div className="img">
                    <img src={gallery?.img2?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img2"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img2">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img2"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img3?.flag ? (
                  <div className="img">
                    <img src={gallery?.img3?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img3"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img3">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img3"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img4?.flag ? (
                  <div className="img">
                    <img src={gallery?.img4?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img4"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img4">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img4"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img5?.flag ? (
                  <div className="img">
                    <img src={gallery?.img5?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img5"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img5">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img5"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img6?.flag ? (
                  <div className="img">
                    <img src={gallery?.img6?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img6"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img6">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img6"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img7?.flag ? (
                  <div className="img">
                    <img src={gallery?.img7?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img7"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img7">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img7"
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {gallery?.img8?.flag ? (
                  <div className="img">
                    <img src={gallery?.img8?.src} alt="" />
                    <i
                      className="fa-solid fa-trash"
                      data-cell="img8"
                      onClick={(e) => handleGalleryChange(e, "remove")}
                    ></i>
                  </div>
                ) : (
                  <div className="box">
                    <label htmlFor="img8">
                      <img src={plusIcon} alt="" />
                      <p>{t("Add Media")}</p>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleGalleryChange(e, "add")}
                      id="img8"
                    />
                  </div>
                )}
              </SwiperSlide>
            </Swiper>
          </div>
          {typePage == "Create" ? (
            <button className="button" onClick={handleCreateCard}>
              {t("Create")}
            </button>
          ) : (
            <button className="button">{t("Update")}</button>
          )}
        </Auth>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default AddEditCard;
