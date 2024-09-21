"use client";

import { createContext, useContext, useState } from "react";

// Create context
const GlobalContext = createContext();

// Create provider
export function GlobalProvider({ children }) {
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        unreadMsgCount,
        setUnreadMsgCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create custom hook access
export function useGlobalContext() {
  return useContext(GlobalContext);
}
