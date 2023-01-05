import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const Colors = ({ handleNext, colorArray, loading }) => {
  const [animate, setAnimate] = useState({
    activeColor: null,
  });

  const handlePush = (hexCode) => {
    setAnimate({ ...animate, activeColor: hexCode });
    const colorExistInArray = colorArray.find((item) => item == hexCode);
    if (colorExistInArray) {
      toast.warn("you already selected this");
    } else {
      colorArray.push(hexCode);
    }
  };

  const toggleActiveClassName = (hexCode) => {
    if (animate.activeColor === hexCode) {
      return "animate__animated animate__pulse";
    } else {
      return "";
    }
  };

  return (
    <main style={{ height: "100vh" }} className="app__flex main">
      <article className="modal column-flex">
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Select Your Color Combination
        </h1>
        <p style={{ marginBottom: "20px" }} className="p-text-2">
          Please select the colors below according
          <br />
          to your choice
        </p>
        <div style={{ marginBottom: "91px" }} className="progress app__flex-2">
          <div className="app__flex">
            <p className="filled">1</p>
            <Image src={"/Line 131.png"} alt="line" width={140} height={1} />
            <p className="filled">2</p>
          </div>
          <p className="dense">3</p>
        </div>
        <div
          style={{ marginBottom: "70px" }}
          className="app__flex-2 modal-colors"
        >
          <Image
            className={toggleActiveClassName("#115FDB")}
            onAnimationEnd={() =>
              setAnimate({ ...animate, activeColor: null })
            }
            src={"/blue.png"}
            width={80}
            height={80}
            alt="blue"
            onClick={() => handlePush("#115FDB")}
          />
          <Image
            className={toggleActiveClassName("#F65B2B")}
            onAnimationEnd={() =>
              setAnimate({ ...animate, activeColor: null })
            }
            src={"/orange.png"}
            width={80}
            height={80}
            alt="blue"
            onClick={() => handlePush("#F65B2B")}
          />
          <Image
            className={toggleActiveClassName("#E5017C")}
            onAnimationEnd={() =>
              setAnimate({ ...animate, activeColor: null })
            }
            src={"/red.png"}
            width={80}
            height={80}
            alt="blue"
            onClick={() => handlePush("#E5017C")}
          />
        </div>
        <div style={{ marginBottom: "140px" }} className="modal-btn">
          <button disabled={colorArray.length < 3 ? true : false} onClick={handleNext} className="primary-btn">
            {loading ? "Validating..." : "Next"}
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

export default Colors;
