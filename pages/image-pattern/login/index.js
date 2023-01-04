import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import ImagePattern from "../../../components/ImagePattern";

const ImagePatternLogin = () => {
  const [loading, setLoading] = useState(false);
  const imgPattern = [];
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const email = localStorage.getItem("homeTechMail");
    try {
      await axios.post("/api/pattern/login", {
        imgPattern,
        email,
      });
      toast.success(`Validation success`);
      router.push("/dashboard");
    } catch (error) {
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
    />
  );
};

export default ImagePatternLogin;
