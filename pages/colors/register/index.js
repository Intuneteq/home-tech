import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import Colors from "../../../components/colors";
import useAppProvider from "../../../hooks/useAppProvider";

const RegisterColor = () => {
  const [loading, setLoading] = useState(false);
  const [colorArray, setColorArray] = useState([]);
  const { getUserEmail } = useAppProvider();
  const router = useRouter();

  const handleNext = async () => {
    setLoading(true);
    try {
      await axios.post("api/colors/register", {
        colorCombination: colorArray,
        email: getUserEmail(),
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

  return (
    <Colors
      loading={loading}
      handleNext={handleNext}
      colorArray={colorArray}
      setColorArray={setColorArray}
    />
  );
};

export default RegisterColor;
