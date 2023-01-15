import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import axios from "../../../api/axios";
import ImagePattern from "../../../components/ImagePattern";

const ImagePatternLogin = () => {
  const [loading, setLoading] = useState(false);
  const [imgPattern, setImgPattern] = useState([]);
  const router = useRouter();
  function clearArray() {
    setImgPattern([]);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("api/pattern/login", {imgPattern});
      toast.success(`Validation success`);
      router.push("/dashboard");
      clearArray();
    } catch (error) {
      clearArray();
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <ImagePattern
      loading={loading}
      handleSubmit={handleSubmit}
      imgPattern={imgPattern}
      setImgPattern={setImgPattern}
    />
  );
};

export default ImagePatternLogin;
