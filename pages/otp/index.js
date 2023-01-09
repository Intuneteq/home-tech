import React, { useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';

import useAppProvider from '../../hooks/useAppProvider';

const OTPVerification = () => {
    const [otp, setOTP] = useState("");
    const { userId } = useAppProvider();
    const router = useRouter()
    const handleVerification = async () => {
        try {
            const res = await axios.post('/api/otp', {userId, otp});
            console.log(res)
            toast.success('OTP verified');
            router.push('/colors/register')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <main style={{ height: "100vh" }} className="app__flex main">
        <article className="column-flex modal">
        <h1 style={{ marginBottom: "12px" }} className="head-text">
          Verify Your OTP
        </h1>
        <div className="modal-input">
          <input
            type="text"
            placeholder="Input OTP"
            onChange={(e)=>setOTP(e.target.value)}
          />
        </div>
        <div
          style={{ marginBottom: "10px" }}
          className="modal-btn column-flex"
        >
          <button onClick={handleVerification} className="primary-btn">Submit</button>
        </div>
        <div className="modal-footer app__flex-2">
          <p>Privacy and Policy</p>
          <p>FAQ</p>
        </div>
        </article>
    </main>
  )
}

export default OTPVerification;