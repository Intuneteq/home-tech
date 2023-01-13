import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

import useAppProvider from "../../hooks/useAppProvider";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const router = useRouter();
  const { userId } = useAppProvider();

  useEffect(() => {
    setErrMsg("");
  }, [confirmPassword]);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [confirmPassword, password]);

  useEffect(() => {
    if (confirmPassword && !passwordMatch) {
      setErrMsg("Your password does not match");
    } else if (confirmPassword && passwordMatch) {
      setErrMsg("");
    }
  }, [confirmPassword, passwordMatch]);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      console.log('user', userId, password)
      await axios.post('/api/changePassword', {userId, password});
      router.push("/colors/register");
      toast.success('password changed')
    } catch (error) {
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft onClick={() => router.back()} />
        </div>
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Reset Password
        </h1>
        <p style={{ marginBottom: "20px" }} className="p-text-2">
          Create a new password below to
          <br /> continue
        </p>
        <div style={{ marginBottom: "45px" }} className="progress app__flex-2">
          <p className="filled">1</p>
          <p className="dense">2</p>
          <p className="dense">3</p>
        </div>
        <div className="modal-input">
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            className={"email-error input-error"}
          />
          <Image src={"/eye-slash.svg"} width={24} height={24} alt="email" />
        </div>
        <div className={errMsg ? "modal-input error" : "modal-input"}>
          <input
            // type={showPassword ? "text" : "password"}
            type={"password"}
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errMsg ? "input-error" : null}
          />
          <Image
            // onClick={() => setShowPassword(!showPassword)}
            // src={showPassword ? "/showpassword.png" : "/eye-slash.svg"}
            src={"/eye-slash.svg"}
            width={24}
            height={24}
            alt="email"
          />
        </div>
        <span className={errMsg ? "error-span" : "offscreen"}>{errMsg}</span>
        <div
          style={{ marginBottom: "132px", marginTop: "20px" }}
          className="modal-btn column-flex"
        >
          <button
            disabled={passwordMatch ? false : true}
            onClick={handleResetPassword}
            className="primary-btn"
          >
            {loading ? 'validating...' :"Reset Password"}
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

export default ResetPassword;
