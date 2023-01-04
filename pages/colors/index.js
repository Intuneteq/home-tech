import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const Colors = () => {
  const router = useRouter();
  const colorArray = [];

  const handleNext = async () => {
    const email = localStorage.getItem("homeTechMail");
    try {
      await axios.post("/api/colors/register", {
        email,
        colorCombination: colorArray,
      });
      toast.success(`color combination registered`);
      router.push("/images");
    } catch (error) {
      console.log(error);
      error.response.data
        ? toast.error(error.response.data.message)
        : toast.error("something went wrong");
    }
  };

  const handlePush = (hexCode) => {
    const colorExistInArray = colorArray.find((item) => item == hexCode);
    if (colorExistInArray) {
      toast.warn("you already selected this");
    } else {
      colorArray.push(hexCode);
    }
  };

  return (
    <main style={{ height: "100vh" }} className="app__flex">
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
            src={"/blue.png"}
            width={80}
            height={80}
            alt="blue"
            onClick={() => handlePush("#115FDB")}
          />
          <Image
            src={"/orange.png"}
            width={80}
            height={80}
            alt="blue"
            onClick={() => handlePush("#F65B2B")}
          />
          <Image
            src={"/red.png"}
            width={80}
            height={80}
            alt="blue"
            onClick={() => handlePush("#E5017C")}
          />
        </div>
        <div style={{ marginBottom: "140px" }} className="modal-btn">
          <button onClick={handleNext} className="primary-btn">
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

export default Colors;
