import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [userId, setuserId] = useState("");

  return (
    <AppContext.Provider
      value={{
        fullName,
        setFullName,
        userId,
        setuserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;