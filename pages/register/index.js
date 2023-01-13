import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';

import useAppProvider from "../../hooks/useAppProvider";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState('');
  const router = useRouter();
  const { setuserId } = useAppProvider();

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true)
    email.toLocaleLowerCase()
    const body = { fullName, email, password };
    localStorage.setItem('homeTechMail', email)
    try {
      const res = await axios.post("/api/register", body);
      setuserId(res.data.userId)
      toast.success(`verify your otp`)
      router.push("/otp");
    } catch (error) {
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Create an Account
        </h1>
        <p style={{ marginBottom: "20px" }} className="p-text-2">
          Fill in your details below to create an
          <br />
          account with us
        </p>
        <div style={{ marginBottom: "45px" }} className="progress app__flex-2">
          <p className="filled">1</p>
          <p className="dense">2</p>
          <p className="dense">3</p>
        </div>
        <div className="modal-input">
          <input
            type="text"
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Image src={"/fullname.svg"} width={24} height={24} alt="fullname" />
        </div>
        <div className="modal-input">
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <Image src={"/sms.svg"} width={24} height={24} alt="email" />
        </div>
        <div className="modal-input">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Image src={"/eye-slash.svg"} width={24} height={24} alt="email" />
        </div>
        <div
          style={{ marginTop: "22px", marginBottom: "10px" }}
          className="modal-btn column-flex"
        >
          <button disabled={!email || !fullName || !password ? true : false} onClick={handleNext} className="primary-btn">
            {loading ? 'Signing up...' : 'Next'}
          </button>
        </div>
        <p style={{ marginBottom: "44px" }} className="p-text">
          Already have an account{" "}
          <span
            style={{
              color: "#0076A7",
              fontWeight: "700",
            }}
          >
            Sign In
          </span>
        </p>
        <div className="modal-footer app__flex-2">
          <p>Privacy and Policy</p>
          <p>FAQ</p>
        </div>
      </article>
    </main>
  );
};

export default Register;
