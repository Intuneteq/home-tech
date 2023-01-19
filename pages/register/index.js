import React, { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { HiArrowNarrowLeft } from "react-icons/hi";

import useAppProvider from "../../hooks/useAppProvider";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const emailRef = useRef();
  const router = useRouter();
  const { setOtpEmail, setuserId } = useAppProvider();
  const Email_REGEX = useMemo(() => /^\S+@\S+\.\S+$/, []);

  useEffect(() => {
    setValidEmail(Email_REGEX.test(email));
  }, [email, Email_REGEX]);

  // useEffect(() => {
  //   emailRef.current.focus();
  // }, []);

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOtpEmail(email);
    const body = { fullName, email, password };

    try {
      const res = await axios.post("/api/register", body);
      setuserId(res.data.userId);
      localStorage.setItem("h-token", res.data.accessToken);
      toast.success(`Account Successfully Created`);
      router.push("/otp");
    } catch (error) {
      console.log(error);
      if (!error?.response?.data) {
        setErrMsg("Account not created, Try again");
      } else if (error?.response?.status == 500) {
        setErrMsg("Account not created, Try again");
      } else if (error?.response?.status == 400) {
        setEmailErrMsg("Email Address already exist");
      } else {
        setErrMsg(error.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft onClick={() => router.back()} />
        </div>
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
        <div className={emailErrMsg ? "modal-input error" : "modal-input"}>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className={"email-error input-error"}
          />
          <Image src={"/sms.svg"} width={24} height={24} alt="email" />
        </div>
        <span className={emailErrMsg ? "error-span" : "offscreen"}>
          {emailErrMsg}
        </span>
        <div className="modal-input error">
          <input
            type={togglePassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Image
            style={{ cursor: "pointer" }}
            onClick={() => setTogglePassword(!togglePassword)}
            src={togglePassword ? "/eye.svg" : "/eye-slash.svg"}
            width={24}
            height={24}
            alt="password"
          />
        </div>
        <span className={errMsg ? "error-span" : "offscreen"}>{errMsg}</span>
        <div
          style={{ marginTop: "22px", marginBottom: "10px" }}
          className="modal-btn column-flex"
        >
          <button
            disabled={!validEmail || !fullName || !password ? true : false}
            onClick={handleNext}
            className="primary-btn"
          >
            {loading ? "Signing up..." : "Next"}
          </button>
        </div>
        <p style={{ marginBottom: "44px" }} className="p-text">
          Already have an account?{" "}
          <span
            style={{
              color: "#0076A7",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onClick={() => router.push("/login")}
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
