import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [userId, setuserId] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const getUserEmail = function () {
    let email;
    if (typeof window !== "undefined") {
      email = localStorage.getItem("h-email");
    }
    return email
  };

  return (
    <AppContext.Provider
      value={{
        fullName,
        setFullName,
        userId,
        setuserId,
        otpEmail,
        setOtpEmail,
        resetPassword,
        setResetPassword,
        getUserEmail
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
