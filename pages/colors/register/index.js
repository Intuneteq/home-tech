import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Colors from "../../../components/colors";

const RegisterColor = () => {
  const [loading, setLoading] = useState(false);
  const [colorArray, setColorArray] = useState([]);
  const router = useRouter();

  const handleNext = async () => {
    setLoading(true);
    const email = localStorage.getItem("homeTechMail");
    try {
      await axios.post("/api/colors/register", {
        email,
        colorCombination: colorArray,
      });
      toast.success(`color combination registered`);
      router.push("/images/register");
    } catch (error) {
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return <Colors loading={loading} handleNext={handleNext} colorArray={colorArray} setColorArray={setColorArray} />;
};

export default RegisterColor;
