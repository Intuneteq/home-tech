import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import useAppProvider from "../hooks/useAppProvider";
import { deleteCookie } from 'cookies-next';

const Navbar = () => {
  const { fullName, setFullName } = useAppProvider();
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.clear();
    setFullName("");
    deleteCookie('user_hometech')
    router.push("/");
  };

  return (
    <nav className="nav app__flex-2">
      <div className="app__flex">
        <Image src="/Ellipse 460.png" alt="logo" width={53} height={53} />
        <p className="p-text">HomeTech</p>
      </div>
      <div>
        {fullName ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <p className="p-text">About us</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
