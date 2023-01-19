import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { HiArrowNarrowLeft } from "react-icons/hi";
import axiosCall from "../api/axios";
import axios from "axios";

const ImagePattern = ({ handleSubmit, imgPattern, setImgPattern, loading }) => {
  const [grid, setGrid] = useState([]);
  const [active, setActive] = useState({
    activeObject: null,
    objects: [],
  });

  const pushIndex = (index, e) => {
    e.preventDefault();
    setActive({ ...active, activeObject: active.objects[index] });
    const findIndex = imgPattern.some((item) => item === index);

    if (findIndex || imgPattern.length >= 3) {
      toast.warn("invalid");
    } else {
      setImgPattern([...imgPattern, index]);
    }
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getImages = async () => {
      try {
        const res = await axiosCall.get("/api/pattern/register", {
          cancelToken: cancelToken.token,
        });
        setGrid(res.data.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("req cancelled");
        } else {
          console.log(error);
        }
      }
    };
    getImages();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    setActive((prev) => ({ ...prev, objects: grid }));
  }, [grid]);

  const toggleActiveClassName = (i) => {
    if (active.objects[i] === active.activeObject) {
      return "animate__animated animate__heartBeat";
    } else {
      return "";
    }
  };

  const handleReset = () => {
    setImgPattern([]);
  };

  return (
    <main style={{ height: "100%" }} className="app__flex main">
      <article className="column-flex modal">
        <div className="modal-arrow">
          <HiArrowNarrowLeft onClick={() => router.back()} />
        </div>
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
              className={toggleActiveClassName(index)}
              onClick={(e) => pushIndex(index, e)}
            />
          ))}
        </div>
        <div style={{ marginBottom: "10px" }} className="modal-btn column-flex">
          <button
            disabled={imgPattern.length < 3 ? true : false}
            onClick={handleSubmit}
            className="primary-btn"
          >
            {loading ? "validating..." : "Submit"}
          </button>
        </div>
        <div style={{ marginBottom: "62px" }} className="modal-btn column-flex">
          <button
            disabled={imgPattern.length >= 1 ? false : true}
            onClick={handleReset}
            className="tertiary-btn"
          >
            Reset
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
