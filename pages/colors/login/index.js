import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Colors from "../../../components/colors";

const LoginColor = () => {
  const [loading, setLoading] = useState(false);
  const [colorArray, setColorArray] = useState([]);
  const router = useRouter();
  function clearArray() {
    setColorArray([]);
  }

  const handleNext = async () => {
    setLoading(true);
    const email = localStorage.getItem("homeTechMail");
    try {
      await axios.post("/api/colors/login", {
        colorCombination: colorArray,
        email,
      });
      toast.success(`color combination valid`);
      router.push("/images/login");
    } catch (error) {
      console.log(error);
      clearArray();
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Colors loading={loading} handleNext={handleNext} colorArray={colorArray} setColorArray={setColorArray} />
  );
};

export default LoginColor;
