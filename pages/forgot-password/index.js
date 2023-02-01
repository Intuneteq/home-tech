import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

import useAppProvider from "../../hooks/useAppProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef();
  const { setOtpEmail } = useAppProvider();
  const Email_REGEX = useMemo(() => /^\S+@\S+\.\S+$/, []);

  useEffect(() => {
    setValidEmail(Email_REGEX.test(email));
  }, [email, Email_REGEX]);

  useEffect(() => {
    setEmailErrMsg("");
  }, [email]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forgotPassword", { email });
      localStorage.setItem("h-token", res.data.accessToken);
      setOtpEmail(email);
      toast.success(`verify your otp`);
      router.push("/emailLink");
    } catch (error) {
      console.log(error);
      const errorStatus = error.response.status;
      switch (errorStatus) {
        case 404:
          setEmailErrMsg("email does not exist");
          break;
        case 500:
          setEmailErrMsg("No server response");
          break;
        default:
          setEmailErrMsg("could not verify emaill address");
          break;
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
          Forgot Your Password?
        </h1>
        <p style={{ marginBottom: "20px" }} className="p-text-2">
          Enter your email address in the form below and we will send you
          further instruction on how to reset your password
        </p>
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
        <div
          style={{ marginTop: "22px", marginBottom: "156px" }}
          className="modal-btn column-flex"
        >
          <button
            disabled={!validEmail ? true : false}
            onClick={handleForgotPassword}
            className="primary-btn"
          >
            {loading ? "Sending..." : "Send Link"}
          </button>
        </div>
        <div className="modal-footer app__flex-2">
          <p>Privacy and Policy</p>
          <p>FAQ</p>
        </div>
      </article>
    </main>
  );
};

export default ForgotPassword;
