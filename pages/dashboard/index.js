import React from 'react'

const Dashboard = ({fullName}) => {
  return (
    <main className="dashboard column-flex">
        <h6>welcome</h6>
        <h1>{fullName}</h1>
        <button>Goto Dashboard</button>
    </main>
  )
}

export default Dashboard;