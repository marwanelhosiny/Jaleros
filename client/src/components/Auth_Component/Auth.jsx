import React from "react";
import "./auth.scss";

function Auth({ children, needForce = false }) {
  return <div className={`auth ${needForce && "force"}`}>{children}</div>;
}

export default Auth;
