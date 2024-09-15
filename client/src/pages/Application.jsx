import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { FooterComponent, HeaderComponent } from ".";

const Application = () => {
  return (
    <Fragment>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </Fragment>
  );
};

export default Application;
