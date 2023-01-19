import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { HiArrowNarrowLeft } from "react-icons/hi";

import useAppProvider from "../../hooks/useAppProvider";
import axios from "../../api/axios";

const OTPVerification = () => {
  const [otp, setOTP] = useState("");
  const { otpEmail, resetPassword, setResetPassword } =
    useAppProvider();
  const router = useRouter();

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      await axios.post("api/otp/", { otp });
      toast.success("Account Verified Successfully");
      if (resetPassword) {
        router.push("/reset-password");
        setResetPassword(false);
      } else {
        router.push("/colors/register");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.get('/api/resendOTP')
      toast.info('otp sent to '+otpEmail)
    } catch (error) {
      console.log(error)
      toast.error('Try again')
    }
  };

  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft onClick={() => router.back()} />
        </div>
        <h1 style={{ marginBottom: "12px" }} className="head-text">
          Verify Your Email
        </h1>
        <p style={{ marginBottom: "40px" }} className="p-text-2">
          Enter the code sent to <b style={{ color: "#131313" }}>{otpEmail}</b>{" "}
          to verify your email address
        </p>
        <div className="modal-input">
          <input
            type="text"
            placeholder="Enter OTP code"
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "40px" }} className="extras app__flex-5">
          <p className="p-text">
            Didn’t the get code?{" "}
            <span
              style={{
                color: "#0076A7",
                fontWeight: "700",
              }}
              onClick={handleResendCode}
            >
              Resend code
            </span>
          </p>
        </div>
        <div style={{ marginBottom: "40px" }} className="modal-btn column-flex">
          <button
            disabled={otp ? false : true}
            onClick={handleVerification}
            className="primary-btn"
          >
            Submit
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

export default OTPVerification;
