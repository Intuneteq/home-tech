import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Colors from "../../../components/colors";

const RegisterColor = () => {
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
      router.push("/images/register");
    } catch (error) {
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
  };

  return <Colors handleNext={handleNext} colorArray={colorArray} />;
};

export default RegisterColor;
