import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import axios from "../../../api/axios";
import ImagePattern from "../../../components/ImagePattern";
import useAppProvider from "../../../hooks/useAppProvider";

const RegisterImagePattern = () => {
  const [loading, setLoading] = useState(false);
  const [imgPattern, setImgPattern] = useState([]);
  const { getUserEmail } = useAppProvider();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("api/pattern/register", { imgPattern, email: getUserEmail() });
      toast.success(`Validation success`);
      router.push("/success");
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
      setImgPattern={setImgPattern}
    />
  );
};

export default RegisterImagePattern;
