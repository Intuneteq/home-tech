import React from "react";
import Image from "next/image";

const Images = ({ handleNext, setImageString, loading }) => {

  const myImages = [
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735827/home-tech/wolf_rbnaha.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735796/home-tech/car_wed6bw.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735842/home-tech/bookshelf_mwy0j2.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735846/home-tech/soccer_bfrfmx.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735809/home-tech/bird_xbkpvz.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735804/home-tech/space_hligja.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735821/home-tech/coding_ozx1b0.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735855/home-tech/view_xgti8w.png",
    },
    {
      src: "https://res.cloudinary.com/intuneteq/image/upload/v1672735854/home-tech/work_rthnax.png",
    },
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
            <Image
              key={index}
              src={item.src}
              width={154}
              height={110}
              alt="im"
              onClick={() => setImageString(item.src)}
            />
          ))}
        </div>
        <div
          style={{ marginTop: "22px", marginBottom: "40px" }}
          className="modal-btn column-flex"
        >
          <button onClick={handleNext} className="primary-btn">
            {loading ? 'validating...' : 'Next'}
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
