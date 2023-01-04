import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const ImagePattern = () => {
  const router = useRouter();
  const imgPattern = [];

  const pushIndex = (index, e) => {
    e.preventDefault();
    const findIndex = imgPattern.some((item) => item === index);
    console.log(findIndex, "findindex");

    if (findIndex || imgPattern.length >= 3) {
      toast.warn("invalid");
    } else {
      imgPattern.push(index);
    }
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("homeTechMail");
    try {
      await axios.post("/api/pattern/register", {
        email,
        imgPattern,
      });
      toast.success(`Validation success`);
      router.push("/success");
    } catch (error) {
      console.log(error);
      error.response.data
        ? toast.error(error.response.data.message)
        : toast.error("something went wrong");
    }
  };

  const grid = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
    "/10.png",
    "/11.png",
    "/12.png",
    "/13.png",
    "/14.png",
    "/15.png",
    "/16.png",
    "/17.png",
    "/18.png",
    "/19.png",
    "/20.png",
  ];
  return (
    <main style={{ height: "100vh" }} className="app__flex">
      <article className="column-flex modal">
        <h1 style={{ marginBottom: "8px" }} className="head-text">
          Select Your Image Pattern
        </h1>
        <p className="p-text-2" style={{ marginBottom: "20px" }}>
          Please select two image block to complete
          <br />
          your registration
        </p>
        <div style={{ marginBottom: "44px" }} className="progress app__flex">
          <p className="filled">1</p>
          <Image src={"/Line 131.png"} alt="line" width={140} height={1} />
          <p className="filled">2</p>
          <Image src={"/Line 131.png"} alt="line" width={140} height={1} />
          <p className="filled">3</p>
        </div>
        <div style={{ marginBottom: "40px" }} className="modal-grid app__flex">
          {grid.map((item, index) => (
            <Image
              src={item}
              width={85}
              height={73}
              alt="grid"
              key={index}
              onClick={(e) => pushIndex(index, e)}
            />
          ))}
        </div>
        <div style={{ marginBottom: "62px" }} className="modal-btn column-flex">
          <button onClick={handleSubmit} className="primary-btn">
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

export default ImagePattern;
