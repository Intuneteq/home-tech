import React from 'react'
import { useRouter } from "next/router";

const Dashboard = ({fullName}) => {
  const router = useRouter();
  return (
    <main className="dashboard column-flex">
        <h6>welcome</h6>
        <h1>{fullName}</h1>
        <button onClick={() => router.push('/')}>Goto Dashboard</button>
    </main>
  )
}

export default Dashboard;