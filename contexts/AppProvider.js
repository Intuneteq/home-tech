import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");

  return (
    <AppContext.Provider
      value={{
        fullName,
        setFullName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;