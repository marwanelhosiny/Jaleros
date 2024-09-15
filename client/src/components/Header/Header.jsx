import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Untitled-2 2.png";
import menu from "../../assets/images/Menu/Menu.png";
import Bar from "../../assets/images/Menu/Bar Rounded.png";
import userImg from "../../assets/images/Menu/iconamoon_profile-light.png";
import sub from "../../assets/images/Menu/fluent_payment-28-regular.png";
import settings from "../../assets/images/Menu/solar_settings-outline.png";
import out from "../../assets/images/Menu/solar_logout-2-outline.png";
import noti from "../../assets/images/notifications.png";
import "./header.scss";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PinInput,
  PinInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import SignLogin from "../SignLoginComponent/SignLogin";
import { useGlarusContext } from "../../Context/Glarus_Context";
import Loader from "../Loader/Loader";
import apiAxios from "../../utils/apiAxios";
import LangBall from "../../assets/images/message.png";
import suadiArabia from "../../assets/images/Saudi Arabia.png";
import USA from "../../assets/images/USA.png";
function Header() {
  const { direction, token } = localStorage;
  const { i18n } = useTranslation();
  const [toggleSrc, setToggleSrc] = useState(false);
  const [OTP, setOtp] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLargeDrawerOpen, setLargeDrawerOpen] = useState(false);
  const [isSmallDrawerOpen, setSmallDrawerOpen] = useState(false);
  const openLargeDrawer = () => setLargeDrawerOpen(true);
  const closeLargeDrawer = () => setLargeDrawerOpen(false);
  const openSmallDrawer = () => setSmallDrawerOpen(true);
  const closeSmallDrawer = () => setSmallDrawerOpen(false);
  // for user login and sign Up
  const [inputsData, setInputsData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const { pathname } = useLocation();
  // for user login and sign Up
  const {
    operation,
    setOperation,
    isModalAuthOpen,
    setModalAuthOpen,
    closeModalAuth,
    isModalOtpOpen,
    setModalOtpOpen,
    closeModalOtp,
    user,
    loading,
    setLoading,
  } = useGlarusContext();

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setInputsData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  // open auth modal
  const handleOpenAuthModal = (e) => {
    const { value } = e.target;
    setOperation(value);
    setModalAuthOpen(true);
  };

  // open auth modal

  const changeLanguage = async (id) => {
    await i18n.changeLanguage(id);
    localStorage.lang = id;
    localStorage.direction = id == "ar" ? "rtl" : "ltr";
    document.body.style.direction = id == "ar" ? "rtl" : "ltr";
    document.body.classList.add(id);
    if (id == "ar") document.body.classList.remove("en");
    if (id == "en") document.body.classList.remove("ar");
    location.reload();
  };

  const handleSignUp = async () => {
    setErrorRegister(false);
    try {
      const { email, fullName, password } = inputsData;
      if (!email || !password || !fullName) return setErrorRegister(true);
      setLoading(true);
      const { data } = await apiAxios.post("user", {
        email,
        fullName,
        password,
      });
      toast({
        duration: 5000,
        isClosable: true,
        title: t("Successful Operation"),
        status: "success",
        position: "top",
      });
      localStorage.user = JSON.stringify(data.user);
      closeModalAuth();
      setModalOtpOpen(true);
    } catch (error) {
      const { errors, message } = error?.response?.data;
      if (errors) {
        errors.forEach((e, i) => {
          toast({
            duration: 3000 + i * 2000,
            isClosable: true,
            title: e,
            status: "error",
            position: "top",
          });
        });
      }
      if (message && !errors)
        toast({
          isClosable: true,
          position: "top",
          status: "error",
          duration: 4000,
          title: t("Not Valid Credentials"),
        });
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setErrorLogin(false);
    try {
      const { email, password } = inputsData;
      if (!email || !password) return setErrorLogin(true);
      setLoading(true);
      const { data } = await apiAxios.post("user/login", {
        email,
        password,
      });
      setLoading(false);
      localStorage.token = data.token;
      location.reload();
    } catch (error) {
      const { message } = error?.response?.data;
      if (message) {
        toast({
          duration: 4000,
          isClosable: true,
          title: t(message),
          status: "error",
          position: "top",
        });
      }
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const { data } = await apiAxios.post("user/verify-email", {
        email: inputsData.email,
        OTP,
      });
      localStorage.token = data.token;
      location.reload();
    } catch (e) {}
    setLoading(false);
  };

  const handleResizeDrawer = () => {
    if (window.innerWidth >= 768) {
      setSmallDrawerOpen(false);
    } else {
      setLargeDrawerOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeDrawer);
    // Cleanup
    return () => window.removeEventListener("resize", handleResizeDrawer);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="bigHeader">
          <div className="part_one">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <nav>
              <NavLink to={"/"}>{t("Home")}</NavLink>
              <NavLink to={"/plans"}>{t("Plans")}</NavLink>
              <NavLink to={"/contact"}>{t("Contact Us")}</NavLink>
              <NavLink to={"/blog"}>{t("Blog")}</NavLink>
            </nav>
          </div>
          {token ? (
            <div className="profile">
              <div className="img" onClick={openLargeDrawer}>
                <p className="num"></p>
                <img src={noti} alt="" />
                <Drawer onClose={closeLargeDrawer} isOpen={isLargeDrawerOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                      <div className="notiHeader">
                        <p>{t("All")}</p>
                        <p>{t("Followers")}</p>
                        <p>{t("Recently Rates")}</p>
                      </div>
                    </DrawerHeader>

                    <DrawerBody>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                    </DrawerBody>
                    <DrawerFooter>
                      <Button colorScheme="blue" onClick={closeLargeDrawer}>
                        {t("Close")}
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="con">
                <h3>{t("Welcome Home")}</h3>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <div className="flexer">
                      <Avatar size={"xs"} name={user?.fullName} />
                      <h3>{user?.fullName}</h3>
                    </div>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => navigate("/profile")}>
                      <img src={userImg} alt="" /> {t("My Profile")}
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/plans")}>
                      <img src={sub} alt="" />
                      {t("Subscribe")}
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        localStorage.removeItem("token");
                        if (pathname.includes("Edit_Card")) navigate("/");
                        location.reload();
                      }}
                    >
                      <img src={out} alt="" />
                      {t("Log out")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <div className="lang">
                <Popover
                  placement={direction == "rtl" ? "bottom-start" : "bottom-end"}
                >
                  <PopoverTrigger>
                    <Button>
                      <img src={LangBall} alt="" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <div
                        className="itemlang"
                        onClick={() => changeLanguage("ar")}
                      >
                        <img src={suadiArabia} alt="" /> {t("Arabic")}
                      </div>
                      <div
                        className="itemlang"
                        onClick={() => changeLanguage("en")}
                      >
                        <img src={USA} alt="" /> {t("English")}
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ) : (
            <div className="logicAuth">
              <button
                className="up"
                value={"sign"}
                onClick={(e) => handleOpenAuthModal(e)}
              >
                {t("Register")}
              </button>
              <button
                className="log"
                value={"log"}
                onClick={(e) => handleOpenAuthModal(e)}
              >
                {t("Login")}
              </button>
              <div className="lang">
                <Popover
                  placement={direction == "rtl" ? "bottom-start" : "bottom-end"}
                >
                  <PopoverTrigger>
                    <Button>
                      <img src={LangBall} alt="" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <div
                        className="itemlang"
                        onClick={() => changeLanguage("ar")}
                      >
                        <img src={suadiArabia} alt="" /> {t("Arabic")}
                      </div>
                      <div
                        className="itemlang"
                        onClick={() => changeLanguage("en")}
                      >
                        <img src={USA} alt="" /> {t("English")}
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>

        <div className="smallHeader">
          <div className="item">
            <img src={logo} alt="" />
            {token && (
              <div className="profile two">
                <h3>{t("Welcome Home")}</h3>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <div className="flexer">
                      <h3>{user?.fullName}</h3>
                    </div>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => navigate("/profile")}>
                      <img src={userImg} alt="" /> {t("My Profile")}
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/plans")}>
                      <img src={sub} alt="" />
                      {t("Subscribe")}
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        localStorage.removeItem("token");
                        if (pathname.includes("Edit_Card")) navigate("/");
                        location.reload();
                      }}
                    >
                      <img src={out} alt="" />
                      {t("Log out")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            )}
            <div className="box">
              <img
                src={toggleSrc ? Bar : menu}
                alt=""
                onClick={() => setToggleSrc(!toggleSrc)}
              />
              <div className="lang">
                <Popover
                  placement={direction == "rtl" ? "bottom-start" : "bottom-end"}
                >
                  <PopoverTrigger>
                    <Button>
                      <img src={LangBall} alt="" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <div
                        className="itemlang"
                        onClick={() => changeLanguage("ar")}
                      >
                        <img src={suadiArabia} alt="" /> {t("Arabic")}
                      </div>
                      <div
                        className="itemlang"
                        onClick={() => changeLanguage("en")}
                      >
                        <img src={USA} alt="" /> {t("English")}
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className={`dropDown ${toggleSrc && "open"}`}>
            <nav className="two">
              <NavLink to={"/"}>{t("Home")}</NavLink>
              <NavLink to={"/plans"}>{t("Plans")}</NavLink>
              <NavLink to={"/contact"}>{t("Contact Us")}</NavLink>
              <NavLink to={"/about"}>{t("About Us")}</NavLink>
            </nav>
            {token ? (
              <div className="fromlogin">
                <div className="img" onClick={openSmallDrawer}>
                  <p className="num"></p>
                  <img src={noti} alt="" />
                  <Drawer onClose={closeSmallDrawer} isOpen={isSmallDrawerOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerHeader borderBottomWidth="1px">
                        <div className="notiHeader">
                          <p>{t("All")}</p>
                          <p>{t("Followers")}</p>
                          <p>{t("Recently Rates")}</p>
                        </div>
                      </DrawerHeader>

                      <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                      </DrawerBody>
                      <DrawerFooter>
                        <Button colorScheme="blue" onClick={closeSmallDrawer}>
                          {t("Close")}
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
                <Avatar size={"sm"} name={user?.fullName} />
              </div>
            ) : (
              <div className="logicAuth small">
                <button
                  className="up"
                  value={"sign"}
                  onClick={(e) => handleOpenAuthModal(e)}
                >
                  {t("Register")}
                </button>
                <button
                  className="log"
                  value={"log"}
                  onClick={(e) => handleOpenAuthModal(e)}
                >
                  {t("Login")}
                </button>
              </div>
            )}
          </div>
        </div>
        <SignLogin
          operation={operation}
          flagOpen={isModalAuthOpen}
          closeModal={closeModalAuth}
          handleChangeInput={handleChangeInput}
          onClickSignUp={handleSignUp}
          onClickLogin={handleLogin}
          errorLogin={errorLogin}
          errorRegister={errorRegister}
        />
        <AlertDialog
          motionPreset="slideInBottom"
          onClose={closeModalOtp}
          isOpen={isModalOtpOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent className="otp">
            <AlertDialogHeader>{t("OTP Verification")}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <p className="email">
                {t("Enter The OTP Sent to")} <br /> <h3>{inputsData.email}</h3>
              </p>
              <HStack>
                <PinInput value={OTP} onChange={(value) => setOtp(value)} otp>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <p className="donot">
                {t("Didn’t you receive the OTP?")}{" "}
                <button className="resend">{t("Resend")}</button>
              </p>
              <button className="verify" onClick={verifyOtp}>
                {t("Verify")}
              </button>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {loading && <Loader />}
    </header>
  );
}

export default Header;
