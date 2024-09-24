import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { t } from "i18next";
import React, { useState } from "react";
import Auth from "../Auth_Component/Auth";
import StackForm from "../stackForm/StackForm";
import eye from "../../assets/images/Eyes.png";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";

function SignLogin({
  operation,
  setOperation,
  flagOpen,
  closeModal,
  onClickLogin,
  onClickSignUp,
  handleChangeInput,
  errorLogin = false,
  errorRegister = false,
}) {
  const [show, setShow] = useState(false);
  const onclickIcon = () => setShow(!show);
  return (
    <Modal
      isOpen={flagOpen}
      onClose={closeModal}
      size={"xl"}
      isCentered
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent className="signLogin">
        <ModalHeader>
          <div className="title">
            <h1>{t("Log in")}</h1>
            <p>{t("Enter your email address to access Quadra-soft-tech")}</p>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="operation">
            <p
              onClick={() => setOperation("log")}
              className={operation == "log" && "active"}
            >
              {t("Login")}
            </p>
            <p
              onClick={() => setOperation("sign")}
              className={operation == "sign" && "active"}
            >
              {t("Register")}
            </p>
          </div>
          <Auth>
            <div className="flex_auth">
              {operation == "sign" && (
                <StackForm
                  stackType={"input"}
                  label={t("Full name")}
                  placeholderInput={t("Eter your name")}
                  idInput={"fullName"}
                  onChangeInput={handleChangeInput}
                  error={operation == "log" ? errorLogin : errorRegister}
                />
              )}
              {operation == "sign" && (
                <StackForm
                  stackType={"input"}
                  label={t("username")}
                  placeholderInput={t("Enter your username")}
                  idInput={"username"}
                  onChangeInput={handleChangeInput}
                  error={operation == "log" ? errorLogin : errorRegister}
                />
              )}
              <StackForm
                stackType={"input"}
                label={t("Email")}
                placeholderInput={t("Enter your email")}
                idInput={"email"}
                onChangeInput={handleChangeInput}
                needForce
                error={operation == "log" ? errorLogin : errorRegister}
              />
              <StackForm
                stackType={"input"}
                typeInput={show ? "text" : "password"}
                label={t("Password")}
                placeholderInput={t("Enter Password")}
                src={eye}
                onclickIcon={onclickIcon}
                onChangeInput={handleChangeInput}
                idInput={"password"}
                error={operation == "log" ? errorLogin : errorRegister}
              />
            </div>
            {operation == "log" && (
              <p className="forget">{t("Forget Password?")}</p>
            )}
            {operation == "sign" ? (
              <button onClick={onClickSignUp} className="create">
                {t("Create Account")}
              </button>
            ) : (
              <button onClick={onClickLogin} className="log">
                {t("Log in")}
              </button>
            )}
            <div className="another">
              <p>{t("OR")}</p>
              <h5>{t("Continue with social media")}</h5>
              <div className="btns">
                <button>
                  {" "}
                  <img src={google} alt="" /> <p>{t("Continue with google")}</p>
                </button>
                <button>
                  {" "}
                  <img src={facebook} alt="" />{" "}
                  <p>{t("Continue with Facebook")}</p>
                </button>
              </div>
            </div>
          </Auth>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignLogin;
