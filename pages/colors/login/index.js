import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Colors from "../../../components/colors";

const LoginColor = () => {
  const router = useRouter();
  const colorArray = [];
  function clearArray() {
    while (colorArray.length > 0) {
      colorArray.pop();
    }
  }

  const handleNext = async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    try {
      await axios.post(
        "/api/colors/login",
        {
          colorCombination: colorArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`color combination valid`);
      router.push("/images/login");
    } catch (error) {
      console.log(error);
      clearArray();
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
  };

  return <Colors handleNext={handleNext} colorArray={colorArray} />;
};

export default LoginColor;
