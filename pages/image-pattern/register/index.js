import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import ImagePattern from "../../../components/ImagePattern";

const RegisterImagePattern = () => {
  const imgPattern = [];
  const router = useRouter();

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
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
  };
  return <ImagePattern handleSubmit={handleSubmit} imgPattern={imgPattern} />;
};

export default RegisterImagePattern;
