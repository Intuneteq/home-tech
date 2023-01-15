import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [userId, setuserId] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  return (
    <AppContext.Provider
      value={{
        fullName,
        setFullName,
        userId,
        setuserId,
        otpEmail,
        setOtpEmail
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;