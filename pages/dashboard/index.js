import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import useAppProvider from "../../hooks/useAppProvider";

const Dashboard = () => {
  const { fullName, setFullName } = useAppProvider();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("home-tech");
    const getUser = async () => {
      try {
        const res = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      <h1>{fullName}</h1>
      <button onClick={() => router.push("/")}>Goto Dashboard</button>
    </main>
  );
};

export default Dashboard;
