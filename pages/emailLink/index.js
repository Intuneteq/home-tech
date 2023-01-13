import React from "react";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";

const EmailLink = () => {
    const router = useRouter();
  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft onClick={() =>router.back()} />
        </div>
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Link Sent
        </h1>
        <p style={{ marginBottom: "40px" }} className="p-text-2">
          Please kindly check your email for a password reset link and follow
          the instruction
        </p>
        <div
          style={{  marginBottom: "16px" }}
          className="modal-btn column-flex"
        >
          <button onClick={() => router.push('/reset-password')} className="primary-btn">Go to Email</button>
        </div>
        <div
          style={{ marginTop: "22px", marginBottom: "156px" }}
          className="modal-btn column-flex"
        >
          <button onClick={() => router.push('/')} className="tertiary-btn">Back to Home</button>
        </div>
        <div className="modal-footer app__flex-2">
          <p>Privacy and Policy</p>
          <p>FAQ</p>
        </div>
      </article>
    </main>
  );
};

export default EmailLink;
