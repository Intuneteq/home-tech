import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";


const Navbar = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('home-tech')
    setToken(auth)
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    setToken('')
    router.push('/');
  }

  return (
    <nav className="nav app__flex-2">
      <div className="app__flex">
        <Image src="/Ellipse 460.png" alt="logo" width={53} height={53} />
        <p className="p-text">HomeTech</p>
      </div>
      <div>
        {token ? <button onClick={handleLogOut}>Logout</button> : <p className="p-text">About us</p>}
      </div>
    </nav>
  );
};

export default Navbar;
