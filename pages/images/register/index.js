import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "../../../api/axios";

import Images from "../../../components/Images";

const RegisterImage = () => {
  const router = useRouter();
  const [imageObject, setImageObject] = useState({});

  const handleNext = async () => {
    try {
      await axios.post("api/images/register", {imageObject});
      toast.success(`Image upload success`);
      router.push("/image-pattern/register");
    } catch (error) {
      console.log(error);
      error?.response?.data === undefined || error?.response?.data === null
        ? toast.error("something went wrong")
        : toast.error(error.response.data.message);
    }
  };

  return (
    <Images
      handleNext={handleNext}
      imageObject={imageObject}
      setImageObject={setImageObject}
    />
  );
};

export default RegisterImage;
