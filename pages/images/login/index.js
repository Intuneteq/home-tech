import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

import Images from "../../../components/Images";

const ImageLogin = () => {
  const router = useRouter();
  const [imageString, setImageString] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    try {
       await axios.post(
        "/api/images/login", {imageString},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`verification successful`);
      router.push("/image-pattern/login");
    } catch (error) {
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
    setLoading(false)
  };

  return <Images handleNext={handleNext} setImageString={setImageString} loading={loading} />;
};

export default ImageLogin;
