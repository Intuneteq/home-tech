import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const router = useRouter();
    const emailRef = useRef();

    useEffect(() => {
        setEmailErrMsg("");
      }, [email]);

    useEffect(() => {
        emailRef.current.focus();
      }, []);

      const handleForgotPassword = () => {
        router.push("/emailLink");
      }

  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft />
        </div>
        <h1 style={{ marginBottom: "8px" }} className="head-text">
        Forgot Your Password?
        </h1>
        <p style={{ marginBottom: "20px" }} className="p-text-2">
        Enter your email address in the form below and we will send you further instruction on how to reset your password
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
        <div
          style={{ marginTop: "22px", marginBottom: "156px" }}
          className="modal-btn column-flex"
        >
          <button
            disabled={!email ? true : false}
            onClick={handleForgotPassword}
            className="primary-btn"
          >
            {/* {loading ? "Signing In..." : "Next"} */}
            Send Link
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
