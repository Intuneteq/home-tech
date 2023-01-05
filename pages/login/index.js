import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const emailRef = useRef();

  useEffect(() => {
    setErrMsg("");
    setEmailErrMsg("");
  }, [email, password]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await axios.post("/api/login", { email, password });
      localStorage.setItem("homeTechMail", email);
      toast.success("Login Successfull");
      router.push("/colors/login");
    } catch (error) {
      console.log(error);
      switch (error?.response?.status) {
        case 400:
          setErrMsg("email and password required");
          break;
        case 404:
          setEmailErrMsg("Invalid email address");
          break;
        case 401:
          setErrMsg("Sorry, you have entered a wrong password");
          break;
        default:
          setErrMsg("No server response");
          break;
      }
    }
    setLoading(false);
  };

  return (
    <main style={{ height: "100vh" }} className="app__flex">
      <article className="column-flex modal">
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Sign In to Continue
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
        <div className={emailErrMsg ? "modal-input error" : "modal-input"}>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className={"email-error input-error"}
          />
          <Image src={"/sms.svg"} width={24} height={24} alt="email" />
        </div>
        <span className={emailErrMsg ? "error-span" : "offscreen"}>
          {emailErrMsg}
        </span>
        <div className={errMsg ? "modal-input error" : "modal-input"}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={errMsg ? "input-error" : null}
          />
          <Image
            onClick={() => setShowPassword(!showPassword)}
            src={showPassword ? "/showpassword.png" : "/eye-slash.svg"}
            width={24}
            height={24}
            alt="email"
          />
        </div>
        <span className={errMsg ? "error-span" : "offscreen"}>{errMsg}</span>
        <div
          style={{ marginTop: "22px", marginBottom: "10px" }}
          className="modal-btn column-flex"
        >
          <button onClick={handleLogin} className="primary-btn">
            {loading ? "Signing In..." : "Next"}
          </button>
        </div>
        <p style={{ marginBottom: "44px" }} className="p-text">
          Don’t have an account{" "}
          <span
            style={{
              color: "#0076A7",
              fontWeight: "700",
            }}
            onClick={() => router.push("/register")}
          >
            Register
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

export default Login;
