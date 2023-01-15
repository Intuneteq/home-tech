import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [userId, setuserId] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

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
        setResetPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;