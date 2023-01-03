import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Images = () => {
  const router = useRouter();
  const myImages = [
    "/wolf.png",
    "/car.png",
    "/bookshelf.png",
    "/soccer.png",
    "/archi.png",
    "/space.png",
    "/coding.png",
    "/view.png",
    "/study.png",
  ];
  return (
    <main style={{ height: "100vh" }} className="app__flex">
      <article className="column-flex modal">
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Select Any Image Below
        </h1>
        <p className="p-text-2" style={{ marginBottom: "20px" }}>
          Please select any Image below to generate
          <br />a pattern from it
        </p>
        <div style={{ marginBottom: "25px" }} className="progress app__flex">
          <p className="filled">1</p>
          <Image src={"/Line 131.png"} alt="line" width={140} height={1} />
          <p className="filled">2</p>
          <Image src={"/Line 131.png"} alt="line" width={140} height={1} />
          <p className="filled">3</p>
        </div>
        <div className="modal-images app__flex-3">
          {myImages.map((item, index) => (
            <Image key={index} src={item} width={154} height={110} alt="im" />
          ))}
        </div>
        <div
          style={{ marginTop: "22px", marginBottom: "40px" }}
          className="modal-btn column-flex"
        >
          <button
            onClick={() => router.push("./success")}
            className="primary-btn"
          >
            Next
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

export default Images;
