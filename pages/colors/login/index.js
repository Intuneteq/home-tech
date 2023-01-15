import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import axios from "../../../api/axios";
import Colors from "../../../components/colors";

const LoginColor = () => {
  const [loading, setLoading] = useState(false);
  const [colorArray, setColorArray] = useState([]);
  const router = useRouter();
  function clearArray() {
    setColorArray([]);
  }

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("api/colors/login", { colorCombination: colorArray });
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
    <Colors
      loading={loading}
      handleNext={handleNext}
      colorArray={colorArray}
      setColorArray={setColorArray}
    />
  );
};

export default LoginColor;
