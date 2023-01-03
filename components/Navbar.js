import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="nav app__flex-2">
      <div className="app__flex">
        <Image src="/Ellipse 460.png" alt="logo" width={53} height={53} />
        <p className="p-text">HomeTech</p>
      </div>
      <div>
        <p className="p-text">About us</p>
      </div>
    </nav>
  );
};

export default Navbar;
