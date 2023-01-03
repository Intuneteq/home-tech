import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="outlet">{children}</div>
    </>
  );
};

export default Layout;
