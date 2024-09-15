import { createContext, useContext, useEffect, useState } from "react";
import apiAxios from "../utils/apiAxios";

const GlarusContext = createContext();

export const GlarusProvider = ({ children }) => {
  // user Info
  const [user, setUser] = useState([]);
  // user Info

  // notifications
  const [notifications, setNotifications] = useState([]);
  // notifications

  // otp verification
  const [isModalOtpOpen, setModalOtpOpen] = useState(false);
  const closeModalOtp = () => setModalOtpOpen(false);
  // otp verification

  // Modal Auth
  const [operation, setOperation] = useState("");
  const [isModalAuthOpen, setModalAuthOpen] = useState(false);
  const closeModalAuth = () => setModalAuthOpen(false);
  // Modal Auth

  // global Loading falg
  const [loading, setLoading] = useState(false);
  // global Loading falg

  useEffect(() => {
    const { token } = localStorage;
    if (!token) return;
    (async () => {
      setLoading(true);
      const { data } = await apiAxios.get("user", {
        headers: { accesstoken: token },
      });
      setUser(data?.userData);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);
  return (
    <GlarusContext.Provider
      value={{
        user,
        notifications,
        setNotifications,
        loading,
        setLoading,

        // modal auth
        operation,
        setOperation,
        isModalAuthOpen,
        setModalAuthOpen,
        closeModalAuth,
        // modal auth

        // modal otp
        isModalOtpOpen,
        setModalOtpOpen,
        closeModalOtp,
        // modal otp
      }}
    >
      {children}
    </GlarusContext.Provider>
  );
};

export const useGlarusContext = () => {
  return useContext(GlarusContext);
};
