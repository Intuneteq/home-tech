import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";

const ResetPassword = () => {
    const router = useRouter();
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
        Create a new password below to<br/> continue
        </p>
        <div style={{ marginBottom: "45px" }} className="progress app__flex-2">
          <p className="filled">1</p>
          <p className="dense">2</p>
          <p className="dense">3</p>
        </div>
        <div
        //  className={emailErrMsg ? "modal-input error" : "modal-input"}
        className="modal-input"
         >
          <input
            // ref={emailRef}
            type="text"
            placeholder="New Password"
            // onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className={"email-error input-error"}
          />
          <Image src={"/sms.svg"} width={24} height={24} alt="email" />
        </div>
        <div 
        // className={errMsg ? "modal-input error" : "modal-input"}
        className="modal-input"
        >
          <input
            // type={showPassword ? "text" : "password"}
            type={"text"}
            placeholder="Confirm New Password"
            // onChange={(e) => setPassword(e.target.value)}
            // className={errMsg ? "input-error" : null}
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
        <div
          style={{  marginBottom: "132px", marginTop: '20px'}}
          className="modal-btn column-flex"
        >
          <button onClick={() => router.push('/reset-password')} className="primary-btn">Reset Password</button>
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
