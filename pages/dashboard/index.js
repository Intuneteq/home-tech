import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "../../api/axios";
import useAppProvider from "../../hooks/useAppProvider";

const Dashboard = () => {
  const { fullName, setFullName } = useAppProvider();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("api/user");
        setFullName(res.data.data.fullName)
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [setFullName]);

  return (
    <main style={{minHeight: '100vh'}} className="dashboard column-flex">
      <h6>welcome</h6>
      <h1>{fullName.toUpperCase()}</h1>
      <button onClick={() => router.push("/")}>Goto Dashboard</button>
    </main>
  );
};

export default Dashboard;
