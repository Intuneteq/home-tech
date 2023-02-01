import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";

import myImages from "../data/Images";

const Images = ({ handleNext, imageObject, setImageObject, loading }) => {
  const router = useRouter();
  const [active, setActive] = useState({
    activeObject: null,
    objects: [],
  });

  useEffect(() => {
    setActive((prev) => ({ ...prev, objects: myImages }));
  }, []);

  const toggleActive = (item, i) => {
    setActive({ ...active, activeObject: active.objects[i] });
    setImageObject(item);
  };

  const toggleActiveClassName = (i) => {
    if (active.objects[i] === active.activeObject) {
      return "animate__animated animate__heartBeat";
    } else {
      return "";
    }
  };

  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft onClick={() => router.back()} />
        </div>
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
            <Image
              className={toggleActiveClassName(index)}
              onAnimationEnd={() =>
                setActive({ ...active, activeObject: null })
              }
              key={index}
              src={item.src}
              width={154}
              height={110}
              alt="im"
              onClick={() => toggleActive(item, index)}
            />
          ))}
        </div>
        <div
          style={{ marginTop: "22px", marginBottom: "40px" }}
          className="modal-btn column-flex"
        >
          <button
            disabled={imageObject.src ? false : true}
            onClick={handleNext}
            className="primary-btn"
          >
            {loading ? "validating..." : "Next"}
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
