import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <h1 style={{ marginBottom: "21px" }} className="head-text">
          Congratulations
        </h1>
        <p className="p-text-2" style={{ marginBottom: "40px" }}>
          Your account has been created
          <br />
          successfully
        </p>
        <div style={{ marginBottom: "40px" }}>
          <Image src={"/congrats.png"} width={325} height={256} alt="success" />
        </div>
        <div className="modal-btn">
          <button
            onClick={() => router.push("./login")}
            className="primary-btn"
          >
            Goto Log In
          </button>
        </div>
      </article>
    </main>
  );
};

export default Success;
